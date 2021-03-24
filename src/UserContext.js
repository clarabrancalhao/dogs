import React, { createContext, useEffect, useState } from 'react';
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from './api';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Invalid token');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenAnswer = await fetch(url, options);
      if (tokenAnswer == false)
        throw new Error(`Error: ${tokenAnswer.statusText}`);
      const { token } = await tokenAnswer.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setLogin(false);
    setData(null);
    setError(null);
    setLoading(false);
    window.localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, loading, login, error }}>
      {children}
    </UserContext.Provider>
  );
};
