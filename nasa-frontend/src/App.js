import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import APOD from './components/APOD';
import EarthImagery from './components/EarthImagery';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import ImageVideoLibrary from './components/ImageVideoLibrary';
import EPIC from './components/EPIC';
import Header from './components/Header';
import DONKI from './components/DONKI';
import Insight from './components/InSight';
import Login from './components/Login';
import Register from './components/Register';

import { getAuthToken } from './tokenStorage';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <h2>Welcome to Our Astronomical Website</h2>
          <p className="lead">Explore the wonders of space with our collection of breathtaking images and information from NASA's APIs.</p>
          <p>Discover stunning images of distant galaxies, planets, and celestial phenomena captured by NASA's spacecraft and telescopes. Learn fascinating facts about the cosmos and stay updated with the latest discoveries in astronomy.</p>
          <button className="btn btn-primary" onClick={() => {
            navigate('/register');
          }}>Get Started</button>
        </div>
        <div className="col-lg-6">
          <img src="https://spaceholder.cc/i/500x500" alt="Space" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  );
}

function App() {

  const isAuthenticated = !!getAuthToken();
  if (isAuthenticated) {
    console.log("Authenticated");
  }


  return (
    <Router>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/apod" element={isAuthenticated ? <APOD /> : <Navigate to="/login" />} />
            <Route path="/earth-imagery" element={isAuthenticated ? <EarthImagery /> : <Navigate to="/login" />} />
            <Route path="/mars-rover-photos" element={isAuthenticated ? <MarsRoverPhotos /> : <Navigate to="/login" />} />
            <Route path="/image-video" element={isAuthenticated ? <ImageVideoLibrary /> : <Navigate to="/login" />} />
            <Route path="/epic" element={isAuthenticated ? <EPIC /> : <Navigate to="/login" />} />
            <Route path="/donki" element={isAuthenticated ? <DONKI /> : <Navigate to="/login" />} />
            <Route path="/insight" element={isAuthenticated ? <Insight /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
