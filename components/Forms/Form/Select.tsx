import React, { ReactNode } from 'react'

function Select({children, ...props}:{children:ReactNode}) {
  return (
   <input type='select' {...props} className='p-[6px] w-full'>
        {children}
    </input>
  )
}

export default Select