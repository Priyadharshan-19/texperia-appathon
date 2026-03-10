import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Users, Lock, User, Phone, KeyRound, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false); // Toggle between Login and Register
  
  // Form States
  const [formData, setFormData] = useState({
    teamName: '',
    password: '',
    leaderName: '',
    leaderContact: '',
    member1: '',
    member2: '',
    member3: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        // --- LOGIN LOGIC ---
        const res = await axios.post('https://appathon-backend.vercel.app/api/teams/login', {
          teamName: formData.teamName,
          password: formData.password
        });
        navigate(`/dashboard/${res.data.teamId}`);
      } else {
        // --- REGISTRATION LOGIC ---
        const res = await axios.post('https://appathon-backend.vercel.app/api/teams/register', formData);
        navigate(`/dashboard/${res.data.teamId}`);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error.response?.data?.message || "Authentication failed. Make sure the backend is running!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-xl glass-card p-8 md:p-10 border-white/10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            {isLoginMode ? "TEAM LOGIN" : "ON-SITE CHECK-IN"}
          </h2>
          <p className="text-slate-400 text-sm">
            {isLoginMode ? "Welcome back. Enter your credentials to continue." : "One Leader per team only. Register your squad."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Always show Team Name and Password */}
          <div className="space-y-4">
            <div className="relative">
              <Users className="absolute left-3 top-3.5 text-cyan-500" size={20} />
              <input 
                type="text" name="teamName" required placeholder="Team Name"
                onChange={handleChange} value={formData.teamName}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none"
              />
            </div>
            
            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 text-cyan-500" size={20} />
              <input 
                type="password" name="password" required placeholder="Team Password"
                onChange={handleChange} value={formData.password}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all outline-none"
              />
            </div>
          </div>

          {/* Only show these fields if they are Registering */}
          {!isLoginMode && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input type="text" name="leaderName" required placeholder="Leader Name" onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 outline-none"/>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input type="text" name="leaderContact" required placeholder="Leader Contact" onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 outline-none"/>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Team Members</p>
                <div className="space-y-3">
                  <input type="text" name="member1" placeholder="Member 1 Name" onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-400 outline-none"/>
                  <input type="text" name="member2" placeholder="Member 2 Name" onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-400 outline-none"/>
                  <input type="text" name="member3" placeholder="Member 3 Name" onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-400 outline-none"/>
                </div>
              </div>
            </motion.div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
            {isLoginMode ? "SECURE LOGIN" : "AUTHORIZE & START"}
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Toggle Mode Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
          >
            {isLoginMode ? "Don't have an account? Register your team here." : "Already registered? Click here to Login."}
          </button>
        </div>

      </motion.div>
    </div>
  );
}