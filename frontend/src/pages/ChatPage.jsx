import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import {ActiveTabSwitch} from '../components/ActiveTabSwitch.jsx'
import {ChatList} from '../components/ChatList.jsx'
import {ChatContainer} from '../components/ChatContainer.jsx'
import {NoConversationPlace} from '../components/NoConversationPlace.jsx'

export const ChatPage = () => {
  const {logout}=useAuthStore();
  return (
    <>
      <div id='chatWindow' className='container m-5 p-3 row'>
          <div className="col-3 p-3 lh-lg border-end ">
            <ProfileHeader/>
            <ActiveTabSwitch/>
            <div>
              <ChatList/>
            </div>
          </div>
          <div className="col-9 p-3 ">
            <NoConversationPlace/>
          </div>
      </div>
    </>
  )
}
    