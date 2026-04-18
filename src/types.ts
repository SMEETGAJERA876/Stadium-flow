export interface Quadrant {
  id: string; // NW, NE, SE, SW
  gateName: string; 
  load: number; // 0-100%
  waitTime: number; // minutes
  trend: 'stable' | 'up' | 'down';
}

export interface UserTicket {
  id: string;
  section: string;
  originalGate: string;
  currentGate: string;
  hasBeenRerouted: boolean;
  rewardOffered?: string;
  declinedReroute?: boolean;
  acceptedReroute?: boolean;
}

export interface Log {
  id: string;
  time: Date;
  message: string;
  type: 'system' | 'ai' | 'alert';
}
