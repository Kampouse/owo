'use client';

import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useUi } from '@/contexts/UiContext'
import SingleNotification from './SingleNotification';

const NotificationContainer = ({ }) => {
  const { uiState: {toasts} } = useUi();

  return (
    <ToastContainer position="top-center" className="p-3" style={{ position: 'fixed' }}>
      {toasts.map((toast) => (
        <SingleNotification
          key={`toast-${toast.id}`}
          id={toast.id}
          excerpt={toast.excerpt}
          createdAt={toast.createdAt}
          status={toast.status}
          type={toast.type}
          context={toast.context}
          floating
        />
      )) }
    </ToastContainer>
  )
}

NotificationContainer.propTypes = {};

export default NotificationContainer;
