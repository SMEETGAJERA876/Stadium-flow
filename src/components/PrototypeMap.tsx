import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuadrantState {
  id: string;
  name: string;
  density: number; // 0 to 100
  trend: 'up' | 'down' | 'stable';
  gateWaitTime: number; // minutes
}

export function PrototypeMap() {
  const [quadrants, setQuadrants] = useState<QuadrantState[]>([
    { id: '1', name: 'Quadrant A (NW)', density: 45, trend: 'stable', gateWaitTime: 5 },
    { id: '2', name: 'Quadrant B (NE)', density: 85, trend: 'up', gateWaitTime: 18 },
    { id: '3', name: 'Quadrant C (SE)', density: 30, trend: 'down', gateWaitTime: 2 },
    { id: '4', name: 'Quadrant D (SW)', density: 60, trend: 'up', gateWaitTime: 10 },
  ]);

  // Simulate real-time data changes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuadrants(prev => prev.map(q => {
        const volatility = Math.random() > 0.5 ? 5 : -5;
        const newDensity = Math.max(10, Math.min(100, q.density + volatility));
        return {
          ...q,
          density: newDensity,
          trend: newDensity > q.density ? 'up' : newDensity < q.density ? 'down' : 'stable',
          gateWaitTime: Math.floor(newDensity / 4)
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (density: number) => {
    if (density < 50) return 'bg-green-500/20 text-green-500 border-green-500/50';
    if (density < 75) return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
    return 'bg-red-500/20 text-red-500 border-red-500/50';
  };

  const getActiveBorder = (density: number) => {
    if (density < 50) return 'border-t-green-500 border-l-green-500';
    if (density < 75) return 'border-t-yellow-500 border-l-yellow-500';
    return 'border-t-red-500 border-l-red-500';
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto h-full p-4">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Live AI Routing Prototype</h2>
          <p className="text-zinc-400">Simulation of real-time block-based crowd distribution.</p>
        </div>
        <div className="flex gap-4 items-center bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
          <span className="flex items-center gap-2 text-sm text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live WebSocket
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stadium Visual */}
        <div className="lg:col-span-2 relative aspect-square md:aspect-video rounded-3xl bg-zinc-900/30 border border-zinc-800/50 overflow-hidden backdrop-blur-sm p-4 flex flex-col justify-center items-center">
          
          <div className="relative w-full max-w-[400px] aspect-square rounded-full border-8 border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center">
            {/* The Pitch */}
            <div className="absolute w-1/2 h-2/3 border-2 border-white/10 rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-950/20" />
            
            {/* Cross Hairs */}
            <div className="absolute w-full h-[2px] bg-zinc-800/50 top-1/2 -translate-y-1/2" />
            <div className="absolute h-full w-[2px] bg-zinc-800/50 left-1/2 -translate-x-1/2" />

            {/* Quadrant Visuals */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded-full overflow-hidden opacity-90">
              {/* NW */}
              <motion.div 
                animate={{ backgroundColor: quadrants[0].density > 75 ? 'rgba(239, 68, 68, 0.4)' : quadrants[0].density > 50 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.1)' }}
                className={cn("w-full h-full transition-colors duration-1000", getActiveBorder(quadrants[0].density))} />
              {/* NE */}
              <motion.div 
                animate={{ backgroundColor: quadrants[1].density > 75 ? 'rgba(239, 68, 68, 0.4)' : quadrants[1].density > 50 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.1)' }}
                className="w-full h-full transition-colors duration-1000" />
              {/* SW */}
              <motion.div 
                animate={{ backgroundColor: quadrants[3].density > 75 ? 'rgba(239, 68, 68, 0.4)' : quadrants[3].density > 50 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.1)' }}
                className="w-full h-full transition-colors duration-1000" />
              {/* SE */}
              <motion.div 
                animate={{ backgroundColor: quadrants[2].density > 75 ? 'rgba(239, 68, 68, 0.4)' : quadrants[2].density > 50 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.1)' }}
                className="w-full h-full transition-colors duration-1000" />
            </div>

            {/* Gate Labels */}
            <div className="absolute top-4 left-1/4 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-xs font-mono font-bold text-white z-10 shadow-lg">Gate A / NW</div>
            <div className="absolute top-4 right-1/4 translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-xs font-mono font-bold text-white z-10 shadow-lg">Gate B / NE</div>
            <div className="absolute bottom-4 left-1/4 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-xs font-mono font-bold text-white z-10 shadow-lg">Gate D / SW</div>
            <div className="absolute bottom-4 right-1/4 translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-xs font-mono font-bold text-white z-10 shadow-lg">Gate C / SE</div>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-5 rounded-2xl">
            <h3 className="text-zinc-100 font-semibold mb-4 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Dynamic Gate Routing</h3>
            {quadrants[1].density > 75 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-500/20 border border-indigo-500/50 p-4 rounded-xl mb-4 text-sm text-indigo-200"
              >
                <p className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> AI Intervention active</p>
                Rerouting A-to-M ticket holders from <del className="text-rose-400">Gate B</del> to <strong className="text-emerald-400">Gate A</strong> via push notification. Wait time saved: ~13 mins.
              </motion.div>
            )}

            <div className="space-y-3">
              {quadrants.map(q => (
                <div key={q.id} className="flex justify-between items-center p-3 rounded-lg bg-zinc-950/50 border border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-200">{q.name}</span>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full mt-1 w-fit border", getColor(q.density))}>
                      {q.density}% Capacity
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={cn("text-lg font-bold font-mono tracking-tighter", 
                      q.gateWaitTime < 10 ? 'text-emerald-400' : q.gateWaitTime < 15 ? 'text-yellow-400' : 'text-rose-400'
                    )}>
                      {q.gateWaitTime}m wait
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
