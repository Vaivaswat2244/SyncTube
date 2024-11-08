import React from 'react';
import EditorCard from './EditorCard';

const EditorCardmain = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>No applications to display.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 h-full gap-4 w-[69vw] mt-16">
      {applications.map((application) => (
        <EditorCard key={application._id} application={application} />
      ))}
    </div>
  );
};

export default EditorCardmain;