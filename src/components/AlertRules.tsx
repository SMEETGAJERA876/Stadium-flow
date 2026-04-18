import React, { useState } from 'react';
import { Bell, Sliders, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function AlertRules() {
  const [threshold, setThreshold] = useState(85);
  const [saved, setSaved] = useState(false);
  const [channels, setChannels] = useState({ sms: true, email: true, push: false });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto min-h-0 bg-zinc-950 text-zinc-50 relative">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 flex items-center gap-3">
          <Bell className="w-7 h-7 text-indigo-400" />
          Alert Rules
        </h1>
        <p className="text-zinc-400 text-sm">Configure automated system triggers and capacity thresholds.</p>
      </div>

      <div className="max-w-3xl flex flex-col gap-6">
        {/* Threshold Configuration */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" /> Gate Capacity Threshold
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            When a quadrant's load exceeds this percentage, the system will automatically trigger a "Severe" localized warning and initialize AI re-routing for inbound attendees.
          </p>

          <div className="mb-8 pl-2">
            <div className="flex justify-between text-xs font-bold font-mono text-zinc-500 mb-2 mt-4 max-w-md">
              <span>50%</span>
              <span className={cn(threshold >= 85 ? "text-rose-400" : "text-amber-400")}>{threshold}% Warning Mark</span>
              <span>100%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={threshold} 
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full max-w-md h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Notification Channels</h2>
          <div className="space-y-4">
            {Object.entries(channels).map(([key, enabled]) => (
              <label key={key} className="flex items-center justify-between bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors">
                <div className="capitalize font-medium text-sm text-zinc-200">{key} Notifications</div>
                <div className={cn("w-10 h-6 rounded-full transition-colors relative flex items-center", enabled ? "bg-indigo-500" : "bg-zinc-700")}>
                  <input type="checkbox" className="hidden" checked={enabled} onChange={() => setChannels(s => ({...s, [key]: !enabled}))}/>
                  <motion.div className="w-4 h-4 bg-white rounded-full shadow absolute" animate={{ left: enabled ? '20px' : '4px' }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Save Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button onClick={handleSave} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
            <Save className="w-4 h-4" /> Save Ruleset
          </button>
          
          <AnimatePresence>
            {saved && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
