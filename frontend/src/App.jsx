import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormComponent from './components/Form'
import BiddingData from './components/AllBids'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/UserLayout'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import OtpLogin from './components/Otp'
function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user?<FormComponent />:<Login setUser={setUser}/>} />
            <Route path="all" element={<BiddingData />} />
            
          </Route>
          <Route path="/login" element={<OtpLogin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
