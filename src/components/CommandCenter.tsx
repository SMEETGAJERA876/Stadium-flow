import React from 'react';
import { Quadrant, Log } from '../types';
import { AlertCircle, Zap, ShieldCheck, Activity, Users, Clock, DoorOpen, ListX } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StadiumMap({ quadrants }: { quadrants: Quadrant[] }) {
  const getActiveBorder = (load: number) => {
    if (load < 50) return 'border-t-emerald-500 border-l-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]';
    if (load < 75) return 'border-t-amber-500 border-l-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]';
    return 'border-t-rose-500 border-l-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.4)] animate-pulse';
  };

  const getColor = (load: number) => {
    if (load < 50) return 'rgba(16, 185, 129, 0.2)'; // emerald
    if (load < 75) return 'rgba(245, 158, 11, 0.3)'; // amber
    return 'rgba(244, 63, 94, 0.4)'; // rose
  }

  const [nw, ne, se, sw] = quadrants;

  const [hoveredQuad, setHoveredQuad] = React.useState<string | null>(null);

  const GateLabel = ({ quad, position }: any) => {
    const isHovered = hoveredQuad === quad.id;
    // Determine tooltip alignment based on quadrant ID to prevent screen edge clipping
    const isLeftSide = quad.id.includes('W');
    
    return (
      <div 
        className={cn("absolute flex flex-col items-center transition-all duration-700 pointer-events-none", position, isHovered ? "z-50" : "z-30")}
      >
        <div 
          className={cn("flex flex-col items-center transition-all duration-300 pointer-events-auto cursor-pointer opacity-100 scale-100")}
          onMouseEnter={() => setHoveredQuad(quad.id)}
          onMouseLeave={() => setHoveredQuad(null)}
        >
          {/* Main Badge */}
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-lg flex items-center gap-2 relative">
             <span className={cn(isHovered ? "text-indigo-400" : "text-zinc-500", "transition-colors")}>{quad.id}</span>
             
             {/* Gate Name */}
             <div className="transition-all duration-300 overflow-hidden whitespace-nowrap max-w-[150px] opacity-100">
                {quad.gateName}
             </div>
          </div>
          
          {/* Data Elements (Load & Wait Time) */}
          <div className="relative mt-2 flex flex-col items-center transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur px-2.5 py-1 rounded-md border border-zinc-700/50 shadow-sm cursor-help hover:border-zinc-500 transition-colors">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono font-bold text-zinc-200">{Math.round(quad.load)}% full</span>
            </div>
            
            <div className={cn("absolute top-full mt-2 transition-all duration-200 bg-zinc-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-50 border border-zinc-700 shadow-xl flex items-center gap-1.5", 
              isHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none",
              isLeftSide ? "left-0 sm:-left-4 origin-top-left" : "right-0 sm:-right-4 origin-top-right")}>
              <Clock className="w-3 h-3 text-amber-400" />
              {quad.waitTime}m wait
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative w-full aspect-square max-w-[280px] sm:max-w-[340px] mx-auto transition-all duration-700 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] group/map"
    >
      {/* Inner Masked Container for the Circle */}
      <div className="absolute inset-0 rounded-full border-[8px] sm:border-[12px] border-zinc-950 bg-zinc-950 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
        {/* The Pitch */}
        <div className="absolute w-[45%] h-[60%] border border-emerald-900/30 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-950/10 z-10 pointer-events-none" />
        <div className="absolute w-full h-[2px] bg-zinc-900/50 top-1/2 -translate-y-1/2 z-20 pointer-events-none" />
        <div className="absolute h-full w-[2px] bg-zinc-900/50 left-1/2 -translate-x-1/2 z-20 pointer-events-none" />

        {/* Quadrant Visuals */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-90">
          <motion.div onMouseEnter={() => setHoveredQuad('NW')} onMouseLeave={() => setHoveredQuad(null)} animate={{ backgroundColor: getColor(nw.load) }} className={cn("w-full h-full transition-colors duration-1000 border-[2px] sm:border-[3px] border-transparent cursor-pointer relative z-20", nw.load > 75 && getActiveBorder(nw.load))} />
          <motion.div onMouseEnter={() => setHoveredQuad('NE')} onMouseLeave={() => setHoveredQuad(null)} animate={{ backgroundColor: getColor(ne.load) }} className={cn("w-full h-full transition-colors duration-1000 border-[2px] sm:border-[3px] border-transparent cursor-pointer relative z-20", ne.load > 75 && getActiveBorder(ne.load))} />
          <motion.div onMouseEnter={() => setHoveredQuad('SW')} onMouseLeave={() => setHoveredQuad(null)} animate={{ backgroundColor: getColor(sw.load) }} className={cn("w-full h-full transition-colors duration-1000 border-[2px] sm:border-[3px] border-transparent cursor-pointer relative z-20", sw.load > 75 && getActiveBorder(sw.load))} />
          <motion.div onMouseEnter={() => setHoveredQuad('SE')} onMouseLeave={() => setHoveredQuad(null)} animate={{ backgroundColor: getColor(se.load) }} className={cn("w-full h-full transition-colors duration-1000 border-[2px] sm:border-[3px] border-transparent cursor-pointer relative z-20", se.load > 75 && getActiveBorder(se.load))} />
        </div>
      </div>

      {/* Gate Labels */}
      <GateLabel 
        quad={nw} 
        position="top-[15%] sm:top-[20%] left-1/4 -translate-x-1/2" 
      />
      <GateLabel 
        quad={ne} 
        position="top-[15%] sm:top-[20%] right-1/4 translate-x-1/2" 
      />
      <GateLabel 
        quad={sw} 
        position="bottom-[15%] sm:bottom-[20%] left-1/4 -translate-x-1/2" 
      />
      <GateLabel 
        quad={se} 
        position="bottom-[15%] sm:bottom-[20%] right-1/4 translate-x-1/2" 
      />
    </div>
  )
}

interface CommandCenterProps {
  quadrants: Quadrant[];
  onTriggerSpike: (id: string) => void;
  logs: Log[];
  autoBalance: boolean;
  toggleAutoBalance: () => void;
}

export function CommandCenter({ quadrants, onTriggerSpike, logs, autoBalance, toggleAutoBalance }: CommandCenterProps) {
  const totalLoad = quadrants.reduce((acc, q) => acc + q.load, 0) / 4;
  const avgWait = quadrants.reduce((acc, q) => acc + q.waitTime, 0) / 4;
  const totalOccupancy = Math.round(totalLoad * 500);
  
  // Dummy data for area chart
  const flowData = Array.from({ length: 15 }).map((_, i) => ({
    time: `1${i + 4}:00`,
    attendees: Math.max(10, Math.min(100, (i * 5) + Math.random() * 20)),
  }));

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto overflow-x-hidden min-h-0 bg-zinc-950 text-zinc-50 relative">
       {/* Header */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
         <div>
           <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 flex items-center gap-3">
              Crowd Control
           </h1>
           <p className="text-zinc-400 text-sm">MetroArena — Season Opener 2026</p>
         </div>
         <button  
            onClick={toggleAutoBalance} 
            className={cn("px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs font-mono transition-all flex items-center gap-2", 
            autoBalance ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]" : "bg-zinc-900 text-zinc-500 border border-zinc-800")}
          >
           <Activity className={cn("w-4 h-4", autoBalance && "animate-pulse")} />
           {autoBalance ? 'AI AUTO-BALANCING ON' : 'AI ROUTING OFF'}
         </button>
       </div>
       
       {/* Top Metrics Row */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col">
             <div className="flex items-center gap-2 text-zinc-400 mb-2">
               <Users className="w-4 h-4" />
               <span className="text-xs font-semibold uppercase">Venue Occupancy</span>
             </div>
             <div className="text-2xl font-bold text-white mb-0.5">{totalOccupancy.toLocaleString()}</div>
             <div className="text-xs text-zinc-500">of 50,000 capacity</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col">
             <div className="flex items-center gap-2 text-zinc-400 mb-2">
               <DoorOpen className="w-4 h-4" />
               <span className="text-xs font-semibold uppercase">Open Gates</span>
             </div>
             <div className="text-2xl font-bold text-emerald-400 mb-0.5">4/4</div>
             <div className="text-xs text-zinc-500">All open</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col">
             <div className="flex items-center gap-2 text-zinc-400 mb-2">
               <ListX className="w-4 h-4" />
               <span className="text-xs font-semibold uppercase">Incidents</span>
             </div>
             <div className="text-2xl font-bold text-white mb-0.5">{logs.filter(l => l.type === 'alert').length}</div>
             <div className="text-xs text-zinc-500">this session</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col">
             <div className="flex items-center gap-2 text-zinc-400 mb-2">
               <Clock className="w-4 h-4" />
               <span className="text-xs font-semibold uppercase">Avg Wait</span>
             </div>
             <div className={cn("text-2xl font-bold mb-0.5", avgWait > 15 ? "text-rose-400" : avgWait > 8 ? "text-amber-400" : "text-emerald-400")}>
               {Math.round(avgWait)}m
             </div>
             <div className="text-xs text-zinc-500">across all active gates</div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          {/* Left Column: Heatmap & Graph */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative flex flex-col">
               <h3 className="font-semibold text-white mb-1">Stadium Block Heatmap</h3>
               <p className="text-xs text-zinc-400 mb-8">A–Z blocks · live crowd density per zone</p>
               
               <StadiumMap quadrants={quadrants} />
             </div>
             
             <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative flex flex-col h-[280px]">
               <h3 className="font-semibold text-white mb-1">Crowd Flow — Today</h3>
               <p className="text-xs text-zinc-400 mb-4">Cumulative attendees through critical gates</p>
               <div className="flex-1 w-full h-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={flowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAttendees" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                      <XAxis dataKey="time" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }} 
                         itemStyle={{ color: '#a5b4fc' }}
                      />
                      <Area type="monotone" dataKey="attendees" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAttendees)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
             </div>
          </div>
          
          {/* Right Column: Alerts & Gates Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             {/* Gate Capacity overrides */}
             <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col">
                <h3 className="font-semibold text-white mb-1">Gate Capacity</h3>
                <p className="text-xs text-zinc-400 mb-6">Real-time fill · manual override controls</p>
                
                <div className="space-y-5">
                  {quadrants.map(q => (
                    <div key={q.id} className="flex flex-col gap-2">
                       <div className="flex justify-between items-end">
                         <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-zinc-200">{q.gateName}</span>
                            {q.load > 85 && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400">CRITICAL</span>}
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-400 font-mono">{q.waitTime}m wait</span>
                            <span className={cn("text-sm font-bold font-mono", q.load > 85 ? "text-rose-400" : q.load > 50 ? "text-amber-400" : "text-emerald-400")}>{Math.round(q.load)}%</span>
                         </div>
                       </div>
                       
                       <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden relative">
                          <motion.div 
                             className={cn("h-full rounded-full", q.load > 85 ? "bg-rose-500" : q.load > 50 ? "bg-amber-500" : "bg-emerald-500")}
                             initial={{ width: 0 }}
                             animate={{ width: `${Math.min(100, Math.max(0, q.load))}%` }}
                             transition={{ type: "spring", bounce: 0, duration: 1 }}
                          />
                       </div>

                       <div className="flex gap-2 mt-1">
                          <button onClick={() => onTriggerSpike(q.id)} className="flex-1 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wide rounded-md border border-zinc-800 transition-colors">
                            Simulate Surge
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Active Alerts */}
             <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex flex-col min-h-[300px]">
                <div className="p-5 border-b border-zinc-800 bg-zinc-900/80 rounded-t-3xl">
                  <h3 className="font-semibold text-white mb-1">Active AI Incidents</h3>
                  <p className="text-xs text-zinc-400">AI-generated reroute system log</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {logs.map(log => (
                       <motion.div key={log.id} initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: 'auto', scale: 1 }} className="border-l-2 border-indigo-500 bg-zinc-950/50 p-4 rounded-r-xl border-y border-r border-y-zinc-800/50 border-r-zinc-800/50">
                          <div className="flex items-center gap-2 mb-2">
                             {log.type === 'alert' && <AlertCircle className="w-4 h-4 text-rose-500"/>}
                             {log.type === 'ai' && <Zap className="w-4 h-4 text-indigo-400"/>}
                             {log.type === 'system' && <ShieldCheck className="w-4 h-4 text-emerald-500"/>}
                             <span className="text-xs text-zinc-500 font-mono font-medium">{log.time.toLocaleTimeString()}</span>
                             
                             {log.type === 'ai' && <span className="ml-auto px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase rounded">AI REROUTE</span>}
                             {log.type === 'alert' && <span className="ml-auto px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase rounded">THRESHOLD REZ</span>}
                          </div>
                          <p className={cn("text-xs leading-relaxed", log.type === 'alert' ? "text-rose-200" : log.type === 'ai' ? "text-indigo-200" : "text-zinc-300")}>
                            {log.message}
                          </p>
                       </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {logs.length === 0 && (
                     <div className="h-full flex items-center justify-center text-sm text-zinc-500 py-10">
                        No active incidents
                     </div>
                  )}
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}
