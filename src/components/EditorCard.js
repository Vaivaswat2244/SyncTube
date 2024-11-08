import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EditorCard = ({ application }) => {
  const [editorDetails, setEditorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({
    approve: false,
    reject: false
  });

  const api = axios.create({
    baseURL: 'https://synctube-backend-final.onrender.com',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  useEffect(() => {
    const fetchEditorDetails = async () => {
      
      try {
        setLoading(true);
        const response = await api.get(`/api/users/detailsbymail/${application.editor}`);
        console.log(response)
        setEditorDetails(response.data.user);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || 'Failed to load editor details');
      } finally {
        setLoading(false);
      }
    };

    if (application?.editor) {
      fetchEditorDetails();
    }
  }, [application?.editor]);

  const handleApprove = async () => {
    try {
    const response = await api.post(`/api/application/applications/accept/${application._id}`,{editor: application.editor});
    if(response){
      console.log(response);
      console.log("assigned");
      toast.success("Editor Assigned");
    }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve application');
    } 
  };

  const handleReject = async () => {
    try {
      const response = await api.get(`/api/application/applications/reject/${application._id}`);
      console.log("rejected");
      if(response){
        toast.success("Application Rejected");
      }
      else{
        console.error("Some error occured")
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject application');
      console.log(err)
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 border border-violet-200">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 border border-violet-200">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-violet-200">
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={editorDetails.image}
              alt={editorDetails.name }
              className="rounded-full w-24 h-24 object-cover"
            />
          </div>
          <div className="text-xl font-semibold text-gray-900">
            {editorDetails.name }
          </div>
          <div className="text-sm text-gray-500">
            {application.editor}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col gap-4">
        <button 
          onClick={() => window.open(`/profile/${editorDetails?.id}`, '_blank')}
          className="w-full px-4 py-2 rounded-lg border border-violet-500 text-violet-600 hover:bg-violet-50 transition-colors font-medium"
        >
          View Profile
        </button>
        
        <div className="flex gap-4 w-full">
          <button 
            onClick={handleReject}
            disabled={actionLoading.reject}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {actionLoading.reject && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Reject
          </button>
          <button 
            onClick={handleApprove}
            disabled={actionLoading.approve}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {actionLoading.approve && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorCard;