import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavigationProps {
  currentScene: number;
  totalScenes: number;
  scrollProgress: number;
  bagCount: number;
  onOpenBag: () => void;
  onJumpToSection: (sceneIndex: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScene,
  scrollProgress,
  bagCount,
  onOpenBag,
  onJumpToSection,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [scrolledPastZero, setScrolledPastZero] = useState(false);

  useEffect(() => {
    setScrolledPastZero(scrollProgress > 0.02);
  }, [scrollProgress]);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'REVEAL', scene: 1 },
    { label: 'DESIGN', scene: 2 },
    { label: 'MATERIALS', scene: 3 },
    { label: 'LAYERS', scene: 4 },
    { label: 'ENGINEERING', scene: 5 },
    { label: 'EDITIONS', scene: 8 },
    { label: 'SPECS', scene: 9 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => onJumpToSection(1)}
            className="group text-left focus:outline-none"
            aria-label="AERON Home"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                AERON
              </span>
              <span className="text-[10px] font-mono-tech tracking-widest text-zinc-500 uppercase hidden sm:inline">
                / 01
              </span>
            </div>
            <p className="text-[9px] font-mono-tech tracking-[0.25em] text-zinc-400 uppercase -mt-1 hidden sm:block">
              BUILT TO MOVE
            </p>
          </button>

          {/* Timecode HUD / Scene Tracker */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-[11px] font-mono-tech text-zinc-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>SCENE <span className="text-white font-medium">{String(currentScene).padStart(2, '0')}</span></span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">{Math.round(scrollProgress * 100)}% TIMELINE</span>
          </div>
        </div>

        {/* Center: Cinematic Chapter Markers */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0d0f]/80 border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentScene === item.scene;
            return (
              <button
                key={item.label}
                onClick={() => {
                  sound.playTick(660);
                  onJumpToSection(item.scene);
                }}
                className={`relative px-3 py-1 text-[10px] font-mono-tech tracking-wider uppercase transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)] font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sound, Bag & Shop CTA */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0d0d0f]/80 hover:bg-[#151518] border border-white/10 text-zinc-300 hover:text-white text-xs font-mono-tech transition-all backdrop-blur-xl focus:outline-none shadow-lg"
            title={isMuted ? 'Unmute atmospheric sound' : 'Mute sound'}
            aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden xl:inline text-[10px] uppercase tracking-wider text-zinc-400">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden xl:inline text-[10px] uppercase tracking-wider text-emerald-400">ATMOSPHERE</span>
              </>
            )}
          </button>

          {/* Bag Cart Trigger */}
          <button
            onClick={() => {
              sound.playTick(720);
              onOpenBag();
            }}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0d0d0f]/80 hover:bg-[#151518] border border-white/10 text-white transition-all backdrop-blur-xl focus:outline-none group hover:border-white/20 shadow-lg"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-300 group-hover:scale-105 transition-transform" />
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold font-mono text-black bg-white rounded-full shadow-lg animate-in zoom-in">
                {bagCount}
              </span>
            )}
          </button>

          {/* Direct Shop CTA */}
          <button
            onClick={() => {
              sound.playTick(800);
              onJumpToSection(10);
            }}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-zinc-100 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 group focus:outline-none"
          >
            <span>SHOP</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Subtle bottom progress line */}
      <div className="w-full h-[1px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-zinc-600 via-white to-zinc-400 transition-all duration-75 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </header>
  );
};
