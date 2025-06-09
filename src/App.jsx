import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Journals from './pages/Journals'
import TrackMood from './pages/TrackMood'
import Profile from './pages/Profile'   
import Signup from './pages/signup'
import Signin from './pages/signin'
import Extractaspdf from './pages/Extractaspdf'
import CreateJournal from './pages/CreateJournal'
import SelectJournalBg from './pages/SelectJournalBg'
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/track-mood" element={<TrackMood />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/extractaspdf" element={<Extractaspdf />} />
          <Route path="/journals/select-bg" element={<SelectJournalBg />} />
          <Route path="/journals/create" element={<CreateJournal />} />
          {/* Add more routes as needed */}
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </Router>
  )
}

export default App
