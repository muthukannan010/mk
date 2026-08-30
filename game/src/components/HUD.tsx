import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { Map, MapPin, Calendar, Mail, Settings, Train as TrainIcon } from 'lucide-react';

export function HUD() {
  const speedRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef<HTMLSpanElement>(null);
  const brakeRef = useRef<HTMLSpanElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  // High-frequency subscription (no React re-renders for speed updates!)
  useEffect(() => {
    const unsubscribe = useGameStore.subscribe((state) => {
      const speed = Math.abs(state.train.velocity) * 3.6;
      const throttle = state.train.throttle * 100;
      const brake = state.train.brake * 100;

      if (speedRef.current) speedRef.current.innerText = speed.toFixed(0);
      if (throttleRef.current) throttleRef.current.innerText = throttle.toFixed(0) + '%';
      if (brakeRef.current) brakeRef.current.innerText = brake.toFixed(0) + '%';
      
      // Update the SVG arc stroke-dasharray based on speed (0 to 160)
      if (arcRef.current) {
        const percentage = Math.min(speed / 160, 1);
        const circumference = 2 * Math.PI * 45; // r=45
        const offset = circumference - (percentage * (circumference / 2)); // Half circle
        arcRef.current.style.strokeDashoffset = offset.toString();
      }
    });
    return () => unsubscribe();
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = useGameStore.getState();
      if (e.key === 'w' || e.key === 'W') {
        state.setThrottle(Math.min(1, state.train.throttle + 0.1));
        state.setBrake(0);
      }
      if (e.key === 's' || e.key === 'S') {
        state.setBrake(Math.min(1, state.train.brake + 0.1));
        state.setThrottle(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      
      {/* TOP BAR - CENTER SPEEDOMETER */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(20, 20, 20, 0.9)', padding: '20px 40px', borderRadius: '12px', border: '1px solid #333', display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>SPEED</div>
        
        {/* SVG Arc Speedometer */}
        <div style={{ position: 'relative', width: '120px', height: '60px', overflow: 'hidden' }}>
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="6" strokeDasharray="141.37" strokeDashoffset="0" transform="rotate(180 50 50)" />
            <circle ref={arcRef as any} cx="50" cy="50" r="45" fill="none" stroke="#22cc66" strokeWidth="6" strokeDasharray="141.37" strokeDashoffset="141.37" transform="rotate(180 50 50)" style={{ transition: 'stroke-dashoffset 0.1s' }} />
          </svg>
          <div style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div ref={speedRef} style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: '1' }}>0</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>km/h</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: 600 }}>SPEED LIMIT</div>
          <div style={{ color: '#22cc66', fontSize: '1.5rem', fontWeight: 700 }}>110</div>
          <div style={{ color: '#888', fontSize: '0.8rem' }}>km/h</div>
        </div>

        {/* Throttle & Brake below arc */}
        <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(20, 20, 20, 0.9)', padding: '8px 16px', borderRadius: '8px', border: '1px solid #333', display: 'flex', gap: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
          <div>THROTTLE <span ref={throttleRef} style={{ color: '#22cc66' }}>0%</span></div>
          <div style={{ width: '1px', background: '#333' }}></div>
          <div>BRAKE <span ref={brakeRef} style={{ color: '#cc2222' }}>0%</span></div>
        </div>
      </div>

      {/* TOP LEFT - ROUTE INFO */}
      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(20, 20, 20, 0.9)', padding: '20px', borderRadius: '12px', border: '1px solid #333', width: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '0.9rem', marginBottom: '16px' }}>
          <TrainIcon size={16} /> INDIAN RAILWAYS
        </div>
        <div style={{ fontWeight: 700, marginBottom: '20px' }}>
          12163 CHENNAI CENTRAL <span style={{ color: '#f39c12' }}>→</span> BENGALURU CITY
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>
          <span>NEXT STOP</span>
          <span>DISTANCE</span>
          <span>ETA</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 600 }}>
          <span style={{ color: '#f39c12' }}>JOLARPETTAI JN</span>
          <span>24 km</span>
          <span>10:35</span>
        </div>
      </div>

      {/* TOP RIGHT - SYSTEM STATUS */}
      <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(20, 20, 20, 0.9)', padding: '20px', borderRadius: '12px', border: '1px solid #333', width: '250px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.8rem', marginBottom: '16px', borderBottom: '1px solid #333', paddingBottom: '8px' }}>
          <span>10:22:35</span>
          <span>SYSTEM STATUS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>LOCO</span><span style={{ color: '#aaa' }}>WAP-7</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>POWER</span><span style={{ color: '#22cc66' }}>ON</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>PANTOGRAPH</span><span style={{ color: '#22cc66' }}>RAISED</span></div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(10, 10, 10, 0.95)', borderTop: '1px solid #333', display: 'flex', justifyContent: 'center', padding: '15px 0' }}>
        <div style={{ display: 'flex', gap: '40px', color: '#888', fontSize: '0.8rem', fontWeight: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Map size={20} /> MAP</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><MapPin size={20} /> JOURNEY</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Calendar size={20} /> TIMETABLE</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Mail size={20} /> MESSAGES</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Settings size={20} /> SETTINGS</div>
        </div>
      </div>
      
    </div>
  );
}
