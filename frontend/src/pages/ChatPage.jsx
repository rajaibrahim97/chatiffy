import React from 'react'
import { useAuthStore } from '../../lib/store/useAuthStore'

const ChatPage = () => {
  const { logout } = useAuthStore()
  return (
    <div className='z-10 relative p-4'>
      ChatPage
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default ChatPage
