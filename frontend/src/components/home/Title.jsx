import React from 'react'

const Title = ({title , description}) => {
  return (
    <div className='text-center  text-slate-700'>
      <h2 className='text-2xl'>{title}</h2>
      <p className='text-sm max-w-2xl mt-4 text-slate-500'>{description}</p>
    </div>
  )
}

export default Title
