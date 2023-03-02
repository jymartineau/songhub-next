import React from 'react'
import Navbar from './Navbar'
import UserWatcher from './UserWatcher'

function Layout({children}:{children?:React.ReactNode}) {
  return (
    <div>
      <UserWatcher />
      <Navbar />
      {children}
    </div>
  )
}

export default Layout