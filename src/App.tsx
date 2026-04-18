import React, { useState, useEffect } from 'react';
import { CommandCenter } from './components/CommandCenter';
import { FanApp } from './components/FanApp';
import { IncidentLog } from './components/IncidentLog';
import { AlertRules } from './components/AlertRules';
import { SecurityDashboard } from './components/SecurityDashboard';
import { Settings as SettingsComponent } from './components/Settings';
import { Quadrant, UserTicket, Log } from './types';
import { ShieldCheck, Crosshair, Users, Activity, Settings, Menu, X, Smartphone } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [quadrants, setQuadrants] = useState<Quadrant[]>([
    { id: 'NW', gateName: 'Gate NW', load: 45, waitTime: 6, trend: 'stable' },
    { id: 'NE', gateName: 'Gate NE', load: 30, waitTime: 4, trend: 'down' },
    { id: 'SE', gateName: 'Gate SE', load: 20, waitTime: 2, trend: 'stable' },
    { id: 'SW', gateName: 'Gate SW', load: 60, waitTime: 12, trend: 'up' },
  ]);

  const [fanTicket, setFanTicket] = useState<UserTicket>({
    id: 'QFA-9921',
    section: 'Block A',
    originalGate: 'NW',
    currentGate: 'NW',
    hasBeenRerouted: false,
  });

  const [logs, setLogs] = useState<Log[]>([
    { id: 'init', time: new Date(), message: 'System initialized. QuadFlow AI Routing online.', type: 'system' }
  ]);

  const [autoBalance, setAutoBalance] = useState(true);
  type ViewState = 'dashboard' | 'attendee' | 'incidents' | 'alertRules' | 'security' | 'settings';
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  const addLog = (message: string, type: Log['type']) => {
    setLogs(prev => [{
      id: Math.random().toString(36).substring(2, 9),
      time: new Date(),
      message,
      type
    }, ...prev].slice(0, 50));
  };

  const handleTriggerSpike = (qId: string) => {
    setQuadrants(prev => prev.map(q => q.id === qId ? { ...q, load: 95, waitTime: 32, trend: 'up' } : q));
    addLog(`⚠️ Gate ${qId} exceeded 90% capacity threshold. Moderate risk.`, 'alert');
    
    // reset fan ticket if we are spiking their original gate so we can show the demo again
    setFanTicket(prev => {
       if (prev.originalGate === qId) {
         return {
            ...prev,
            currentGate: qId,
            hasBeenRerouted: false,
            rewardOffered: undefined,
            declinedReroute: false
         };
       }
       return prev;
    });
  };

  // AI loop
  useEffect(() => {
    const interval = setInterval(() => {
      setQuadrants(prev => {
        let changed = false;
        
        const next = prev.map(q => {
          const newLoad = !autoBalance ? q.load : Math.max(10, Math.min(100, q.load + (Math.random() * 4 - 2)));
          if (newLoad !== q.load) changed = true;
          return { ...q, load: newLoad };
        });

        if (autoBalance) {
          const overloaded = next.find(q => q.load > 85);
          if (overloaded) {
            const target = next.reduce((min, q) => q.load < min.load ? q : min, next[0]);
            
            if (target.id !== overloaded.id) {
              overloaded.load -= 25; 
              target.load += 15;
              changed = true;
              
              addLog(`AI Action: Redirecting traffic from ${overloaded.gateName} to ${target.gateName} to balance load.`, 'ai');

              setFanTicket(currentTicket => {
                if (currentTicket.currentGate === overloaded.id && !currentTicket.hasBeenRerouted && !currentTicket.declinedReroute) {
                  return {
                    ...currentTicket,
                    currentGate: target.id,
                    hasBeenRerouted: true,
                    rewardOffered: '10% off Concessions'
                  };
                }
                return currentTicket;
              });
            }
          }
        }

        return next.map(q => {
          const oldWaitTime = q.waitTime;
          const newWaitTime = Math.floor(Math.pow(q.load / 20, 2)) + Math.floor(q.load / 10);
          if (oldWaitTime !== newWaitTime) changed = true;
          
          return {
             ...q,
             waitTime: newWaitTime,
             trend: q.load > (prev.find(p => p.id === q.id)?.load || 0) ? 'up' : 'down'
          };
        });
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [autoBalance]);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10 px-2">
         <div className="w-8 h-8 rounded-lg bg-indigo-500 relative flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
           <div className="w-4 h-4 border-2 border-white rounded-[2px]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white" />
         </div>
         <div>
           <h2 className="font-bold text-white tracking-tight leading-none">StadiumFlow</h2>
           <span className="text-[10px] text-zinc-400 font-medium">BETA DASHBOARD</span>
         </div>
      </div>

      <div className="mb-8">
         <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-2 mb-3">Operations</h3>
         <div className="space-y-1">
            <button 
              onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
              className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeView === 'dashboard' ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50")}
            >
              <Activity className="w-4 h-4" />
              Crowd Control
            </button>
            <button 
              onClick={() => { setActiveView('incidents'); setMobileMenuOpen(false); }}
              className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeView === 'incidents' ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50")}
            >
              <ShieldCheck className="w-4 h-4" />
              Incident Log
            </button>
            <button 
              onClick={() => { setActiveView('attendee'); setMobileMenuOpen(false); }}
              className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeView === 'attendee' ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50")}
            >
              <Smartphone className="w-4 h-4" />
              Attendee View
            </button>
         </div>
      </div>

      <div className="mb-auto">
         <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-2 mb-3">System</h3>
         <div className="space-y-1">
            <button 
              onClick={() => { setActiveView('alertRules'); setMobileMenuOpen(false); }}
              className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeView === 'alertRules' ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50")}
            >
              <Crosshair className="w-4 h-4" />
              Alert Rules
            </button>
            <button 
              onClick={() => { setActiveView('security'); setMobileMenuOpen(false); }}
              className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeView === 'security' ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50")}
            >
              <Users className="w-4 h-4" />
              Security
            </button>
            <button 
              onClick={() => { setActiveView('settings'); setMobileMenuOpen(false); }}
              className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", activeView === 'settings' ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50")}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
         </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-800">
         <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
               MO
            </div>
            <div>
               <div className="text-sm font-medium text-white">M. Okonkwo</div>
               <div className="text-xs text-zinc-500">Ops Manager</div>
            </div>
         </div>
      </div>
    </>
  );

  return (
    <div className="bg-black text-white min-h-screen flex selection:bg-indigo-500/30 font-sans h-screen overflow-hidden transition-colors duration-300">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-zinc-950 border-r border-zinc-900 flex-col p-6 h-full shrink-0 transition-colors duration-300">
         <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/90 backdrop-blur border-b border-zinc-900 z-50 flex items-center justify-between px-4 transition-colors duration-300">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-500 relative flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-[1px]" />
            </div>
            <span className="font-bold text-white tracking-tight">StadiumFlow</span>
         </div>
         <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-zinc-400 hover:text-white">
           <Menu className="w-6 h-6" />
         </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
         {mobileMenuOpen && (
            <>
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setMobileMenuOpen(false)}
                 className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
               />
               <motion.div 
                 initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                 className="fixed top-0 bottom-0 left-0 w-64 bg-zinc-950 border-r border-zinc-900 p-6 z-50 md:hidden flex flex-col transition-colors duration-300"
               >
                 <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                 </button>
                 <SidebarContent />
               </motion.div>
            </>
         )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 bg-black h-full flex flex-col overflow-hidden pt-16 md:pt-0 relative">
         {activeView === 'dashboard' ? (
           <CommandCenter 
              quadrants={quadrants} 
              onTriggerSpike={handleTriggerSpike} 
              logs={logs} 
              autoBalance={autoBalance} 
              toggleAutoBalance={() => setAutoBalance(p => !p)} 
           />
         ) : activeView === 'incidents' ? (
           <IncidentLog logs={logs} />
         ) : activeView === 'alertRules' ? (
           <AlertRules />
         ) : activeView === 'security' ? (
           <SecurityDashboard />
         ) : activeView === 'settings' ? (
           <SettingsComponent theme={theme} onThemeChange={setTheme} />
         ) : (
           <div className="w-full h-full flex items-center justify-center p-0 md:p-8 relative bg-zinc-950 overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none hidden md:block" />
               
               {/* Phone Frame for Desktop / Full Screen for Mobile */}
               <div className={cn(
                  "w-full h-full bg-black relative flex flex-col pt-4 overflow-hidden shadow-2xl transition-all",
                  "md:max-w-[380px] md:h-[800px] md:border-[12px] md:border-zinc-800 md:rounded-[3rem] md:pt-4"
               )}>
                  {/* Safe Area Notch (hidden on mobile, shown on desktop) */}
                  <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-50 pointer-events-none" />
                  
                  {/* Status bar mock */}
                  <div className="flex justify-between items-center px-6 pt-1 pb-2 text-[10px] sm:text-xs text-zinc-500 font-medium z-40 bg-zinc-950 shrink-0">
                     <span>9:41</span>
                     <div className="flex items-center gap-1.5">
                       <div className="w-3 h-3 rounded-full border border-zinc-500" />
                       <div className="w-4 h-2.5 rounded-sm border border-zinc-500" />
                     </div>
                  </div>

                  <div className="flex-1 overflow-hidden relative md:rounded-b-[2rem]">
                     <FanApp 
                       ticket={fanTicket} 
                       currentQuadrant={quadrants.find(q => q.id === fanTicket.currentGate)!} 
                       allQuadrants={quadrants}
                       onDeclineReroute={() => {
                         setFanTicket(prev => {
                           addLog(`User declined reroute. Retaining at ${prev.originalGate}.`, 'system');
                           return {
                             ...prev,
                             currentGate: prev.originalGate,
                             hasBeenRerouted: false,
                             declinedReroute: true
                           }
                         });
                       }}
                       onAcceptReroute={() => {
                         setFanTicket(prev => {
                           addLog(`User accepted reroute to Gate ${prev.currentGate}.`, 'system');
                           return {
                             ...prev,
                             acceptedReroute: true
                           }
                         });
                       }}
                     />
                  </div>
               </div>

               {/* Hint for desktop */}
               <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 text-xs font-medium">
                  Mobile Application Preview — Switch back to <button onClick={() => setActiveView('dashboard')} className="text-indigo-400 hover:underline">Dashboard view</button> to trigger surges.
               </div>
           </div>
         )}
      </main>
    </div>
  );
}
