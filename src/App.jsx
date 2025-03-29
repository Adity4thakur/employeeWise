import React from 'react'
import LoginPage from './Login/LoginPage'
import UserCard from './Card/UserCard'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'



const App = () => {
  return (
   <>
 <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />  {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usercard" element={<UserCard />} />

      </Routes>
    </Router>

   </>
  )
}


export default App