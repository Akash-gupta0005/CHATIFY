import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { ActiveTabSwitch } from '../components/ActiveTabSwitch.jsx'
import { ChatList } from '../components/ChatList.jsx'
import { ContactList } from '../components/ContactList.jsx'
import { ChatContainer } from '../components/ChatContainer.jsx'
import { NoConversationPlace } from '../components/NoConversationPlace.jsx'
import { useChatStore } from '../store/useChatStore.js';
import { LogOutIcon } from 'lucide-react'

export const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  const { logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  return (
    <div className="md:w-full relative flex w-full max-w-6xl mx-auto min-h-[90vh] md:h-[650px] lg:h-[550px]">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-80 lg:w-80 shrink-0 bg-slate-800/50 backdrop-blur-sm flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>
      </div>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={closeMobile} />
          <aside className="relative w-72 bg-slate-800/95 backdrop-blur-sm h-full flex flex-col">
            <div className="p-3 flex items-center justify-between">
              <ProfileHeader />
              <button
                aria-label="Close sidebar"
                className="text-white/80 hover:text-white"
                onClick={closeMobile}
              >
                ✕
              </button>
            </div>
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </aside>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden p-2 flex items-center justify-between border-b border-slate-700/40">
          <button
            aria-label="Open sidebar"
            className="px-3 py-2 rounded-lg bg-slate-800/30 text-white"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
          <div className="flex items-center gap-2 pr-2">
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={logout}
            >
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {selectedUser ? <ChatContainer /> : <NoConversationPlace />}
        </div>
      </div>
    </div>
  )
}
