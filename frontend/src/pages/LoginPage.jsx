import React, { useState } from 'react'
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import '../index.css';
import { useAuthStore } from '../store/useAuthStore.js';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const {loggingUp, isLoggingUp}=useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    loggingUp(formData)
  };
  return (
       <div id='form-container'>
      <div className="form_data">
        <div className="form_heading">
          <MessageCircleIcon />
          <h1>Welcome Back</h1>
          <p style={{ textAlign: "center" }}>We're glad to see you !</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <MailIcon className='me-2'/>
            <label htmlFor="email">Email</label>
            <input
              type='email'
              name="email"
              id="email"
              value={formData.email}
              placeholder='john@gmail.com'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="form_input">
            <LockIcon className='me-2'/>
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type='password'
                name="password"
                id="password"
                value={formData.password}
                placeholder='Enter your password'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>
         <div id="form-btn">
            <button type='submit' disabled={isLoggingUp}>
                      {isLoggingUp ? (
                        <LoaderIcon  className='z-2'/>
                      ) : (
                        "Login"
                      )}
                    </button>
         </div>
          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
