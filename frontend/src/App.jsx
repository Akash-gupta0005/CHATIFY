import React from 'react'
import { Route, Routes } from 'react-router'
import { SignupPage } from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { ChatPage } from './pages/ChatPage'
import { useAuthStore } from './store/useAuthStore.js'

function App() {
  const {authUser,isLoggedin,isLoading,login}=useAuthStore();
  console.log("auth user ", authUser);
  console.log("isLoggedin ", isLoggedin);
  console.log("isLoading ", isLoading);
  return (
    <div className='min-h-screen bg-[#060512] flex items-center justify-center p-4 overflow-hidden'>
    <div className='absolute inset-0 bg-[linear-gradient(to_right #4f4f4f2e_1px,transparent_1px), linear-gradient(to_bottom #4f4f4f2e_1px, transparent_1px)] bg-[size:14px_24px]'/>
    <div className='absolute top-0 -left-4 size-96 bg-[#c70be1] opacity-20 blur-[100px] '/>
    <div className='absolute bottom-0 -right-4 size-96 bg-red-0 opacity-20 blur-[100px] '/>
    <button onClick={login} className='z-10'>login</button>
    <Routes>
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/chat' element={<ChatPage />} />
    </Routes>
    </div>
  )
}

export default App
