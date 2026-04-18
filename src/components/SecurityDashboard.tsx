import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, Activity, Radio, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SecurityDashboard() {
  const [lockdown, setLockdown] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const triggerLockdown = () => {
    setLockdown(true);
    setConfirming(false);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto min-h-0 bg-zinc-950 text-zinc-50 relative">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 flex items-center gap-3">
          <ShieldAlert className="w-7 h-7 text-rose-500" />
          Security Command
        </h1>
        <p className="text-zinc-400 text-sm">Live physical security oversight and emergency response.</p>
      </div>

      {lockdown && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-rose-600 border border-rose-400 rounded-2xl p-6 flex items-start gap-4 shadow-[0_0_50px_rgba(225,29,72,0.3)]">
          <AlertOctagon className="w-8 h-8 text-white animate-pulse" />
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-1">Total System Lockdown Active</h2>
            <p className="text-rose-100/90 text-sm">All automated turnstiles disabled. Entry flows halted. Security personnel dispatched to all sector nodes.</p>
            <button onClick={() => setLockdown(false)} className="mt-4 px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-lg text-xs font-bold uppercase transition-colors">
              Revoke Lockdown
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        {/* Live Feeds Placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Radio className="w-4 h-4 text-zinc-400"/> Live CCTV Integrations</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((cam) => (
                <div key={cam} className="aspect-video bg-black rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center group">
                   <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-white bg-black/50 px-1 rounded">CAM 0{cam}</span>
                   </div>
                   <Activity className="w-8 h-8 text-zinc-800 group-hover:text-zinc-700 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col h-full bg-gradient-to-b from-zinc-900/50 to-rose-950/10">
            <h2 className="font-bold text-white mb-2">Emergency Overrides</h2>
            <p className="text-xs text-zinc-400 mb-8">Manual override controls bypass all AI decisions.</p>

            <div className="mt-auto pt-6 border-t border-zinc-800/50 flex flex-col items-center">
               <AnimatePresence mode="wait">
                 {!confirming && !lockdown ? (
                   <motion.button 
                     key="idle"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     onClick={() => setConfirming(true)} 
                     className="w-full relative group"
                   >
                     <div className="absolute inset-0 bg-rose-500 rounded-2xl blur group-hover:blur-md transition-all opacity-20"></div>
                     <div className="relative bg-zinc-950 border-2 border-rose-500/50 hover:border-rose-500 text-rose-500 font-black text-lg py-6 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                       <Lock className="w-6 h-6" />
                       INITIATE LOCKDOWN
                     </div>
                   </motion.button>
                 ) : confirming && !lockdown ? (
                   <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full flex gap-3">
                      <button onClick={triggerLockdown} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl text-sm shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                        CONFIRM
                      </button>
                      <button onClick={() => setConfirming(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl text-sm">
                        CANCEL
                      </button>
                   </motion.div>
                 ) : (
                    <motion.div key="active" className="text-zinc-500 font-mono text-xs uppercase font-bold text-center">
                       System Locked.<br/>Overrides Disabled.
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
