import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Allow fade-out transition
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationClass = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`;

  const typeClasses = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600',
  };

  return ReactDOM.createPortal(
    <div className={`${notificationClass} ${typeClasses[type]}`}>
      {message}
    </div>,
    document.body
  );
};

export default Notification;
