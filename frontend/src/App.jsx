import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import TeamDashboard from './pages/TeamDashboard';
import Admin from './pages/Admin';
import WinnerReveal from './pages/WinnerReveal';

export default function App() {
  return (
    <BrowserRouter>
      {/* 1. The Particle Background Layer */}
      <ParticleBackground />

      {/* 2. The Main Content Layer 
          'absolute top-0 left-0' forces this div to pin to the very top of your browser window, 
          stopping the blank space issue. 'z-10' keeps it clickable above the particles. 
      */}
      <div className="absolute top-0 left-0 w-full z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:teamId" element={<TeamDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reveal" element={<WinnerReveal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}