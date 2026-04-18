import React from 'react';
import { Settings as SettingsIcon, Map, Palette, User, MonitorSmartphone } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings({ 
  theme, 
  onThemeChange
}: { 
  theme?: string; 
  onThemeChange?: (t: string) => void;
}) {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto min-h-0 bg-zinc-950 text-zinc-50 relative transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 flex items-center gap-3">
          <SettingsIcon className="w-7 h-7 text-indigo-400" />
          Settings
        </h1>
        <p className="text-zinc-400 text-sm">Manage dashboard preferences and application configurations.</p>
      </div>

      <div className="max-w-2xl flex flex-col gap-8">
        {/* Profile */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Account Profile</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/30 flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-1">Marcus Okonkwo</div>
              <div className="text-sm text-zinc-400">Operations Manager (Tier 1)</div>
              <div className="text-xs text-indigo-400 font-mono mt-2 bg-indigo-500/10 inline-block px-2 py-1 rounded">UID: OP-992-BX</div>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Display & Interface</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <MonitorSmartphone className="w-5 h-5 text-zinc-400" />
                 <div>
                   <div className="font-semibold text-white text-sm">Theme Preference</div>
                   <div className="text-xs text-zinc-500">Force visual theme across all devices</div>
                 </div>
               </div>
               <select 
                 value={theme || 'dark'} 
                 onChange={(e) => onThemeChange?.(e.target.value)}
                 className="bg-zinc-950 border border-zinc-700 text-white text-sm rounded-lg py-1.5 px-3 focus:outline-none focus:border-indigo-500"
               >
                 <option value="dark">Dark Mode (Default)</option>
                 <option value="light">Light Mode</option>
               </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
