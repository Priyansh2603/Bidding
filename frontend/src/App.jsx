import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormComponent from './components/Form'
import BiddingData from './components/AllBids'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/UserLayout'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FormComponent />} />
            <Route path="all" element={<BiddingData />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
