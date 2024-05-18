import React, { PropsWithChildren }  from 'react';

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}
export default PublicLayout;
