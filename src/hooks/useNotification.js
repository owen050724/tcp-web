import React, { useState, useCallback } from 'react';
import Notification from '../components/ui/Notification';

const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const NotificationComponent = notification ? (
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={hideNotification}
    />
  ) : null;

  return { showNotification, NotificationComponent };
};

export default useNotification;
