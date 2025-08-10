import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import UserRegistration from './components/Users/UserRegistration'
import { Toaster } from 'react-hot-toast'
import HomePage from './components/Pages/HomePage'
import UserLogin from './components/Users/UserLogin'
import AdminLogin from './components/Admin/AdminLogin'
import CreateService from './components/Admin/CreateService'
import UpdateDeleteServices from './components/Admin/UpdateDeletesServices'
import ApplyService from './components/Users/ApplyServices'
import UpdateApplicationStatus from './components/Admin/UpdateApplicationStatus'
import MyApplicationStatus from './components/Users/MyApplicationStatus'
import MyProfile from './components/Users/MyProfile'
import StaffLogin from './components/Staff/StaffLogin'
import UpdateApplicationStatus_Staff from './components/Staff/UpdateApplicationStatus_Staff'
import Navbar from './components/Pages/Navbar'


function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/userRegistration' element={<UserRegistration/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/user/applyServices' element={<ApplyService/>}/>
        <Route path='/user/myApplicationStatus' element={<MyApplicationStatus/>}/>
        <Route path='/user/myProfile' element={<MyProfile/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/admin/createService' element={<CreateService/>}/>
        <Route path='/admin/updateDeleteServices' element={<UpdateDeleteServices/>}/>
        <Route path='/admin/updateApplicationsStatus' element={<UpdateApplicationStatus/>}/>
        <Route path='/staffLogin' element={<StaffLogin/>}/>
        <Route path='/staff/updateApplicationsStatus' element={<UpdateApplicationStatus_Staff/>}/>

      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App
