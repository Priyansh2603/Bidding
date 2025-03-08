import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormComponent from './components/Form'
import BiddingData from './components/AllBids'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/all" element={<BiddingData />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
