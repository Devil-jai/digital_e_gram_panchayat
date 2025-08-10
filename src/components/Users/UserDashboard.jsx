import React from 'react'
import { Link } from 'react-router-dom'

function UserDashboard() {
  return (
        <div className='mt-30 flex flex-col'>
         <Link to='/user/applyServices' className='cursor-pointer text-blue-600'>Apply Services</Link>
        <Link to='/user/myApplicationStatus' className='cursor-pointer text-blue-600'>myApplicationStatus</Link>
        <Link to='/user/myProfile' className='cursor-pointer text-blue-600'>myProfile</Link>
    
    </div>
  )
}

export default UserDashboard