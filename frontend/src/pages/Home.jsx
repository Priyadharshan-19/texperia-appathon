import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Brain, BookOpen, Accessibility, 
  DollarSign, Briefcase, Users, LockOpen, Code, Clock, Trophy 
} from 'lucide-react';

// Import your custom local image here
import customHeroImage from '../assets/hero-image.png';

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans overflow-hidden flex flex-col">
      
      <div className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div initial="hidden" animate="visible" variants={slideLeft}>
              <div className="mb-6">
                <p className="text-cyan-400 font-bold tracking-wider uppercase text-sm mb-1">
                  TEXPERIA 2K26 | Technical Symposium
                </p>
                <p className="text-blue-200 text-sm font-medium">
                  Department of Computer Science and Engineering<br/>
                  Presents
                </p>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
                APPATHON 2026
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-300 mb-6">
                <span className="text-white font-bold">Theme:</span> NextGen Campus 2026<br/> 
                <span className="text-cyan-400 font-normal mt-2 inline-block">Engineering the Future of Student Experience</span>
              </h2>
              
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                Reimagine Campus Life. Build Smart Student-Centric Solutions. Innovate for the Future.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 glass-card px-4 py-2 text-cyan-50 font-medium">
                  <Calendar className="text-cyan-400" size={20} />
                  12 March 2026
                </div>
                <div className="flex items-center gap-2 glass-card px-4 py-2 text-cyan-50 font-medium">
                  <MapPin className="text-cyan-400" size={20} />
                  Venue: CC1
                </div>
              </div>

              <Link to="/login" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
                Enter Appathon
              </Link>
            </motion.div>
            
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={slideRight} 
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-400/50 h-[500px]"
            >
              <img 
                src={customHeroImage} 
                alt="Appathon Custom Hero" 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideLeft} className="order-2 md:order-1 flex justify-center">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl h-80 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideRight} className="order-1 md:order-2">
              <h3 className="text-3xl font-bold text-white mb-6 relative inline-block">
                About APPATHON 2026
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-cyan-500 rounded-full"></span>
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                NextGen Campus 2026 challenges students to design innovative solutions that improve campus life. Participants will work in teams to develop technology that addresses real-world student challenges in areas like academics, mental wellness, accessibility, and career growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- THEME SECTION --- */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp} className="py-20 border-y border-white/10 glass-card mx-4 lg:mx-8 rounded-3xl my-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Theme: NextGen Campus 2026</h3>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12">
              The future of education is evolving rapidly. This Appathon invites participants to build intelligent, scalable, and student-focused solutions that redefine how students experience campus life.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
              {[
                { title: "Mental Wellness", icon: Brain },
                { title: "Smart Academics", icon: BookOpen },
                { title: "Campus Accessibility", icon: Accessibility },
                { title: "Student Finance", icon: DollarSign },
                { title: "Career Development", icon: Briefcase },
              ].map((feature, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="glass-card p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform cursor-default">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-full mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <feature.icon size={28} />
                  </div>
                  <h4 className="font-semibold text-slate-200">{feature.title}</h4>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl h-64 border border-white/10">
               <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop" 
                  alt="Technology Code Graphic" 
                  className="w-full h-full object-cover opacity-80 mix-blend-screen"
                />
            </div>
          </div>
        </motion.section>

        {/* --- HOW OUR PLATFORM WORKS SECTION --- */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h3 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-3xl font-bold text-white text-center mb-16"
            >
              How Our Platform Works
            </motion.h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Team Login", desc: "Team leaders register their team at the venue.", icon: Users },
                { title: "Problem Reveal", desc: "The challenge will be revealed to all teams during the event.", icon: LockOpen },
                { title: "Build Solution", desc: "Teams work together to design and develop their ideas.", icon: Code },
                { title: "Winner Announcement", desc: "The final winners will be revealed directly on this platform.", icon: Trophy },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative p-6 glass-card text-center flex flex-col items-center justify-center"
                >
                  <item.icon className="text-cyan-400 mb-4 mt-2" size={40} strokeWidth={1.5} />
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SCHEDULE SECTION --- */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="py-20 glass-card rounded-3xl mx-4 lg:mx-8 my-10 border-white/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-white">
              <Clock className="text-cyan-400" /> Event Schedule
            </h3>
            <div className="space-y-4">
              {[
                { time: "9:00 AM", event: "Registration & Verification", style: "border-l-cyan-400" },
                { time: "9:30 AM", event: "Welcome Address", style: "border-l-cyan-400" },
                { time: "9:45 AM", event: "Problem Statement Reveal", style: "border-l-cyan-400" },
                { time: "10:00 AM", event: "Development Phase 1", style: "border-l-blue-400" },
                { time: "12:00 PM", event: "Evaluation Round 1", style: "border-l-purple-400" },
                { time: "1:00 PM – 2:00 PM", event: "Lunch Break", style: "border-l-slate-600 text-slate-400" },
                { time: "2:00 PM - 3:00 PM", event: "Development Phase 2", style: "border-l-blue-400" },
                { time: "3:00 PM - 4:00 PM", event: "Final Evaluation & Presentation", style: "border-l-green-400" },
              ].map((slot, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-center bg-white/5 rounded-lg p-5 border-l-4 ${slot.style} hover:bg-white/10 transition-colors`}>
                  <div className="w-48 font-mono text-cyan-200 font-medium mb-1 sm:mb-0">
                    {slot.time}
                  </div>
                  <div className="flex-1 font-semibold text-lg text-slate-100">
                    {slot.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="py-24 relative overflow-hidden text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">Organized By</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-10">SNS College of Technology</h1>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-16">Ready to Build the Future?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join APPATHON 2026 and create innovative solutions that redefine the student experience.
            </p>
            <Link to="/login" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl px-12 py-5 rounded-lg shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform">
              Enter Appathon
            </Link>
          </motion.div>
        </section>
      </div>

      {/* --- DEVELOPER SIGNATURE --- */}
      <div className="mt-16 pb-4 text-center relative z-10 opacity-50 hover:opacity-100 transition-opacity duration-300 shrink-0">
        <p className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">
          Developed by <span className="text-cyan-400 font-bold">Priyadharshan</span>
        </p>
      </div>

    </div>
  );
}