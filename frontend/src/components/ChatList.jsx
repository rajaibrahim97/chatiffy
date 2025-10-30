import React, { useEffect } from 'react'
import { useChatStore } from '../lib/store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import NoChatsFound from './NoChatsFound';
import { useAuthStore } from '../lib/store/useAuthStore';

const ChatList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(()=>{
    getMyChatPartners()
  },[getMyChatPartners])

  if(isUsersLoading)  return <UsersLoadingSkeleton/>;
  if (chats.length === 0) return <NoChatsFound/>;

  return (
    <div>
      {chats.map(chat=>{
        <div className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan500/20 transition-colors'
          key={chat._id}
          onClick={()=>{setSelectedUser(chat)}}
        >
          <div className='flex items-center gap-3'>
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online":"avatar-offline"}`}>
              <div className='size-12 rounded-full'>
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
            </div>
          </div>

        </div>
      })}
    </div>
  )
}

export default ChatList
