import React, { useState } from 'react';

import Login from './Login';
import RegisterForm from './RegisterForm';

const WelcomePage = () => {
  const [activeKey, setActiveKey] = useState('signin');


  return (
    <>
      {activeKey === 'signin' && <Login onSignUp={() => setActiveKey('register')} />}
      {activeKey === 'register' && <RegisterForm onSignIn={() => setActiveKey('signin')} />}
    </>
  )

}

export default WelcomePage;
