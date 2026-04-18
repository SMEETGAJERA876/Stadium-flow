import React, { useState, useEffect } from 'react';
import { Quadrant, UserTicket } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Gift, Zap, BellRing, ChevronRight, X } from 'lucide-react';
import QRCode from "react-qr-code";
import { cn } from '../lib/utils';

// Helper component for the Stadium Map Routing
const FanNavigationMap = ({ targetGate, onClose }: { targetGate: string, onClose: () => void }) => {
  // Generates curving paths around the circular stadium
  const getRoutePath = (gate: string) => {
    const start = "M 100 195";
    if (gate === 'SW') return `${start} Q 40 195 39.9 160.1`;
    if (gate === 'SE') return `${start} Q 160 195 160.1 160.1`;
    if (gate === 'NW') return `${start} C 20 195, 10 100, 39.9 39.9`;
    if (gate === 'NE') return `${start} C 180 195, 190 100, 160.1 39.9`;
    return "";
  };

  return (
    <motion.div 
       initial={{ y: '100%' }} 
       animate={{ y: 0 }} 
       exit={{ y: '100%' }} 
       transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
       className="absolute inset-0 bg-zinc-950 z-50 flex flex-col font-sans"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur z-20">
         <div>
            <h3 className="text-white font-bold text-lg leading-tight">Live Navigation</h3>
            <p className="text-zinc-500 text-xs">AR Route mapped to Gate {targetGate}</p>
         </div>
         <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors active:scale-95">
            <X className="w-4 h-4" />
         </button>
      </div>
      
      {/* Map Rendering Container */}
      <div className="flex-1 flex flex-col p-6 items-center justify-between relative overflow-hidden hide-scrollbar max-h-full overflow-y-auto">
         
         <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mt-4">
           {/* Glow behind target */}
           <div 
              className="absolute w-40 h-40 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none transition-all duration-1000"
              style={{
                 top: targetGate === 'NW' || targetGate === 'NE' ? '10%' : '60%',
                 left: targetGate === 'NW' || targetGate === 'SW' ? '10%' : '60%'
              }}
           />

           <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-2xl">
              {/* Base rotated group for easy quadrant drawing. 0 deg = top */}
              <g transform="rotate(-90 100 100)">
                 {/* Outer Ring Seating */}
                 <circle cx="100" cy="100" r="70" fill="none" stroke="#34d399" strokeWidth="20" strokeOpacity="0.2" strokeDasharray="109.95 329.86" strokeDashoffset="0" />
                 <circle cx="100" cy="100" r="70" fill="none" stroke="#fbbf24" strokeWidth="20" strokeOpacity="0.2" strokeDasharray="109.95 329.86" strokeDashoffset="-109.95" />
                 <circle cx="100" cy="100" r="70" fill="none" stroke="#fb7185" strokeWidth="20" strokeOpacity="0.2" strokeDasharray="109.95 329.86" strokeDashoffset="-219.9" />
                 <circle cx="100" cy="100" r="70" fill="none" stroke="#60a5fa" strokeWidth="20" strokeOpacity="0.2" strokeDasharray="109.95 329.86" strokeDashoffset="-329.86" />

                 {/* Inner Ring Seating */}
                 <circle cx="100" cy="100" r="46" fill="none" stroke="#34d399" strokeWidth="16" strokeOpacity="0.3" strokeDasharray="72.25 216.77" strokeDashoffset="0" />
                 <circle cx="100" cy="100" r="46" fill="none" stroke="#fbbf24" strokeWidth="16" strokeOpacity="0.3" strokeDasharray="72.25 216.77" strokeDashoffset="-72.25" />
                 <circle cx="100" cy="100" r="46" fill="none" stroke="#fb7185" strokeWidth="16" strokeOpacity="0.3" strokeDasharray="72.25 216.77" strokeDashoffset="-144.51" />
                 <circle cx="100" cy="100" r="46" fill="none" stroke="#60a5fa" strokeWidth="16" strokeOpacity="0.3" strokeDasharray="72.25 216.77" strokeDashoffset="-216.77" />
              </g>

              {/* Dividers */}
              <line x1="39.9" y1="39.9" x2="160.1" y2="160.1" stroke="#18181b" strokeWidth="4" />
              <line x1="160.1" y1="39.9" x2="39.9" y2="160.1" stroke="#18181b" strokeWidth="4" />

              {/* Center Field */}
              <ellipse cx="100" cy="100" rx="18" ry="26" fill="#10b981" stroke="#047857" strokeWidth="2" />
              <rect x="96" y="90" width="8" height="20" fill="#fde68a" fillOpacity="0.8" rx="1" />
              
              {/* Route Line */}
              <motion.path 
                 key={targetGate}
                 d={getRoutePath(targetGate)} 
                 fill="none" 
                 stroke="#818cf8" 
                 strokeWidth="3.5" 
                 strokeDasharray="6 6"
                 strokeLinecap="round"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Path Flow Animation (little moving dot on the line) */}
              <motion.circle
                 r="2.5" fill="#c7d2fe"
                 className="drop-shadow-[0_0_5px_rgba(199,210,254,1)]"
              >
                <animateMotion 
                  dur="3s" 
                  repeatCount="indefinite" 
                  path={getRoutePath(targetGate)}
                />
              </motion.circle>

              {/* Gates Connectors */}
              <line x1="39.9" y1="39.9" x2="52" y2="52" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="160.1" y1="39.9" x2="148" y2="52" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="39.9" y1="160.1" x2="52" y2="148" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="160.1" y1="160.1" x2="148" y2="148" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />

              {/* Gates Nodes */}
              {[
                { id: 'NW', x: 39.9, y: 39.9 },
                { id: 'NE', x: 160.1, y: 39.9 },
                { id: 'SE', x: 160.1, y: 160.1 },
                { id: 'SW', x: 39.9, y: 160.1 }
              ].map(g => (
                <g key={g.id}>
                   <circle cx={g.x} cy={g.y} r="10" fill="#18181b" stroke={targetGate === g.id ? '#818cf8' : '#3f3f46'} strokeWidth={targetGate === g.id ? "2.5" : "1.5"} />
                   {targetGate === g.id && (
                      <motion.circle 
                         cx={g.x} cy={g.y} r="14" fill="none" stroke="#818cf8" strokeWidth="2"
                         initial={{ scale: 0.8, opacity: 1 }}
                         animate={{ scale: 1.5, opacity: 0 }}
                         transition={{ repeat: Infinity, duration: 2 }}
                      />
                   )}
                   <text x={g.x} y={g.y + 2.5} fontSize="7" fill="white" fontWeight="bold" textAnchor="middle">{g.id}</text>
                </g>
              ))}

              {/* You are here Map Pin */}
              <g transform="translate(100, 195)">
                 <circle cx="0" cy="0" r="7" fill="#6366f1" stroke="#312e81" strokeWidth="2" />
                 <circle cx="0" cy="0" r="2.5" fill="white" />
                 <text x="0" y="16" fontSize="8" fill="#a1a1aa" textAnchor="middle" fontWeight="bold">YOU</text>
              </g>
           </svg>
         </div>

         {/* Routing Info Panel */}
         <div className="w-full mt-10 bg-zinc-900/80 backdrop-blur-md border border-indigo-500/20 rounded-[1.5rem] p-5 flex items-center justify-between shadow-[0_0_30px_rgba(79,70,229,0.15)] relative">
            {/* Glowing borders behind component matching dashboard style */}
            <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            <div>
               <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">Target Route</div>
               <div className="text-white font-extrabold text-xl">Gate {targetGate}</div>
               <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 animate-ping rounded-full" />
                  Optimal path locked
               </div>
            </div>
            <div className="text-right">
               <div className="text-white text-3xl font-black font-mono">4<span className="text-sm text-zinc-500 font-sans ml-0.5">m</span></div>
               <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Walking</div>
            </div>
         </div>
         
         <button onClick={onClose} className="w-full mt-4 py-4 rounded-[1.2rem] bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(79,70,229,0.25)] flex items-center justify-center gap-2">
           <Zap className="w-4 h-4" /> Start AR Navigation
         </button>
      </div>
    </motion.div>
  )
}

export function FanApp({ ticket, currentQuadrant, allQuadrants, onDeclineReroute, onAcceptReroute }: { ticket: UserTicket, currentQuadrant: Quadrant, allQuadrants?: Quadrant[], onDeclineReroute?: () => void, onAcceptReroute?: () => void }) {
   const [timeLeft, setTimeLeft] = useState(10);
   const [isPending, setIsPending] = useState(false);
   const [showMap, setShowMap] = useState(false);

   const originalQuadrant = allQuadrants?.find(q => q.id === ticket.originalGate);
   const savedTime = originalQuadrant ? Math.max(0, originalQuadrant.waitTime - currentQuadrant.waitTime) : 0;
   const originalLoadMsg = originalQuadrant && originalQuadrant.load >= 85 ? `(Capacity ${Math.round(originalQuadrant.load)}%)` : '';

   useEffect(() => {
      if (ticket.hasBeenRerouted && !ticket.acceptedReroute) {
         setIsPending(true);
         setTimeLeft(5); // 5 seconds is perfect for a quick demo flow
      } else {
         setIsPending(false);
      }
   }, [ticket.hasBeenRerouted, ticket.currentGate, ticket.acceptedReroute]);

   useEffect(() => {
      if (!isPending) return;
      if (timeLeft <= 0) {
         setIsPending(false); // Default to accepted
         onAcceptReroute?.();
         return;
      }
      const timer = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(timer);
   }, [isPending, timeLeft, onAcceptReroute]);

   return (
     <div className="h-full w-full bg-zinc-950 text-white flex flex-col font-sans relative overflow-hidden">
       {/* Top Status Layout */}
       <div className="pt-12 pb-4 px-6 flex justify-between items-center z-10 shrink-0">
         <span className="font-semibold text-lg tracking-tight">Wallet</span>
         <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center border border-zinc-800">
           <BellRing className="w-4 h-4 text-zinc-400" />
         </div>
       </div>
       
       <div className="flex-1 px-6 pb-6 overflow-y-auto hide-scrollbar z-0 w-full">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Match Day</h1>
            <p className="text-zinc-400 text-sm">FC Barcelona vs Real Madrid</p>
          </div>
          
          {/* AI Banner */}
          <AnimatePresence>
             {ticket.hasBeenRerouted && (
               <motion.div 
                  initial={{opacity:0, height: 0, scale: 0.95, marginBottom: 0}} 
                  animate={{opacity:1, height: 'auto', scale: 1, marginBottom: 24}} 
                  exit={{opacity:0, height: 0, scale: 0.95, marginBottom: 0}}
                  className="bg-indigo-500/20 border border-indigo-500/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(99,102,241,0.15)] relative overflow-hidden shrink-0"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                 <div className="flex items-start gap-3 relative z-10 w-full flex-col">
                   <div className="flex gap-3 items-start">
                     <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-indigo-500/20 flex flex-col items-center justify-center border border-indigo-500/30">
                       <Zap className="w-4 h-4 text-indigo-400" />
                     </div>
                     <div>
                       <h3 className="font-bold text-indigo-300 text-sm mb-1">
                         {isPending ? 'AI Reroute Recommendation' : 'AI Route Optimized'}
                       </h3>
                       <p className="text-xs text-indigo-200/80 leading-relaxed">
                         {isPending 
                           ? `Gate ${ticket.originalGate} is currently highly congested ${originalLoadMsg}. We suggest redirecting to optimal Gate ${ticket.currentGate} to save ~${savedTime || 20} mins of waiting.`
                           : `You have been successfully redirected to Gate ${ticket.currentGate}. You are saving ~${savedTime || 20} mins of wait time.`
                         }
                       </p>
                       {ticket.rewardOffered && !isPending && (
                         <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/30 rounded-full border border-indigo-500/40 text-[10px] uppercase font-bold tracking-wider text-indigo-200">
                           <Gift className="w-3 h-3 text-indigo-300" />
                           {ticket.rewardOffered} Claimed
                         </div>
                       )}
                     </div>
                   </div>

                   {ticket.hasBeenRerouted && isPending && (
                      <div className="mt-2 flex gap-2 w-full">
                         <button 
                            onClick={() => { setIsPending(false); onAcceptReroute?.(); }} 
                            className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold py-2 rounded-lg transition-colors active:scale-[0.98] shadow-sm shadow-indigo-500/20"
                         >
                           Accept ({timeLeft}s)
                         </button>
                         <button 
                            onClick={() => { setIsPending(false); onDeclineReroute?.(); }} 
                            className="flex-1 bg-zinc-900 border border-indigo-500/30 hover:bg-zinc-800 text-zinc-300 transition-colors text-xs font-bold py-2 px-2 rounded-lg active:scale-[0.98]"
                         >
                           Decline
                         </button>
                      </div>
                   )}
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
          
          {/* Ticket Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-xl mb-6 w-full">
             <div className="bg-zinc-100 p-6 flex flex-col items-center relative overflow-hidden">
                 {/* Ticket subtle background texture */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                 
                 <div className="text-zinc-900 font-black text-2xl mb-1 tracking-tighter relative z-10 w-full text-center">VIP ADMISSION</div>
                 <div className="text-zinc-500 text-sm font-medium mb-6 relative z-10">Section {ticket.section}</div>
                 
                 <div className="w-48 h-48 bg-white rounded-xl p-3 shadow-inner border border-zinc-200 flex items-center justify-center relative overflow-hidden z-10">
                   <QRCode
                     value={`ticket:${ticket.id}?gate=${ticket.currentGate}&section=${ticket.section}`}
                     size={256}
                     style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                     viewBox={`0 0 256 256`}
                     fgColor="#09090b"
                     bgColor="#ffffff"
                     level="Q"
                   />
                   
                   {/* Cool Scanning effect */}
                   <motion.div 
                     key={ticket.currentGate}
                     initial={{ top: '0%' }}
                     animate={{ top: ['0%', '100%', '0%'] }} 
                     transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} 
                     className="absolute left-0 w-full h-[3px] bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.8)] filter blur-[1px]"
                   />
                 </div>
                 
                 <div className="mt-5 text-xs font-mono text-zinc-500 tracking-widest bg-zinc-200/80 px-3 py-1 rounded-md relative z-10">{ticket.id}</div>
             </div>
             
             {/* Gate assignment */}
             <div className={cn("p-6 flex items-center justify-between transition-colors duration-1000", ticket.hasBeenRerouted ? "bg-indigo-950/60" : "bg-zinc-900")}>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Entry Gate</div>
                  <motion.div 
                     key={ticket.currentGate}
                     initial={{ scale: 1.2, color: '#818cf8', x: -10 }} 
                     animate={{ scale: 1, color: '#ffffff', x: 0 }} 
                     className="text-4xl font-black font-mono tracking-tighter"
                  >
                     {ticket.currentGate}
                  </motion.div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Wait Time</div>
                  <div className="flex justify-end items-center gap-2">
                     <span className="relative flex h-2 w-2">
                       <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", currentQuadrant.waitTime < 10 ? 'bg-emerald-400' : currentQuadrant.waitTime < 20 ? 'bg-amber-400' : 'bg-rose-400')}></span>
                       <span className={cn("relative inline-flex rounded-full h-2 w-2", currentQuadrant.waitTime < 10 ? 'bg-emerald-500' : currentQuadrant.waitTime < 20 ? 'bg-amber-500' : 'bg-rose-500')}></span>
                     </span>
                     <span className="text-2xl font-bold tracking-tight font-mono">{currentQuadrant.waitTime}m</span>
                  </div>
                </div>
             </div>
          </div>
          
          {/* Navigation Action */}
          <button onClick={() => setShowMap(true)} className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-[1.5rem] p-4 flex items-center justify-between transition-all active:scale-[0.98]">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                 <Navigation className="w-4 h-4 text-zinc-400" />
               </div>
               <div className="text-left">
                 <div className="font-semibold text-sm text-zinc-200">Navigate to Gate</div>
                 <div className="text-xs text-zinc-500">Live indoor mapping via AR</div>
               </div>
             </div>
             <ChevronRight className="w-5 h-5 text-zinc-600" />
          </button>
       </div>

       {/* Interactive Map Overlay */}
       <AnimatePresence>
          {showMap && <FanNavigationMap targetGate={ticket.currentGate} onClose={() => setShowMap(false)} />}
       </AnimatePresence>

       <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
             display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
             -ms-overflow-style: none;  /* IE and Edge */
             scrollbar-width: none;  /* Firefox */
          }
       `}</style>
     </div>
   )
}
