import React from 'react'
import { useState, useRef } from 'react'
import { LogOutIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'

export const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Img = reader.result
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img })
    }
  }

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">

        {/* LEFT: Avatar + Name */}
        <div className="flex items-center">
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="userImg"
                className="size-full object-cover"
              />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImgUpload}
              className="hidden"
            />
          </div>

          <div className="ms-3">
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-100 text-xs">Online</p>
          </div>
        </div>

        {/* RIGHT: Logout */}
        <button
          className="hidden md:flex text-slate-400 hover:text-slate-200 transition-colors"
          onClick={logout}
        >
          <LogOutIcon className="size-5" />
        </button>
      </div>
    </div>

  )
}
