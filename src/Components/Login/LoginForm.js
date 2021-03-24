import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UseForm from '../../Hooks/UseForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { UserContext } from '../../UserContext';

const LoginForm = () => {
  const username = UseForm();
  const password = UseForm();

  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button>Send</Button>
        {error && <p>{error}</p>}
      </form>
      <Link to="/login/create">Create an Account</Link>
    </section>
  );
};

export default LoginForm;
