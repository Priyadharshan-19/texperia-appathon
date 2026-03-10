import { useEffect, useState } from 'react';
import axios from 'axios';
import { Settings, Lock, Unlock, Bell, Check, Download } from 'lucide-react';

export default function Admin() {
  const [teams, setTeams] = useState([]);
  const [state, setState] = useState({});

  // 🚀 HARDCODED LIVE BACKEND URL - Fixes the localhost bug instantly!
  const API_URL = 'https://appathon-backend.vercel.app';

  const fetchAdminData = async () => {
    try {
      const resState = await axios.get(`${API_URL}/api/admin/state`).catch(() => ({ data: { state: {} } }));
      const resTeams = await axios.get(`${API_URL}/api/admin/teams`).catch(() => ({ data: { teams: [] } }));
      const resStatus = await axios.get(`${API_URL}/api/admin/status`).catch(() => ({ data: { problemStatementRevealed: false } }));

      setState({
        ...resState.data.state,
        problemRevealed: resStatus.data.problemStatementRevealed
      });
      setTeams(resTeams.data.teams);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => { fetchAdminData(); }, []);

  const toggleState = async (action, value) => {
    try {
      await axios.put(`${API_URL}/api/admin/state`, { action, value });
      fetchAdminData();
    } catch (error) {
      console.error("Error updating state", error);
    }
  };

  const handleRevealStatements = async () => {
    try {
      await axios.post(`${API_URL}/api/admin/reveal`);
      alert("Boom! 🚀 Problem Statements revealed to all teams!");
      fetchAdminData();
    } catch (error) {
      alert("Failed to reveal. Is your backend running?");
    }
  };

  const updateMarks = async (teamId, field, val) => {
    try {
      await axios.put(`${API_URL}/api/admin/marks`, { teamId, [field]: val });
      fetchAdminData();
    } catch (error) {
      console.error("Error updating marks", error);
    }
  };

  const notifyTeam = async (teamId, round) => {
    try {
      await axios.post(`${API_URL}/api/admin/notify/${teamId}`, { round });
      fetchAdminData(); 
    } catch (error) {
      console.error("Error sending notification", error);
      alert("Failed to send notification.");
    }
  };

  const handleClearDatabase = async () => {
    const confirmText = prompt("⚠️ WARNING: This will delete ALL teams permanently. Type 'DELETE' to confirm:");
    
    if (confirmText === "DELETE") {
      try {
        await axios.delete(`${API_URL}/api/admin/clear-teams`);
        alert("Database wiped successfully! Starting fresh.");
        fetchAdminData(); 
      } catch (error) {
        console.error("Error clearing database", error);
        alert("Failed to clear database.");
      }
    } else if (confirmText !== null) {
      alert("Database reset canceled.");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Team ID", "Team Name", "Leader Name", "Leader Contact", "Members", 
      "Target Challenge", "GitHub Link", "Live Deploy Link", 
      "Round 1 Marks", "Final Marks", "Total Score"
    ];

    const csvRows = teams.map(team => {
      return [
        team.teamId || "PENDING",
        team.teamName,
        team.leaderName || "N/A",
        team.leaderContact || "N/A",
        team.members ? team.members.join(" | ") : "N/A",
        team.chosenProblem ? `Challenge #${team.chosenProblem}` : "Pending",
        team.submission?.githubLink || "Not Submitted",
        team.submission?.deployLink || "Not Submitted",
        team.marks?.round1 || 0,
        team.marks?.final || 0,
        team.marks?.total ? team.marks.total.toFixed(2) : "0.00"
      ];
    });

    const csvContent = [
      headers.join(","),
      ...csvRows.map(row => row.map(item => `"${item}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Appathon_2026_Teams_Data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-screen">
      
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <Settings size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">ADMIN COMMAND CENTER</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm uppercase tracking-widest"
            >
              <Download size={16} /> Export CSV
            </button>

            <button 
              onClick={handleClearDatabase}
              className="bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm uppercase tracking-widest"
            >
              Reset Database
            </button>
          </div>
        </div>

        {/* --- REMOVED THE 4 EXTRA BUTTONS HERE --- */}
        <div className="grid grid-cols-2 gap-4 mb-10 max-w-lg">
          {[
            { label: "Reveal Problem", key: "problemRevealed", customClick: handleRevealStatements },
            { label: "Submissions", key: "submissionEnabled" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => btn.customClick ? btn.customClick() : toggleState(btn.key, !state[btn.key])}
              className={`p-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-wider ${
                state[btn.key] ? 'bg-green-600 border-green-400 shadow-lg shadow-green-900/20 text-white' : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              {state[btn.key] ? <Unlock size={16} className="mb-2 mx-auto" /> : <Lock size={16} className="mb-2 mx-auto" />}
              {btn.label}
            </button>
          ))}
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest font-black">
                <tr>
                  <th className="p-6">Team ID</th>
                  <th className="p-6">Team Name</th>
                  <th className="p-6">Target</th>
                  <th className="p-6 text-center">Round 1 (30 Marks)</th>
                  <th className="p-6 text-center">Final (70 Marks)</th>
                  <th className="p-6">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {teams.map((team) => (
                  <tr key={team._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-mono text-cyan-400 font-bold text-sm tracking-wider">
                      {team.teamId || "PENDING"}
                    </td>
                    <td className="p-6 font-bold text-white">{team.teamName}</td>
                    
                    <td className="p-6">
                      {team.chosenProblem ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-500/30 flex items-center w-max gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Challenge #{team.chosenProblem}
                        </span>
                      ) : (
                        <span className="bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 w-max block">Pending...</span>
                      )}
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col items-center gap-2">
                        <input 
                          type="number" 
                          className="bg-black/40 border border-white/10 rounded-lg p-2 w-20 text-center text-white focus:border-cyan-400 outline-none"
                          defaultValue={team.marks?.round1 || 0}
                          onBlur={(e) => updateMarks(team._id, 'round1', e.target.value)}
                        />
                        {team.notifications?.r1Completed ? (
                          <span className="text-green-400 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"><Check size={12}/> Sent</span>
                        ) : (
                          <button onClick={() => notifyTeam(team._id, 'r1')} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-2 py-1 rounded transition-colors">
                            <Bell size={12}/> Notify R1
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col items-center gap-2">
                        <input 
                          type="number" 
                          className="bg-black/40 border border-white/10 rounded-lg p-2 w-20 text-center text-white focus:border-cyan-400 outline-none"
                          defaultValue={team.marks?.final || 0}
                          onBlur={(e) => updateMarks(team._id, 'final', e.target.value)}
                        />
                        {team.notifications?.finalCompleted ? (
                          <span className="text-green-400 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"><Check size={12}/> Sent</span>
                        ) : (
                          <button onClick={() => notifyTeam(team._id, 'final')} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white px-2 py-1 rounded transition-colors">
                            <Bell size={12}/> Notify Final
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="p-6 font-black text-xl text-blue-400">
                      {team.marks?.total ? team.marks.total.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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