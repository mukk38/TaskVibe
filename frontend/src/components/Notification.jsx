import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
      {message}
    </div>
  );
};

export default Notification;