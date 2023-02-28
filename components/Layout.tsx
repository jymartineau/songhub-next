import React from 'react'
import UserWatcher from './UserWatcher'

function Layout({children}:{children?:React.ReactNode}) {
  return (
    <div>
        <UserWatcher />
        {children}</div>
  )
}

export default Layout