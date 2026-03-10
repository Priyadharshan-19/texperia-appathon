import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Lock, Unlock, Brain, Map, UserCheck, 
  Briefcase, Wallet, Shield, Calendar as CalendarIcon, LogOut, CheckCircle2, Download,
  ClipboardList, UploadCloud, Wifi, AlertCircle, Terminal, ChevronRight, Github, Globe, Trophy
} from 'lucide-react';

const PROBLEM_STATEMENTS = [
  { id: 1, icon: Brain, title: "AI-Based Mental Wellness Companion", desc: "In today’s fast-paced academic environment..." },
  { id: 2, icon: Map, title: "Smart Campus Navigation & Facility App", desc: "Large educational campuses often create difficulty..." },
  { id: 3, icon: UserCheck, title: "AI-Powered Smart Attendance & Engagement Analyzer", desc: "Traditional attendance systems lack efficiency..." },
  { id: 4, icon: Briefcase, title: "Smart Career Guidance & Skill Gap Analyzer", desc: "Students frequently face uncertainty..." },
  { id: 5, icon: Wallet, title: "AI-Based Expense Tracker", desc: "Managing personal finances is a common challenge..." },
  { id: 6, icon: Shield, title: "Digital ID & Document Vault App", desc: "Students regularly handle multiple academic..." },
  { id: 7, icon: CalendarIcon, title: "Smart Timetable & Schedule Organizer App", desc: "Students often struggle to manage academic schedules..." }
];

const EVALUATION_CRITERIA = [
  {
    round: "Preliminary Evaluation", weight: "30 Marks", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/30",
    items: [
      { name: "Problem Understanding", desc: "Clarity in identifying the real-world problem and its relevance." },
      { name: "Innovation & Creativity", desc: "Uniqueness and originality of the proposed solution." },
      { name: "Feasibility of the Idea", desc: "Practicality of implementing the solution within the given time." },
      { name: "Clarity of Approach", desc: "How clearly the team explains the architecture, workflow, or plan." }
    ]
  },
  {
    round: "Final Evaluation", weight: "70 Marks", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-500/30",
    items: [
      { name: "Functionality & Working Prototype", desc: "How well the application works and performs the intended functions." },
      { name: "Technical Implementation", desc: "Quality of coding, tools, frameworks, and technical complexity." },
      { name: "System Architecture & Design", desc: "Structure of the application including backend, database design, APIs, and overall system flow." },
      { name: "UI/UX", desc: "Design quality, usability, and user friendliness." },
      { name: "Impact & Practical Use", desc: "Real-world usefulness and scalability of the solution." },
      { name: "Presentation & Demo", desc: "Clarity in explaining the solution and demonstrating features." }
    ]
  }
];

export default function TeamDashboard() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  
  const [teamData, setTeamData] = useState(null);
  const [adminState, setAdminState] = useState({});
  const [isRevealed, setIsRevealed] = useState(false);
  const [chosenProblem, setChosenProblem] = useState(null); 
  
  const [githubLink, setGithubLink] = useState("");
  const [deployLink, setDeployLink] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const teamRes = await axios.get(`http://localhost:5000/api/teams/${teamId}`);
        setTeamData(teamRes.data);
        if (teamRes.data.chosenProblem) {
            setChosenProblem(teamRes.data.chosenProblem);
        }
        
        const statusRes = await axios.get('http://localhost:5000/api/admin/status');
        setIsRevealed(statusRes.data.problemStatementRevealed);

        const stateRes = await axios.get('http://localhost:5000/api/admin/state');
        setAdminState(stateRes.data.state);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000); 
    return () => clearInterval(interval);
  }, [teamId]);

  const handleLogout = () => navigate('/login');

  const handleSelectProblem = async (problemId) => {
    const confirmChoice = window.confirm(`Are you sure you want to lock in Problem Statement #${problemId}? You cannot change this later.`);
    if (!confirmChoice) return;
    try {
      await axios.post(`http://localhost:5000/api/teams/${teamId}/select-problem`, { chosenProblem: problemId });
      setChosenProblem(problemId);
      alert("Problem Statement Locked In Successfully!");
    } catch (error) {
      alert("Failed to lock in your choice.");
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/teams/${teamId}/submit-project`, {
        githubLink,
        deployLink
      });
      alert("Project Successfully Submitted to the Judges!");
      setGithubLink("");
      setDeployLink("");
    } catch (error) {
      alert("Failed to submit project.");
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans p-6 lg:p-12 overflow-x-hidden flex flex-col">
      
      <div className="flex-grow">
        {/* HEADER */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 relative z-10 glass-card px-8 py-4">
          <div>
            <p className="text-cyan-400 font-bold tracking-wider text-xs uppercase mb-1">Welcome, Team</p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{teamData?.teamName || "Loading..."}</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors font-medium">
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-7xl mx-auto relative z-10">
          {!isRevealed ? (
            /* LOCKED STATE */
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[60vh] glass-card text-center p-8 border-white/10">
              <Lock size={80} className="text-cyan-400 mb-8 animate-bounce" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Problem Statements Locked</h2>
              <p className="text-lg text-slate-400">Hold tight! The Appathon problem statements will appear here shortly.</p>
            </motion.div>

          ) : chosenProblem ? (
            
            /* ALREADY CHOSEN STATE */
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-3 gap-6 pb-20">
              
              <div className="lg:col-span-2 space-y-6 flex flex-col">
                
                {/* ROUND 1 COMPLETED BANNER */}
                {teamData?.notifications?.r1Completed && !teamData?.notifications?.finalCompleted && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 bg-green-500/10 border-green-500/30 flex items-center gap-4 text-green-400">
                    <div className="bg-green-500/20 p-3 rounded-full shrink-0">
                      <CheckCircle2 size={30} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Preliminary Evaluation Completed!</h3>
                      <p className="text-slate-300 text-sm">The judges have evaluated your Round 1 pitch. Keep pushing hard for the final presentation!</p>
                    </div>
                  </motion.div>
                )}

                {/* FINAL EVALUATION COMPLETED BANNER */}
                {teamData?.notifications?.finalCompleted && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 bg-purple-500/10 border-purple-500/30 flex items-center gap-4 text-purple-400">
                    <div className="bg-purple-500/20 p-3 rounded-full shrink-0">
                      <Trophy size={30} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Final Evaluation Completed!</h3>
                      <p className="text-slate-300 text-sm">Outstanding work! The judges have recorded your final scores. Relax and wait for the results announcement.</p>
                    </div>
                  </motion.div>
                )}

                {/* Target Locked Banner */}
                <div className="glass-card p-8 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-cyan-950/20 relative overflow-hidden shrink-0">
                  <div className="absolute -right-10 -top-10 text-cyan-500/10 rotate-12 pointer-events-none">
                    <Terminal size={250} />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 relative z-10">
                    <div className="flex items-center gap-4 text-cyan-400">
                      <CheckCircle2 size={40} />
                      <h2 className="text-3xl font-bold">Target Locked</h2>
                    </div>
                    <a href="/problem-statements.pdf" download="Appathon_2026_Problem_Statements.pdf" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg font-semibold transition-colors text-sm w-max">
                      <Download size={16} />
                      Download Brief
                    </a>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-slate-300 mb-2">Your team is currently working on:</p>
                    <h3 className="text-2xl font-black text-white mb-2">
                      Challenge #{chosenProblem}: {PROBLEM_STATEMENTS.find(p => p.id === chosenProblem)?.title}
                    </h3>
                  </div>
                </div>

                {/* Evaluation Criteria Panel */}
                <div className="glass-card p-8 bg-[#0f172a]/80 flex-1 flex flex-col max-h-[600px]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 shrink-0">
                    <ClipboardList className="text-cyan-400" size={24}/> Appathon Evaluation Criteria
                  </h3>
                  <div className="overflow-y-auto pr-2 space-y-8 custom-scrollbar flex-1">
                    {EVALUATION_CRITERIA.map((section, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className={`flex items-center justify-between p-4 rounded-xl border ${section.bg} ${section.border}`}>
                          <h4 className={`text-lg font-bold ${section.color}`}>{section.round}</h4>
                          <span className="font-black text-white bg-black/40 px-3 py-1 rounded-md text-sm">{section.weight}</span>
                        </div>
                        <div className="space-y-3 px-2">
                          {section.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10">
                              <ChevronRight className="text-slate-500 mt-0.5 shrink-0" size={16} />
                              <div>
                                <h5 className="font-bold text-slate-200 text-sm">{item.name}</h5>
                                <p className="text-slate-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* SUBMISSION PORTAL */}
                <div className="glass-card p-8 border border-blue-500/30 bg-gradient-to-br from-[#0f172a] to-blue-900/20">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                    <UploadCloud className="text-blue-400" /> Project Submission
                  </h3>

                  {/* Check if already submitted */}
                  {teamData?.submission?.githubLink ? (
                    <div className="text-center bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                      <CheckCircle2 className="mx-auto text-blue-400 mb-3" size={40} />
                      <h4 className="font-bold text-white mb-2">Code Submitted!</h4>
                      <p className="text-xs text-slate-400 mb-4">Your project has been securely locked in for final evaluation.</p>
                      <a href={teamData.submission.githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-xs font-bold bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors mb-2">
                        <Github size={14} /> View GitHub Repo
                      </a>
                      {teamData.submission.deployLink && (
                        <a href={teamData.submission.deployLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-xs font-bold bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors">
                          <Globe size={14} /> View Live Deployment
                        </a>
                      )}
                    </div>
                  ) : !adminState?.submissionEnabled ? (
                    <div className="text-center py-6 bg-black/20 rounded-xl border border-white/5">
                      <Lock className="mx-auto text-slate-500 mb-3" size={32} />
                      <p className="text-sm text-slate-400">The submission portal is currently locked by the Admin.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleProjectSubmit} className="space-y-5">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-2">
                          <Github size={14}/> GitHub Repository <span className="text-red-400">*</span>
                        </label>
                        <input 
                          type="url" required placeholder="https://github.com/your-repo" 
                          value={githubLink} onChange={(e) => setGithubLink(e.target.value)} 
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-400 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-2">
                          <Globe size={14}/> Live Demo <span className="text-slate-500">(Optional)</span>
                        </label>
                        <input 
                          type="url" placeholder="https://your-live-link.com" 
                          value={deployLink} onChange={(e) => setDeployLink(e.target.value)} 
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-400 outline-none transition-colors"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]">
                        Submit Project
                      </button>
                    </form>
                  )}
                </div>

                <div className="glass-card p-8 bg-[#0f172a]/80">
                  <h3 className="text-xl font-bold text-white mb-6">Event Resources</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <Wifi className="text-cyan-400 mt-1" size={20} />
                      <div>
                        <p className="text-slate-300 text-sm font-bold">Network: <span className="text-white">SNSTPLINK</span></p>
                        <p className="text-slate-400 text-sm">Password: SNSCOLLEGE</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <AlertCircle className="text-cyan-400 mt-1" size={20} />
                      <div>
                        <p className="text-slate-300 text-sm font-bold">Technical Support</p>
                        <p className="text-slate-400 text-sm">Locate the mentors at the Help Desk near the main stage.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

          ) : (

            /* SELECTION STATE */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Unlock className="text-cyan-400" size={32} />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Appathon 2026 Challenges</h2>
                </div>
                <a href="/problem-statements.pdf" download="Appathon_2026_Problem_Statements.pdf" className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-5 py-2.5 rounded-lg font-bold transition-all hover:scale-105 w-max">
                  <Download size={20} /> Download PDF
                </a>
              </div>
              <p className="text-slate-300 mb-10 text-lg">Choose <span className="text-cyan-400 font-bold">one</span> of the following problem statements. Choose wisely!</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {PROBLEM_STATEMENTS.map((statement, i) => (
                  <motion.div key={statement.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 flex flex-col h-full bg-[#0f172a]/80">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg"><statement.icon size={24} /></div>
                      <h3 className="text-xl font-bold text-white leading-tight flex-1">{statement.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">{statement.desc}</p>
                    <button onClick={() => handleSelectProblem(statement.id)} className="w-full bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-slate-900 border border-cyan-500/30 py-3 rounded-lg font-bold transition-all uppercase tracking-wider text-sm">
                      Select Challenge #{statement.id}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
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