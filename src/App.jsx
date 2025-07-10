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


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/userRegistration' element={<UserRegistration/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/user/applyServices' element={<ApplyService/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/admin/createService' element={<CreateService/>}/>
        <Route path='/admin/updateDeleteServices' element={<UpdateDeleteServices/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App
