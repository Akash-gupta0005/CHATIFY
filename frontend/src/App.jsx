import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import {SignupPage} from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage'
import { ChatPage } from './pages/ChatPage'
import { useAuthStore } from './store/useAuthStore.js'
import { PageLoader } from './components/PageLoader.jsx'
import {Toaster} from 'react-hot-toast';
import './index.css'

function App() {
  const {checkAuth, isCheckingAuth,authUser}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth) return <PageLoader/>;
  return (
    <>
    <div className='home'>
    <Routes>
      <Route path='/' element={authUser ? <ChatPage />:<Navigate to={"/login"}/>} />
      <Route path='/login' element={!authUser ? <LoginPage />:<Navigate to={"/"}/>} />
      <Route path='/signup' element={!authUser ? <SignupPage />:<Navigate to={"/"}/>} />
    </Routes>
    </div>
    <Toaster />
    </>
  )
}

export default App
