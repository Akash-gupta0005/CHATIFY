import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

export const ChatPage = () => {
  const {logout}=useAuthStore();
  return (
    <div>ChatPage
      <button onClick={logout}>logout</button>
    </div>

  )
}
    