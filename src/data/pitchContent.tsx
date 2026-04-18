import React from 'react';
import { Lightbulb, Footprints, BrainCircuit, Map, Database, Server, Building2, Trophy, MonitorSmartphone, Rocket } from 'lucide-react';

export interface SectionContent {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  content: React.ReactNode;
}

export const pitchSections: SectionContent[] = [
  {
    id: 'idea',
    title: '1. Unique Idea',
    icon: Lightbulb,
    description: 'What makes this solution uniquely positioned to win.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Standard stadiums use static logic: <span className="text-white font-mono bg-zinc-800 px-2 py-1 rounded">If Section B, enter Gate B.</span> 
          But what happens when trains drop 10,000 people near Gate B at once? Chaos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="text-white font-semibold mb-3">The "QuadFlow" Innovation</h4>
            <p className="text-sm text-zinc-400">
              QuadFlow turns the stadium into a fluid routing network. Instead of a hardcoded gate, your ticket generates a <strong>liquid dynamic QR code</strong>. If your assigned quadrant gets congested, the system instantly reroutes off-peak arrivers to an adjacent, low-density gate through automated push notifications.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="text-white font-semibold mb-3">Why Judges Will Love This</h4>
            <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
              <li>It solves a real, mathematically chaotic physical problem.</li>
              <li>Visible economic benefit: Less line waiting = more time at concessions (driving instant revenue).</li>
              <li>Highly adaptable architecture (applicable to airports and festivals).</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ux',
    title: '2. User Experience Flow',
    icon: Footprints,
    description: 'Step-by-step journey from booking to exit.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <div className="relative border-l border-zinc-800 ml-4 pl-8 space-y-8 py-2">
          
          <div className="relative">
            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-zinc-950 border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <h4 className="text-white font-bold text-lg mb-1">Pre-Arrival (Digital Handshake)</h4>
            <p className="text-sm text-zinc-400">User books ticket. 4 hours prior, AI suggests arrival windows. Instead of "Game at 7 PM", it says "Arrive between 5:30 - 6:00 PM for 50% off drinks." (Solves: Entry clustering).</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-zinc-950 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h4 className="text-white font-bold text-lg mb-1">Arrival & Entry (Liquid Routing)</h4>
            <p className="text-sm text-zinc-400">User nears stadium. The App checks Quadrant Load. If assigned Gate NW is full, App updates to Gate NE. Ticket QR is time-locked and location-aware. (Solves: Bottlenecks).</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-zinc-950 border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <h4 className="text-white font-bold text-lg mb-1">Inside the Bowl (Micro-Guidance)</h4>
            <p className="text-sm text-zinc-400">Live indicators show wait times for Sector bathrooms and beverage stands. High density triggers targeted promotion in low-density zones. (Solves: Concourse crowding).</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-zinc-950 border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            <h4 className="text-white font-bold text-lg mb-1">Exit (Phased Egress)</h4>
            <p className="text-sm text-zinc-400">Game ends. Post-game offers push immediately. "Wait 20 mins for egress, enjoy 2-for-1 pizza right now at Stand 4." Users exit in waves. Transit schedules are integrated. (Solves: Departure stampedes).</p>
          </div>

        </div>
      </div>
    )
  },
  {
    id: 'ai',
    title: '3. AI Features',
    icon: BrainCircuit,
    description: 'Actionable intelligence replacing dumb infrastructure.',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
          <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
          </div>
          <h4 className="text-white font-semibold mb-2">Predictive Crowd Modeling</h4>
          <p className="text-sm text-zinc-400">Uses historical data + weather + current transit APIs to predict exactly when gates will fail. Gemini API synthesizes data to produce probabilistic risk scores per quadrant 30 minutes ahead of time.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors">
          <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
            <Server className="w-5 h-5 text-emerald-400" />
          </div>
          <h4 className="text-white font-semibold mb-2">Dynamic Load Balancing</h4>
          <p className="text-sm text-zinc-400">Like a network router. If Quadrant A Wait &gt; 15 mins and Quadrant B Wait &lt; 2 mins, the AI automatically shifts 15% of approaching users via push notifications to B, validating their tickets for the new gate.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl md:col-span-2">
          <h4 className="text-white font-semibold mb-2">Personalized Recommendation Engine</h4>
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-500 mt-2">
            <span className="text-indigo-400">if</span> (user.arrivalMode === 'train' && weather.status === 'rain') {'{'}
            <br />&nbsp;&nbsp;routeUser(coveredGateId);
            <br />&nbsp;&nbsp;pushOffer('Warm Coffee on Level 2', discount: 15);
            <br />{'}'}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'navigation',
    title: '4. Smart Navigation System',
    icon: Map,
    description: 'How we spatially organize A-Z blocks.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <p>The A-Z seating blocks are logically grouped into Quadrants (NW, NE, SE, SW). The navigation system bridges the physical-digital gap.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-sm">
          <div className="bg-zinc-900 p-4 rounded-xl border-l-4 border-l-blue-500 border border-zinc-800">
            <div className="font-bold text-white mb-2">1. The Heatmap (B2B)</div>
            <div className="text-zinc-500">A live Command Center for security to view 2D flow vectors.</div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border-l-4 border-l-purple-500 border border-zinc-800">
            <div className="font-bold text-white mb-2">2. Wayfinding (B2C)</div>
            <div className="text-zinc-500">Blue-dot mapping utilizing stadium Wi-Fi triangulation + BLE beacons.</div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl border-l-4 border-l-green-500 border border-zinc-800">
            <div className="font-bold text-white mb-2">3. Alt-Routes</div>
            <div className="text-zinc-500">"Take Stairwell B instead of Escalator A to save 4 minutes."</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'architecture',
    title: '5. Technical Architecture',
    icon: Database,
    description: 'Modern, highly scalable hackathon stack.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-zinc-800">Layer</th>
                <th className="px-4 py-3 font-medium border-b border-zinc-800">Technology</th>
                <th className="px-4 py-3 font-medium border-b border-zinc-800">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 bg-zinc-950">
              <tr>
                <td className="px-4 py-3 font-medium text-white">Frontend (Web/Mobile)</td>
                <td className="px-4 py-3 text-emerald-400 font-mono">React Native / Vite + React</td>
                <td className="px-4 py-3">High-performance app + interactive ticket UI</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Backend & APIs</td>
                <td className="px-4 py-3 text-indigo-400 font-mono">Node.js + Express + tRPC</td>
                <td className="px-4 py-3">Core logic handling thousands of concurrent scans</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Real-Time Sync</td>
                <td className="px-4 py-3 text-orange-400 font-mono">Socket.io + Redis PubSub</td>
                <td className="px-4 py-3">Live gating updates, instant routing notifications</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Database</td>
                <td className="px-4 py-3 text-blue-400 font-mono">PostgreSQL (Supabase) + PostGIS</td>
                <td className="px-4 py-3">Spatial queries (who is near what gate)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">AI Engine</td>
                <td className="px-4 py-3 text-rose-400 font-mono">Gemini Flash Fast API</td>
                <td className="px-4 py-3">Predicting bottlenecks before they form</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 'sensors',
    title: '6. Data & Sensors',
    icon: Building2,
    description: 'Bridging the physical world to the digital state.',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-300">
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h4 className="text-white font-semibold mb-3 border-b border-zinc-800 pb-2">Inputs</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• <strong className="text-zinc-200">Turnstile Scan Rates:</strong> Hard metric (scans per minute per gate).</li>
            <li>• <strong className="text-zinc-200">CCTV Computer Vision:</strong> Privacy-focused anonymized edge-counting (bounding boxes over heads) via OpenCV.</li>
            <li>• <strong className="text-zinc-200">Device GPS/Wi-Fi:</strong> Opt-in geo-fencing when 1km from stadium.</li>
          </ul>
        </div>
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h4 className="text-white font-semibold mb-3 border-b border-zinc-800 pb-2">Processing Flow</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>1. Edge devices stream integer counts to Redis.</li>
            <li>2. Node server calculates rolling averages.</li>
            <li>3. If Average &gt; Threshold, trigger AI Re-Allocator.</li>
            <li>4. Re-Allocator updates database and fires WebSockets.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'monetization',
    title: '7. Monetization / Startup Plan',
    icon: Trophy,
    description: 'How to pitch this as a billion-dollar company.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-zinc-400">Hackathon judges are investors at heart. They want to see how this survives past Monday.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 text-center">
            <div className="text-2xl font-bold text-white mb-1">SaaS</div>
            <div className="text-indigo-400 font-medium mb-3 text-sm">B2B Stadium Software</div>
            <p className="text-xs text-zinc-400">
              Sell the command center to Tier 1 stadiums at $10k/month. Prove ROI via reduced security overtime and increased concession throughput.
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 text-center">
            <div className="text-2xl font-bold text-white mb-1">Sponsored</div>
            <div className="text-emerald-400 font-medium mb-3 text-sm">Targeted Traffic Routing</div>
            <p className="text-xs text-zinc-400">
              Restaurants pay to be the "suggested alternative route." App reroutes crowds past sponsors in exchange for a rev-share on scanned coupons.
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 text-center">
            <div className="text-2xl font-bold text-white mb-1">Premium</div>
            <div className="text-amber-400 font-medium mb-3 text-sm">The "FastPass" Upsell</div>
            <p className="text-xs text-zinc-400">
              Users can pay $10 on the day to instantly receive routing via the VIP gates or lowest-wait-time gates. Instant microtransactions.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'hackathon',
    title: '8. Hackathon Edge',
    icon: Rocket,
    description: 'What to literally build in 24-48 hours.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <div className="p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
          <h3 className="text-xl font-bold text-indigo-400 mb-3">The "Holy Shit" Demo Recipe</h3>
          <p className="mb-4 text-sm text-indigo-200">Don't show code. Show the system reacting to a crisis.</p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-white block">The Split-Screen Setup</strong>
                <span className="text-sm text-zinc-400">Left Screen: Security Dashboard Heatmap. Right Screen: iPhone App showing user's ticket with "GATE A".</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-white block">The Simulation</strong>
                <span className="text-sm text-zinc-400">Click a button on a hidden admin panel to "Simulate Train Arrival at Gate A". Watch the heatmap rapidly turn red on the Left Screen.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-white block">The Magic Moment</strong>
                <span className="text-sm text-zinc-400">Without refreshing, show the right screen (the phone) buzz with a push notification: "Gate A is congested. Move to Gate B for 500 reward points." The ticket visually morphs and updates its barcode.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'ui',
    title: '9. UI Ideas',
    icon: MonitorSmartphone,
    description: 'Visual identity and layout conventions.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="font-bold text-white text-lg mb-2">Vibe & Colors</h4>
            <p className="text-sm text-zinc-400 mb-4">Dark mode primary. Bright, high-contrast neons for actionable data.</p>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 shrink-0"></div>
              <div className="w-8 h-8 rounded-full bg-[#09090b] border border-zinc-800 shrink-0"></div>
              <div className="w-8 h-8 rounded-full bg-emerald-500 shrink-0"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500 shrink-0"></div>
              <div className="w-8 h-8 rounded-full bg-rose-500 shrink-0"></div>
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h4 className="font-bold text-white text-lg mb-2">Key Screens</h4>
            <ul className="text-sm text-zinc-400 space-y-1 mt-2">
              <li>• Mobile Wallet Card (morphing QR)</li>
              <li>• Post-Game "Time-to-Leave" widget</li>
              <li>• Operator God-View (the live prototype map)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'bonus',
    title: '10. Bonus Innovation',
    icon: Lightbulb,
    description: 'Futuristic features that make jaws drop.',
    content: (
      <div className="space-y-6 text-zinc-300">
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">FUTURISTIC</span>
            <h3 className="text-white font-bold text-lg">Multi-Player Wait Economies (The "Wait-Trade")</h3>
          </div>
          
          <p className="text-zinc-300 text-sm leading-relaxed">
            Implement an internal micro-economy during the event. <br/><br/>
            If you are in a massive line for beer during halftime, you can open the app and click <strong>"I am willing to sell my spot in line for $5"</strong> (or a free beer later). Another user paying the premium skips to your spot via a localized barcode handshake. It gamifies the congestion and distributes the emotional frustration of waiting into an engaging market mechanic.
          </p>

          <hr className="my-5 border-indigo-500/20" />

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30">AR INTEGRATION</span>
            <h3 className="text-white font-bold text-lg">AR Core Route Painting</h3>
          </div>
          
          <p className="text-zinc-300 text-sm leading-relaxed">
            Instead of a 2D map, the user holds up their camera. A massive glowing line maps onto the physical floor leading them past the congestion exactly to their reassigned A-Z seat block, completely abstracting the complexity of the stadium's architecture away from the user.
          </p>
        </div>
      </div>
    )
  }
];
