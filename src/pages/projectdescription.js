import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, User, Video, Settings, FileCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EditorCardmain from '../components/EditorCardmain';
import Navbar from '../components/Navbar';
import SideDashboard from '../components/SideDashboard';


const ProjectDescription = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [applications, setapplications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async() => {
    if (!file) return alert("No file selected!");

    try {
      const formData = new FormData();
      const token = localStorage.getItem('token');
      formData.append('video', file);

      const response = await axios.post(
          `https://synctube-backend-final.onrender.com/api/project/projects/upload-edited/${id}`,
          formData,
          {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
          }
      );

      console.log('Video uploaded successfully:', response.data);
      window.location.reload(); 
  } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
  }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://synctube-backend-final.onrender.com/api/project/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const projectId = response.data.project_id;
        console.log("project id is ", projectId);
        setProject(response.data);
        setLoading(false);
        const applicationsResponse = await axios.post(
          'https://synctube-backend-final.onrender.com/api/application/applications/project',
          { project_id: projectId },  // This becomes the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(applicationsResponse.data.data);
        setapplications(applicationsResponse.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.error || 'Failed to fetch project details');
        setLoading(false);
      }
    };

    

    fetchProject();
    
  }, [id]);
  
  const applyForProject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const url = `https://synctube-backend-final.onrender.com/api/application/createapplications`;
  
      const response = await axios.post(
        url,
        { project_id: projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Application created!');
        navigate('/allprojects');
      } else {
        console.error('Error applying for project:', response.data);
      }
  
      console.log(response.data);
      // Handle the response, e.g., display a success message
    } catch (error) {
      console.error('Error applying for project:', error);
      // Handle the error, e.g., display an error message
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-violet-500">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (role === 'youtuber' && project.status === 'planning') {
    return (
      <div className='min-h-screen backgroung'>
        <Navbar/>
        <div className='min-h-screen pt-[72px]'>
          <div className='flex'>
          <SideDashboard/>
          <div>
          <div className="min-h-screen py-8 px-16 sm:px-20 lg:px-64">
          <div className="max-w-4xl mx-auto">

            {/* Main Project Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-200">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 capitalize">
                  {project.status}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Youtuber:</span>
                    <span className="ml-2 text-gray-900">{project.youtuber}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-violet-500 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Specifications:</span>
                      <p className="text-gray-900 mt-1">{project.specifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Videos Section */}
              <div>
                {/* Raw Videos */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 text-violet-500 mr-2" />
                    Raw Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.rawVideos.map((video) => (
                      <div 
                        key={video.video_id} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                          <button 
                            onClick={() => navigate(`/mediaed/${encodeURIComponent(video.s3Url)}`)}
                            className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
                          >
                            View Video
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edited Videos */}
                {project.editedVideos && project.editedVideos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileCheck className="w-5 h-5 text-violet-500 mr-2" />
                      Edited Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.editedVideos.map((video) => (
                        <div 
                          key={video.video_id} 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                            <button 
                              onClick={() => navigate(`/media/${encodeURIComponent(video.s3Url)}`)}
                              className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
                            >
                              View Video
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-4 flex items-center"> 
            
            Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditorCardmain applications={applications}/>
          </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Applications Section */}
        <div className="mb-8">
          
        </div>
          </div>
          </div>
        </div>
      </div>
      
    );
  }

  if (role === 'youtuber' && project.status === 'in-progress') {
    return (
      <div className='min-h-screen backgroung'>
        <Navbar/>
        <div className='min-h-screen pt-[72px]'>
          <div className='flex'>
          <SideDashboard/>
      <div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/myprojectsyoutuber" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>

            {/* Main Project Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-200">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 capitalize">
                  {project.status}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Youtuber:</span>
                    <span className="ml-2 text-gray-900">{project.youtuber}</span>
                  </div>

                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Editor:</span>
                    <span className="ml-2 text-gray-900">{project.videoEditor}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-violet-500 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Specifications:</span>
                      <p className="text-gray-900 mt-1">{project.specifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Videos Section */}
              <div>
                {/* Raw Videos */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 text-violet-500 mr-2" />
                    Raw Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.rawVideos.map((video) => (
                      <div 
                        key={video.video_id} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                          <button 
                            onClick={() => navigate(`/mediaed/${encodeURIComponent(video.s3Url)}`)}
                            className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
                          >
                            View Video
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edited Videos */}
                {project.editedVideos && project.editedVideos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileCheck className="w-5 h-5 text-violet-500 mr-2" />
                      Edited Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.editedVideos.map((video) => (
                        <div 
                          key={video.video_id} 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                            <button 
  onClick={() => navigate(`/media/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
  
        {/* Applications Section */}
        <div className="mb-8">
          
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

  if (role === 'youtuber' && project.status === 'review') {
    return (
      <div className='min-h-screen backgroung'>
        <Navbar/>
        <div className='min-h-screen pt-[72px]'>
          <div className='flex'>
          <SideDashboard/>
      <div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/allprojects" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>

            {/* Main Project Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-200">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 capitalize">
                  {project.status}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Youtuber:</span>
                    <span className="ml-2 text-gray-900">{project.youtuber}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-violet-500 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Specifications:</span>
                      <p className="text-gray-900 mt-1">{project.specifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Videos Section */}
              <div>
                {/* Raw Videos */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 text-violet-500 mr-2" />
                    Raw Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.rawVideos.map((video) => (
                      <div 
                        key={video.video_id} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                          <button 
  onClick={() => navigate(`/mediaed/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edited Videos */}
                {project.editedVideos && project.editedVideos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileCheck className="w-5 h-5 text-violet-500 mr-2" />
                      Edited Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.editedVideos.map((video) => (
                        <div 
                          key={video.video_id} 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                            <button 
  onClick={() => navigate(`/media/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
  
        {/* Apply Button */}
      <div className="mb-8">
        
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

  if (role === 'editor' && project.status === 'planning') {
    return (
      <div className='min-h-screen backgroung'>
        <Navbar/>
        <div className='min-h-screen pt-[72px]'>
          <div className='flex'>
          <SideDashboard/>
      <div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/allprojects" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>

            {/* Main Project Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-200">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 capitalize">
                  {project.status}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Youtuber:</span>
                    <span className="ml-2 text-gray-900">{project.youtuber}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-violet-500 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Specifications:</span>
                      <p className="text-gray-900 mt-1">{project.specifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Videos Section */}
              <div>
                {/* Raw Videos */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 text-violet-500 mr-2" />
                    Raw Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.rawVideos.map((video) => (
                      <div 
                        key={video.video_id} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                          <button 
  onClick={() => navigate(`/mediaed/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edited Videos */}
                {project.editedVideos && project.editedVideos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileCheck className="w-5 h-5 text-violet-500 mr-2" />
                      Edited Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.editedVideos.map((video) => (
                        <div 
                          key={video.video_id} 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                            <button 
  onClick={() => navigate(`/media/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button
                            className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
                            onClick={() => applyForProject(project.project_id)}
                          >
                            Apply
                          </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Apply Button */}
      <div className="mb-8">
        
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

  if (role === 'editor' && project.status === 'in-progress') {
    return (
      <div className='min-h-screen backgroung'>
        <Navbar/>
        <div className='min-h-screen pt-[72px]'>
          <div className='flex'>
          <SideDashboard/>
      <div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/allprojects" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>

            {/* Main Project Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-200">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 capitalize">
                  {project.status}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Youtuber:</span>
                    <span className="ml-2 text-gray-900">{project.youtuber}</span>
                  </div>

                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Editor:</span>
                    <span className="ml-2 text-gray-900">{project.videoEditor}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-violet-500 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Specifications:</span>
                      <p className="text-gray-900 mt-1">{project.specifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Videos Section */}
              <div>
                {/* Raw Videos */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 text-violet-500 mr-2" />
                    Raw Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.rawVideos.map((video) => (
                      <div 
                        key={video.video_id} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                          <button 
  onClick={() => navigate(`/mediaed/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edited Videos */}
                {project.editedVideos && project.editedVideos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileCheck className="w-5 h-5 text-violet-500 mr-2" />
                      Edited Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.editedVideos.map((video) => (
                        <div 
                          key={video.video_id} 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                            <button 
  onClick={() => navigate(`/media/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                  <div>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }} 
                      id="upload-input"
                    />
                    <button className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors" onClick={() => document.getElementById('upload-input').click()}>
                      Select Video
                    </button>
                    {file && <p>Selected file: {file.name}</p>}
                    <button className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors" onClick={handleUpload} disabled={!file}>
                      Upload Edited Video
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Apply Button */}
      <div className="mb-8">
        
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

  if (role === 'editor' && project.status === 'review') {
    return (
      <div className='min-h-screen backgroung'>
        <Navbar/>
        <div className='min-h-screen pt-[72px]'>
          <div className='flex'>
          <SideDashboard/>
      <div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/allprojects" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>

            {/* Main Project Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-200">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 capitalize">
                  {project.status}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Youtuber:</span>
                    <span className="ml-2 text-gray-900">{project.youtuber}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-violet-500 mr-2" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Settings className="w-5 h-5 text-violet-500 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Specifications:</span>
                      <p className="text-gray-900 mt-1">{project.specifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Videos Section */}
              <div>
                {/* Raw Videos */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 text-violet-500 mr-2" />
                    Raw Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.rawVideos.map((video) => (
                      <div 
                        key={video.video_id} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                          <button 
  onClick={() => navigate(`/mediaed/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edited Videos */}
                {project.editedVideos && project.editedVideos.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileCheck className="w-5 h-5 text-violet-500 mr-2" />
                      Edited Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.editedVideos.map((video) => (
                        <div 
                          key={video.video_id} 
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                            <button 
  onClick={() => navigate(`/media/${encodeURIComponent(video.s3Url)}`)}
  className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors"
>
  View Video
</button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
  
        {/* Apply Button */}
      <div className="mb-8">
        
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
};

export default ProjectDescription;