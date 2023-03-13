import React from 'react'

function Text({...props}) {
  return (
   <input type='text' {...props} className='p-[6px] w-full'/>
  )
}

export default Text