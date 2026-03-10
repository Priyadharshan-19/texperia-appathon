import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import axios from 'axios';
import { Trophy, Timer, Award, Crown, Sparkles } from 'lucide-react';

export default function WinnerReveal() {
  const [winners, setWinners] = useState([]);
  const [count, setCount] = useState(5); 
  const [showCountdown, setShowCountdown] = useState(true);
  const [step, setStep] = useState(0); 
  const firstPlaceTimerRef = useRef(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/winners');
        setWinners(res.data.winners);
      } catch (err) {
        console.error("Make sure marks are locked in Admin Panel!", err);
      }
    };
    fetchWinners();

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => setShowCountdown(false), 1200);
      return () => clearTimeout(finishTimer);
    }
  }, [count]);

  useEffect(() => {
    return () => {
      if (firstPlaceTimerRef.current) clearInterval(firstPlaceTimerRef.current);
    };
  }, []);

  const celebrate3rdPlace = () => {
    const pops = [{ y: 0.8, x: 0.2, angle: 60 }, { y: 0.8, x: 0.8, angle: 120 }];
    pops.forEach(origin => {
      confetti({ particleCount: 80, spread: 80, angle: origin.angle, origin: { y: origin.y, x: origin.x }, colors: ['#b45309', '#f59e0b', '#fbbf24'] });
    });
  };

  const celebrate2ndPlace = () => {
    const pops = [{ y: 0.8, x: 0.1, angle: 60 }, { y: 0.8, x: 0.9, angle: 120 }];
    pops.forEach(origin => {
      confetti({ particleCount: 100, spread: 90, angle: origin.angle, origin: { y: origin.y, x: origin.x }, colors: ['#94a3b8', '#cbd5e1', '#f1f5f9'] });
    });
  };

  const startChampionsCelebration = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }});

    firstPlaceTimerRef.current = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(firstPlaceTimerRef.current);
      const particleCount = 70 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 250);
  };

  const nextStep = () => {
    if (showCountdown) return; 
    if (step < 3) {
      const newStep = step + 1;
      setStep(newStep);
      
      if (newStep === 1) celebrate3rdPlace();
      if (newStep === 2) celebrate2ndPlace();
      if (newStep === 3) startChampionsCelebration();
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-[#020617] relative font-mono selection:bg-transparent" 
      onClick={nextStep}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617]"></div>
        <div className="absolute bottom-32 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
      </div>

      <AnimatePresence mode="wait">
        {showCountdown ? (
          <motion.div 
            key="count" 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center relative z-20"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full h-64 w-64 animate-pulse"></div>
            <Timer size={56} className="text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            <h2 className="text-xl md:text-2xl font-semibold tracking-normal mb-6 text-slate-400 uppercase">Commencing Reveal</h2>
            <h1 className="text-[12rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              {count > 0 ? count : "GO!"}
            </h1>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col items-center w-full relative z-10 px-4">
            
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-20 text-center uppercase drop-shadow-lg">
                &lt; Appathon 2026 Champions /&gt;
              </h2>
            </motion.div>
            
            <div className="relative flex items-end justify-center gap-4 md:gap-8 h-[450px] w-full max-w-5xl z-10">
              
              {/* 2ND PLACE */}
              {step >= 2 && (
                <motion.div 
                  initial={{ y: 300, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                  className="w-1/3 max-w-[280px] bg-gradient-to-t from-slate-900/90 to-slate-800/80 backdrop-blur-md border-t-4 border-slate-300 p-6 md:p-8 pb-12 rounded-t-2xl flex flex-col items-center justify-start relative shadow-[0_0_50px_rgba(148,163,184,0.15)] h-[320px] mb-8"
                >
                  <div className="absolute -top-12 bg-slate-800 border-2 border-slate-400 rounded-full p-4 shadow-[0_0_20px_rgba(148,163,184,0.4)]">
                    <Award size={40} className="text-slate-300" />
                  </div>
                  <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-10 mb-4">Runner Up</h3>
                  <p className="text-2xl md:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">
                    {winners[1]?.teamName || "TBD"}
                  </p>
                  <p className="text-slate-500 font-mono text-xs mb-4">{winners[1]?.teamId}</p>
                  <div className="mt-auto px-4 py-2 bg-slate-950/50 rounded-lg border border-slate-700/50">
                    <p className="text-slate-300 font-bold text-lg">{winners[1]?.marks?.total ? winners[1].marks.total.toFixed(2) : "0"} <span className="text-xs text-slate-500">PTS</span></p>
                  </div>
                </motion.div>
              )}

              {/* 1ST PLACE */}
              {step >= 3 && (
                <motion.div 
                  initial={{ y: 400, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                  className="w-1/3 max-w-[340px] bg-gradient-to-t from-amber-950/90 to-yellow-900/80 backdrop-blur-md border-t-4 border-yellow-400 p-6 md:p-8 pb-16 rounded-t-2xl flex flex-col items-center justify-start relative shadow-[0_0_80px_rgba(250,204,21,0.25)] h-[400px] z-20"
                >
                  <div className="absolute -top-16 bg-yellow-950 border-2 border-yellow-400 rounded-full p-5 shadow-[0_0_40px_rgba(250,204,21,0.6)] z-20">
                    <Crown size={56} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  </div>
                  <Sparkles className="absolute top-4 right-4 text-yellow-500/50 animate-pulse" />
                  <Sparkles className="absolute top-10 left-4 text-yellow-500/50 animate-pulse delay-300" />
                  
                  <h3 className="text-yellow-500 font-extrabold uppercase tracking-normal text-lg mt-12 mb-4 drop-shadow-md">** Champions **</h3>
                  <p className="text-3xl md:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 drop-shadow-lg mb-2">
                    {winners[0]?.teamName || "TBD"}
                  </p>
                  <p className="text-yellow-700/80 font-mono text-sm mb-6">{winners[0]?.teamId}</p>
                  <div className="mt-auto px-6 py-3 bg-black/40 rounded-xl border border-yellow-500/30 shadow-inner">
                    <p className="text-yellow-400 font-black text-2xl">{winners[0]?.marks?.total ? winners[0].marks.total.toFixed(2) : "0"} <span className="text-sm text-yellow-600">PTS</span></p>
                  </div>
                </motion.div>
              )}

              {/* 3RD PLACE */}
              {step >= 1 && (
                <motion.div 
                  initial={{ y: 200, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                  className="w-1/3 max-w-[260px] bg-gradient-to-t from-orange-950/90 to-orange-900/80 backdrop-blur-md border-t-4 border-orange-500 p-6 md:p-8 pb-8 rounded-t-2xl flex flex-col items-center justify-start relative shadow-[0_0_40px_rgba(249,115,22,0.1)] h-[260px] mb-8"
                >
                  <div className="absolute -top-10 bg-orange-950 border-2 border-orange-500 rounded-full p-3 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                    <Trophy size={32} className="text-orange-400" />
                  </div>
                  <h3 className="text-orange-500 font-bold uppercase tracking-widest text-xs mt-8 mb-4">3rd Place</h3>
                  <p className="text-xl md:text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-orange-200 to-orange-600 mb-2">
                    {winners[2]?.teamName || "TBD"}
                  </p>
                  <p className="text-orange-700/80 font-mono text-[10px] mb-4">{winners[2]?.teamId}</p>
                  <div className="mt-auto px-4 py-2 bg-black/40 rounded-lg border border-orange-700/50">
                    <p className="text-orange-400 font-bold text-base">{winners[2]?.marks?.total ? winners[2].marks.total.toFixed(2) : "0"} <span className="text-[10px] text-orange-600">PTS</span></p>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div 
              initial={{opacity: 0}} animate={{opacity: 1}} 
              className="mt-16 text-slate-500 font-medium tracking-tight text-xs uppercase flex flex-col items-center gap-2"
            >
              {step < 3 ? (
                <>
                  <span className="animate-bounce">↓</span>
                  <span className="animate-pulse">[ Click to Reveal Next ]</span>
                </>
              ) : (
                <span className="text-cyan-500 font-bold tracking-normal drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">*** THE FUTURE IS ENGINEERED. ***</span>
              )}
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DEVELOPER SIGNATURE --- */}
      <div className="absolute bottom-4 left-0 w-full text-center z-50 opacity-50 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">
          Developed by <span className="text-cyan-400 font-bold">Priyadharshan</span>
        </p>
      </div>

    </div>
  );
}