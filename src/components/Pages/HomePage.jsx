import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='flex justify-center items-center mt-40'>
        <Link to='/userRegistration' className='cursor-pointer text-blue-600'>User Registration</Link>
    </div>
  )
}

export default HomePage