import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { XIcon } from 'lucide-react';


function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") return setSelectedUser(null)
        }
        window.addEventListener("keydown", handleEscKey)

        //cleanup function
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);
    return (
        <div className='flex justify-between items-center bg-slate-900/20 border-b border-slate-700/50 max-h-[84px] px-6 py-1 flex-1 '>
            <div className="flex items-center space-x-3">
                <div className='avatar avatar-online'>
                    <div className="size-12 rounded-full">
                        <img src={setSelectedUser.profilePic || "/avatar.png"} alt={setSelectedUser.fullName} />
                    </div>
                </div>
                <div>
                    <h3 className='text-slate-200 font-medium'>{selectedUser.fullName}</h3>
                    <p className='text-slate-400 text-sm'>Online</p>
                </div>
            </div>
            <button onClick={() => setSelectedUser(null)}>
                <XIcon className='w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer' />
            </button>
            
        </div>
    );
}

export default ChatHeader;