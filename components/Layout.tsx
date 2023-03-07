import React from 'react'
import UserWatcher from './UserWatcher'
import Navigation from './Navigation'

function Layout({children}:{children?:React.ReactNode}) {
  return (
    <>
    <UserWatcher />
    <Navigation>
      {children}
    </Navigation>
    </>
   
  )
}

export default Layout