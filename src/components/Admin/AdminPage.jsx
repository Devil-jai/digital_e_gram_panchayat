import React from 'react'
import { Link } from 'react-router-dom'

function AdminPage() {
  return (
    <div className='mt-30 flex flex-col'>
         <Link to='/admin/createService' className='cursor-pointer text-blue-600'>Create Services</Link>
        <Link to='/admin/updateDeleteServices' className='cursor-pointer text-blue-600'>Update and Delete Services</Link>
        <Link to='/admin/updateApplicationsStatus' className='cursor-pointer text-blue-600'>  Update Application Status</Link>
    
    </div>
  )
}

export default AdminPage