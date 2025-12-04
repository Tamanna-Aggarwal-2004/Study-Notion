import React from 'react'
import { BiError } from "react-icons/bi";

const Error = () => {
  return (
    <div className='flex justify-center my-72 items-center text-3xl text-white'>
      <BiError className='my-0.5 mx-2'/>  Error - 404 Not found
    </div>
  )
}

export default Error
