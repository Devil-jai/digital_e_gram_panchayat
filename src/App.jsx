import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import UserRegistration from './components/Users/UserRegistration'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/userRegistration' element={<UserRegistration/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App
