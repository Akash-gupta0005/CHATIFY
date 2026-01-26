import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import '../index.css';

export const SignupPage = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div id='form-container'>
      <div className="form_data">
        <div className="form_heading">
          <MessageCircleIcon />
          <h1>Create Account</h1>
          <p style={{ textAlign: "center" }}>Sign up for a new account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <UserIcon className='me-2'/>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.fullName}
              id="name"
              placeholder='John'
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />

          </div>
          <div className="form_input">
            <MailIcon className='me-2' />
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
           <button type='submit' disabled={isSigningUp}>
            {isSigningUp ? (
              <LoaderIcon  className='z-2'/>
            ) : (
              "Create Account"
            )}
          </button>
         </div>
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
    </div>
  )
}