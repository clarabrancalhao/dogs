import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UseForm from '../../Hooks/UseForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { TOKEN_POST, USER_GET } from '../../api';

const LoginForm = () => {
  const username = UseForm();
  const password = UseForm();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      const response = await fetch(url, options);
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      getUser(json.token);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button>Send</Button>
      </form>
      <Link to="/login/create">Create an Account</Link>
    </section>
  );
};

export default LoginForm;
