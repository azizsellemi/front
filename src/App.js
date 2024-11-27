// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/Signin'; // Ensure SignIn is imported here
import Home from './components/Home';
import Navbar from './components/Navbar';
import Find from './components/Find';
import Offer from './components/Offer';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} /> {/* Make sure this points to SignIn */}
        <Route path="/home" element={<Home />} />
        <Route path="/find" element={<Find />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<SignIn />} /> {/* Default route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
