import React, { useState } from 'react';
import axios from 'axios';

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('video', file);
    formData.append('videoName', videoName);
    formData.append('caption', caption);
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:3002/api/project/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Video uploaded successfully!');
      setFile(null);
      setVideoName('');
      setCaption('');
    } catch (error) {
      setMessage('Error uploading video. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-300">
            Upload Your Video
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="video" className="text-blue-300 mb-1 block">
                Video File
              </label>
              <input 
                id="video" 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
                required 
                className="w-full px-3 py-2 bg-gray-700 text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="videoName" className="text-blue-300 mb-1 block">
                Video Name
              </label>
              <input
                id="videoName"
                type="text"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="caption" className="text-blue-300 mb-1 block">
                Caption
              </label>
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 bg-blue-900 border border-blue-700 text-blue-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploadForm;