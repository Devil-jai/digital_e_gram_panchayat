import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='flex justify-center items-center mt-40 gap-5'>
        <Link to='/userRegistration' className='cursor-pointer text-blue-600'>User Registration</Link>
        <Link to='/userLogin' className='cursor-pointer text-blue-600'>User Login</Link>
        <Link to='/adminLogin' className='cursor-pointer text-blue-600'>Admin Login</Link>
        <Link to='/admin/createService' className='cursor-pointer text-blue-600'>Create Service</Link>
    </div>
  )
}

export default HomePage