import React, { useState } from 'react';
import { Log } from '../types';
import { AlertCircle, Zap, ShieldCheck, Filter, Search, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface IncidentLogProps {
  logs: Log[];
}

export function IncidentLog({ logs }: IncidentLogProps) {
  const [filter, setFilter] = useState<'all' | 'alert' | 'ai' | 'system'>('all');
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => {
    if (filter !== 'all' && log.type !== filter) return false;
    if (search && !log.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto overflow-x-hidden min-h-0 bg-zinc-950 text-zinc-50 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
         <div>
           <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 flex items-center gap-3">
              Incident Log
           </h1>
           <p className="text-zinc-400 text-sm">Full audit trail — all gates, all events</p>
         </div>
         <button className="px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800">
           <Download className="w-4 h-4" />
           Export CSV
         </button>
      </div>

      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex flex-col min-h-[400px] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
           <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
             {(['all', 'alert', 'ai', 'system'] as const).map(f => (
               <button 
                 key={f}
                 onClick={() => setFilter(f)}
                 className={cn(
                   "px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-colors",
                   filter === f 
                     ? f === 'alert' ? "bg-rose-500/20 text-rose-300" : f === 'ai' ? "bg-indigo-500/20 text-indigo-300" : f === 'system' ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-800 text-white"
                     : "text-zinc-500 hover:text-zinc-300"
                 )}
               >
                 {f === 'all' ? 'All' : f}
               </button>
             ))}
           </div>

           <div className="relative w-full sm:w-64">
             <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
             <input 
               type="text" 
               placeholder="Search events..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
             />
           </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-950/50 sticky top-0 z-10">
               <tr>
                 <th className="py-3 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">Time</th>
                 <th className="py-3 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">Type</th>
                 <th className="py-3 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">Event Details</th>
               </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filteredLogs.map(log => (
                  <motion.tr 
                    key={log.id} 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="py-4 px-6 align-top whitespace-nowrap text-zinc-400 font-mono text-xs">
                      {log.time.toLocaleDateString()} {log.time.toLocaleTimeString()}
                    </td>
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center gap-2">
                        {log.type === 'alert' && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest">
                            <AlertCircle className="w-3 h-3" />
                            Alert
                          </div>
                        )}
                        {log.type === 'ai' && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                            <Zap className="w-3 h-3" />
                            AI Trigger
                          </div>
                        )}
                        {log.type === 'system' && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3" />
                            System
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-300 w-full min-w-[300px]">
                      {log.message}
                    </td>
                  </motion.tr>
                ))}
                
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-zinc-500">
                      No matching log events found.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
