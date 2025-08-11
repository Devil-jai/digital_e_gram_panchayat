import React from 'react'
import { Link } from 'react-router-dom'

function AdminPage() {
   const linkClasses =
     "block w-64 px-6 py-3 my-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-emerald-500 hover:scale-105 transition-all duration-300 text-center font-semibold";
 
   return (
     <div className="relative min-h-screen overflow-hidden">
       {/* Background image layer (with soft blur & slight scale to hide pixels) */}
       <div
         className="absolute inset-0 bg-center bg-no-repeat md:bg-cover"
         style={{
           backgroundImage:
             "url('https://images.unsplash.com/photo-1581386050670-9158038c9203?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxpbmRpYW4lMjBjcm93ZCUyMHdpdGglMjBmbGFnfGVufDB8fDB8fHww')",
           filter: "blur(2px) saturate(1.1) contrast(1.05)",
           transform: "scale(1.03)",
         }}
       />
 
       {/* Readability gradient (top & bottom) */}
       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
 
       {/* Content */}
       <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
         <div className="w-full max-w-xl rounded-2xl bg-white/10 p-8 backdrop-blur-md shadow-2xl border border-white/20">
           <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg text-center">
             Admin Dashboard
           </h1>
 
           <div className="flex flex-col items-center">
             <Link to="/admin/createService" className={linkClasses}>
               Create Service
             </Link>
             <Link to="/admin/updateDeleteServices" className={linkClasses}>
               Update Delete Services
             </Link>
             <Link to="/admin/updateApplicationsStatus" className={linkClasses}>
              Update Applications Status
             </Link>
           </div>
         </div>
       </div>
     </div>
   );
 }

export default AdminPage