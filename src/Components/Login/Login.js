import React from 'react';
import { Route, Routes } from 'react-router';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="create" element={<LoginCreate />} />
        <Route path="password-lost" element={<LoginPasswordLost />} />
        <Route path="password-reset" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  );
};

export default Login;
