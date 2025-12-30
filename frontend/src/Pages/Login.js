import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import '../index.css';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LoginInfo)
      });

      const result = await response.json();

      //  Adjust token key based on backend response
      // If backend sends token as "token", use it
      const { success, message, token, name, error } = result;

      if (success) {
        handleSuccess(message);

        //  Save token & user info to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInUser', name);

        // Navigate to Home
        setTimeout(() => {
          navigate('/home');
        }, 1000);

      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);

      } else if (!success) {
        handleError(message);
      }

    } catch (err) {
      handleError(err.message || "Something went wrong");
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor='email'>Email:-</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter Your Email Here...'
            value={LoginInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password:-</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter Your Password Here...'
            value={LoginInfo.password}
          />
        </div>

 
        <button type="submit">SignIN</button>

        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="fancy-btn secondary">
          Sign Up
          </Link>
        </span>

      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
