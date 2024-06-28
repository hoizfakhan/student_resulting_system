import React from 'react';

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-emerald-500 mb-4">Success</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button 
          onClick={onClose} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
