import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import toast from 'react-hot-toast';
import { XIcon, ImageIcon, SendIcon } from 'lucide-react';

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null);
  const {sendMessages}=useChatStore()

  const handleInputMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    sendMessages({
      text: text.trim(),
      image: imagePreview
    })
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file);
  }
  const removeImage = () => {
    setImagePreview(null);
    if (!fileInputRef.current) return fileInputRef.current.value = "";
  }
  return (
    <div className='fixed bottom-0 w-full p-3 border-t border-slate-800/50 bg-slate-900 z-50'>
      {imagePreview && (
        <div className='max-w-3xl mx-auto mb-3 flex items-center gap-3'>
          <img
            src={imagePreview}
            alt="Preview"
            className='w-20 h-20 object-cover rounded-lg border border-slate-700' />
          <button
            onClick={removeImage}
            className='w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700'>
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      <form onSubmit={handleInputMessage} className=' max-w-3xl mx-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
        <input type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className='w-full sm:flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4'
          placeholder='Type your message...' />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <div className='flex items-center gap-2'>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-3 py-2 sm:px-4 transition-colors ${imagePreview ? "text-cyan-500" : ""}`}
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-3 py-2 sm:px-4 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
