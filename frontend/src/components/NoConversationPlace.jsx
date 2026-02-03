import React from 'react'
import { MessageCircleIcon } from 'lucide-react'

export const NoConversationPlace = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center ">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">Select a conversation</h4>
        <p className="text-slate-400 text-md px-6">
          Choose a contact from the sidebar to start chatting
        </p>
        <p className="text-slate-400 text-md px-6">
          or continue a previous conversation
        </p>
      </div>
    </div>
  )
}
