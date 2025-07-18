import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='flex items-center flex-col mt-40 gap-5'>
        <div className='flex flex-col'>
          For User
          <Link to='/userRegistration' className='cursor-pointer text-blue-600'>User Registration</Link>
        <Link to='/userLogin' className='cursor-pointer text-blue-600'>User Login</Link>
        <Link to='/user/applyServices' className='cursor-pointer text-blue-600'>Apply Services</Link>
        <Link to='/user/myApplicationStatus' className='cursor-pointer text-blue-600'>  My Application Status</Link>
        <Link to='/user/myProfile' className='cursor-pointer text-blue-600'>  MyProfile</Link>
        </div>
        <div className='flex flex-col'>
          For Admin 
          <Link to='/adminLogin' className='cursor-pointer text-blue-600'>Admin Login</Link>
        <Link to='/admin/createService' className='cursor-pointer text-blue-600'>Create Service</Link>
        <Link to='/admin/updateDeleteServices' className='cursor-pointer text-blue-600'>Update/Delete Service</Link>
        <Link to='/admin/updateApplicationsStatus' className='cursor-pointer text-blue-600'>Update Application Status</Link>
        </div>
    </div>
  )
}

export default HomePage