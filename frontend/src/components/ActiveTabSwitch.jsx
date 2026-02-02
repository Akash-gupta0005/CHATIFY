import React from 'react'
import { useChatStore } from '../store/useChatStore.js'

export const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className='tabs tabs-box flex p-3 justify-evenly items-center bg-transparent'>
      <button onClick={() => setActiveTab("chats")}
        className={`tab ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}>Chats</button>
      <button onClick={() => setActiveTab("allContacts")}
        className={`tab ${activeTab === "allContacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}>Contacts</button>
    </div>
  )
}
