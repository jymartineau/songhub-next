import classNames from 'classnames'
import React, { ReactNode } from 'react'

function Group({children, title, classname=""}:{children:ReactNode, title:string, classname?:string}) {
  return (
   <div className={classNames('flex flex-col mb-2', classname)}>
     <label aria-label={title} htmlFor={title} className='text-xs capitalize mb-1 opacity-80 font-medium'>{title}</label>
    {children}
   </div>
  )
}

export default Group