import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import {
  PRODUCT_ASSETS,
  COLORWAYS,
  MATERIALS,
  ENGINEERING_ANNOTATIONS,
  STORYBOARD_FRAMES,
  PRODUCT_SPECS,
  SIZES,
} from '../data/productData';
import { Colorway } from '../types';
import { ArrowRight, ChevronRight, Check, Compass, ShieldCheck, Sparkles, Layers, Sliders } from 'lucide-react';
import { sound } from '../utils/sound';

interface CinematicStageProps {
  onSceneChange: (sceneIndex: number, progress: number) => void;
  selectedColorway: Colorway;
  onSelectColorway: (colorway: Colorway) => void;
  onOpenBag: () => void;
  onAddToCart: (colorway: Colorway, size: number) => void;
}

export const CinematicStage: React.FC<CinematicStageProps> = ({
  onSceneChange,
  selectedColorway,
  onSelectColorway,
  onOpenBag,
  onAddToCart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState<string>('mesh');
  const [activeAnnotation, setActiveAnnotation] = useState<string>('heel');
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [lastAnnouncedScene, setLastAnnouncedScene] = useState<number>(1);
  const [isAddedDirect, setIsAddedDirect] = useState(false);

  // Global Timeline Scroll Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active scene index and report up
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let currentScene = 1;
    if (latest < 0.11) currentScene = 1; // Reveal
    else if (latest < 0.22) currentScene = 2; // Hero Product
    else if (latest < 0.35) currentScene = 3; // Materials
    else if (latest < 0.48) currentScene = 4; // Disassembly / Exploded
    else if (latest < 0.60) currentScene = 5; // Engineering
    else if (latest < 0.72) currentScene = 6; // Movement
    else if (latest < 0.83) currentScene = 7; // Horizontal Film
    else if (latest < 0.91) currentScene = 8; // Colorways
    else if (latest < 0.97) currentScene = 9; // Specs
    else currentScene = 10; // Final Conversion

    if (currentScene !== lastAnnouncedScene) {
      setLastAnnouncedScene(currentScene);
      sound.playTick(currentScene * 80 + 350);
    }
    onSceneChange(currentScene, latest);
  });

  // ================= SCENE 01: THE REVEAL (0.00 - 0.11) =================
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.11], [1, 1, 0]);
  const rimLightGlow = useTransform(scrollYProgress, [0, 0.06, 0.11], [0.8, 1, 0.2]);
  const word1Opacity = useTransform(scrollYProgress, [0, 0.07, 0.10], [1, 1, 0]);
  const word2Opacity = useTransform(scrollYProgress, [0, 0.07, 0.10], [1, 1, 0]);
  const label1Opacity = useTransform(scrollYProgress, [0, 0.07, 0.10], [1, 1, 0]);
  const shoeRevealScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.08]);
  const shoeRevealRotate = useTransform(scrollYProgress, [0, 0.08], [-2, 2]);
  const shoeRevealY = useTransform(scrollYProgress, [0, 0.08], [0, -25]);

  // ================= SCENE 02: HERO PRODUCT (0.11 - 0.22) =================
  const scene2Opacity = useTransform(scrollYProgress, [0.09, 0.12, 0.19, 0.23], [0, 1, 1, 0]);
  const heroShoeScale = useTransform(scrollYProgress, [0.11, 0.16, 0.22], [1, 1.06, 1.15]);
  const heroShoeY = useTransform(scrollYProgress, [0.11, 0.16, 0.22], [0, -10, -25]);
  const heroShoeRotate = useTransform(scrollYProgress, [0.11, 0.16, 0.22], [0, -3, 2]);

  // ================= SCENE 03: MATERIAL STORY (0.22 - 0.35) =================
  const scene3Opacity = useTransform(scrollYProgress, [0.21, 0.24, 0.32, 0.36], [0, 1, 1, 0]);
  const materialZoomScale = useTransform(scrollYProgress, [0.22, 0.28, 0.34], [1.1, 1.45, 1.25]);
  const materialPanX = useTransform(scrollYProgress, [0.22, 0.28, 0.34], [0, -60, 40]);
  const materialPanY = useTransform(scrollYProgress, [0.22, 0.28, 0.34], [0, -40, 20]);

  // ================= SCENE 04: SHOE DISASSEMBLY (0.35 - 0.48) =================
  const scene4Opacity = useTransform(scrollYProgress, [0.34, 0.37, 0.45, 0.49], [0, 1, 1, 0]);
  const explodedSpread = useTransform(scrollYProgress, [0.35, 0.41, 0.47], [0, 1, 0.1]);
  const layer1Y = useTransform(scrollYProgress, [0.35, 0.41, 0.47], [0, -110, 0]);
  const layer2Y = useTransform(scrollYProgress, [0.35, 0.41, 0.47], [0, -35, 0]);
  const layer3Y = useTransform(scrollYProgress, [0.35, 0.41, 0.47], [0, 35, 0]);
  const layer4Y = useTransform(scrollYProgress, [0.35, 0.41, 0.47], [0, 110, 0]);

  // ================= SCENE 05: ENGINEERING (0.48 - 0.60) =================
  const scene5Opacity = useTransform(scrollYProgress, [0.47, 0.50, 0.57, 0.61], [0, 1, 1, 0]);
  const engineShoeRotate = useTransform(scrollYProgress, [0.48, 0.54, 0.60], [4, 0, -4]);

  // ================= SCENE 06: MOVEMENT (0.60 - 0.72) =================
  const scene6Opacity = useTransform(scrollYProgress, [0.59, 0.62, 0.69, 0.73], [0, 1, 1, 0]);
  const speedTranslateX = useTransform(scrollYProgress, [0.60, 0.66, 0.72], [-80, 0, 80]);
  const speedBlur = useTransform(scrollYProgress, [0.60, 0.66, 0.72], [8, 0, 8]);
  const motionLinesX = useTransform(scrollYProgress, [0.60, 0.72], ['0%', '-40%']);

  // ================= SCENE 07: HORIZONTAL PRODUCT FILM (0.72 - 0.83) =================
  const scene7Opacity = useTransform(scrollYProgress, [0.71, 0.74, 0.81, 0.84], [0, 1, 1, 0]);
  const storyboardX = useTransform(scrollYProgress, [0.72, 0.83], ['0%', '-75%']);

  // ================= SCENE 08: COLOR / VARIANTS (0.83 - 0.91) =================
  const scene8Opacity = useTransform(scrollYProgress, [0.82, 0.85, 0.89, 0.92], [0, 1, 1, 0]);

  // ================= SCENE 09: PRODUCT SPECIFICATION (0.91 - 0.97) =================
  const scene9Opacity = useTransform(scrollYProgress, [0.90, 0.92, 0.96, 0.98], [0, 1, 1, 0]);

  // ================= SCENE 10: FINAL HERO / CONVERSION (0.97 - 1.00) =================
  const scene10Opacity = useTransform(scrollYProgress, [0.96, 0.98, 1], [0, 1, 1]);
  const scene10Scale = useTransform(scrollYProgress, [0.96, 1], [0.94, 1]);

  const handleDirectAdd = () => {
    sound.playTick(950);
    setIsAddedDirect(true);
    onAddToCart(selectedColorway, selectedSize);
    setTimeout(() => setIsAddedDirect(false), 2000);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[750vh] bg-[#050505] text-zinc-100">
      
      {/* FIXED CINEMATIC VIEWPORT STAGE */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-auto select-none">
        
        {/* Deep Studio Background and Vignette */}
        <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
        <div className="absolute inset-0 studio-vignette pointer-events-none" />
        
        {/* Subtle grid lines for industrial craft feel */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] opacity-25 pointer-events-none" />

        {/* Global HUD Ambient Marker (Bottom Left) */}
        <div className="absolute bottom-6 left-6 sm:left-10 z-40 flex items-center gap-3 font-mono-tech text-[10px] sm:text-xs text-zinc-500 tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-zinc-300">AERON LABS // PROTO-01</span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-500">FRAME CALIBRATION ACTIVE</span>
        </div>

        {/* Global HUD Scroll Indicator (Bottom Right) */}
        <div className="absolute bottom-6 right-6 sm:right-10 z-40 flex items-center gap-2.5 font-mono-tech text-[10px] text-zinc-500">
          <span className="tracking-widest uppercase hidden sm:inline">SCROLL TO DIRECT FILM</span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1 bg-white/5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 01: THE REVEAL & HERO ANIMATION */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene1Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto"
        >
          {/* Dynamic Ambient Studio Lighting Aura */}
          <motion.div
            style={{ opacity: rimLightGlow }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute w-[700px] h-[350px] rounded-full bg-white blur-3xl pointer-events-none"
          />

          {/* Top Hero Badging and Typography */}
          <div className="absolute top-[14%] sm:top-[16%] text-center z-30 flex flex-col items-center px-4 max-w-4xl">
            {/* Edition Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ opacity: label1Opacity }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-3 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-tech text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-300 uppercase">
                AERON-01 // SS26 ARCHIVE EDITION
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ opacity: word1Opacity }}
                className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase"
              >
                BUILT
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ opacity: word2Opacity }}
                className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-zinc-500 uppercase"
              >
                TO MOVE.
              </motion.span>
            </div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="text-xs sm:text-sm text-zinc-400 font-normal mt-2 max-w-md"
            >
              Supercritical nitrogen propulsion engineered for modern urban kinetics.
            </motion.p>
          </div>

          {/* Hero Floating Sneaker Centerpiece with Idle Levitation & Scroll Parallax */}
          <motion.div
            style={{
              scale: shoeRevealScale,
              rotate: shoeRevealRotate,
              y: shoeRevealY,
            }}
            className="relative w-full max-w-3xl px-6 flex flex-col justify-center items-center mt-8 sm:mt-12"
          >
            {/* Idle Levitation Container */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-1.5, 1.5, -1.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
                ease: 'easeInOut',
              }}
              className="relative flex justify-center items-center"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                src={PRODUCT_ASSETS.hero}
                alt="AERON 01 Hero Cinematic Model"
                referrerPolicy="no-referrer"
                className="w-full max-h-[48vh] sm:max-h-[55vh] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] select-none pointer-events-none"
              />

              {/* Floating Tech Spec Badge 1 (Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -left-2 sm:left-4 top-1/4 p-2 sm:p-2.5 rounded-2xl bg-[#0d0d0f]/90 border border-white/10 backdrop-blur-md shadow-2xl hidden sm:flex items-center gap-2.5 font-mono-tech text-[10px] text-zinc-300"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <div className="font-bold text-white">285 GRAMS</div>
                  <div className="text-[9px] text-zinc-500">NITROGEN MATRIX</div>
                </div>
              </motion.div>

              {/* Floating Tech Spec Badge 2 (Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="absolute -right-2 sm:right-4 bottom-1/4 p-2 sm:p-2.5 rounded-2xl bg-[#0d0d0f]/90 border border-white/10 backdrop-blur-md shadow-2xl hidden sm:flex items-center gap-2.5 font-mono-tech text-[10px] text-zinc-300"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
                <div>
                  <div className="font-bold text-white">82% REBOUND</div>
                  <div className="text-[9px] text-zinc-500">DYNAMIC ENERGY</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Dynamic Ground Contact Shadow */}
            <motion.div
              animate={{
                scale: [0.92, 1.08, 0.92],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
                ease: 'easeInOut',
              }}
              className="w-72 sm:w-96 h-6 rounded-[100%] bg-black/80 blur-md mt-2 pointer-events-none"
            />
          </motion.div>

          {/* Interactive Scroll-Down & Explore CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-[14%] sm:bottom-[12%] z-30 flex flex-col items-center gap-2"
          >
            <button
              onClick={() => {
                sound.playTick(600);
                window.scrollTo({
                  top: window.innerHeight * 0.9,
                  behavior: 'smooth',
                });
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-mono-tech text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 hover:gap-3 group active:scale-95"
            >
              <span>EXPLORE ARCHITECTURE</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <span className="text-[10px] font-mono-tech text-zinc-500 tracking-widest uppercase">
              OR SCROLL DOWN TO DIRECT FILM
            </span>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 02: HERO PRODUCT (55%–70% Viewport Dominance) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene2Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        >
          {/* Background Atmospheric Studio Reflection */}
          <div className="absolute w-[800px] h-[400px] rounded-full bg-white/[0.03] blur-[120px] pointer-events-none" />

          {/* Large Hero Shoe Composition */}
          <motion.div
            style={{
              scale: heroShoeScale,
              y: heroShoeY,
              rotate: heroShoeRotate,
            }}
            className="relative w-full max-w-5xl px-6 flex justify-center items-center"
          >
            <img
              src={PRODUCT_ASSETS.hero}
              alt="AERON 01 Hero Product Studio"
              referrerPolicy="no-referrer"
              className="w-full max-h-[65vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
            />
          </motion.div>

          {/* Hero Typography Overlays */}
          <div className="absolute top-[12%] sm:top-[15%] left-6 sm:left-12 max-w-md text-left z-30">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
              [ 02 / HERO DESIGN ]
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1 leading-tight">
              A new generation of movement.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-2 leading-relaxed">
              Engineered for everyday motion. Designed for the city.
            </p>
          </div>

          {/* Minimal specs badge */}
          <div className="absolute bottom-[14%] right-6 sm:right-12 text-right font-mono-tech text-xs text-zinc-400 hidden sm:block">
            <div className="text-white font-medium text-sm">285 GRAMS</div>
            <div className="text-[10px] text-zinc-500 tracking-wider">SUPERCRITICAL CHASSIS</div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 03: MATERIAL STORY (Macro Zoom & Zonal Annotations) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto"
        >
          {/* Zoomed Macro Texture Asset directly on screen */}
          <motion.div
            style={{
              scale: materialZoomScale,
              x: materialPanX,
              y: materialPanY,
            }}
            className="relative w-full max-w-5xl px-4 flex justify-center items-center"
          >
            <img
              src={PRODUCT_ASSETS.macro}
              alt="AERON 01 Material Macro Story"
              referrerPolicy="no-referrer"
              className="w-full max-h-[72vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] select-none pointer-events-none"
            />
          </motion.div>

          {/* Editorial Headline Overlay */}
          <div className="absolute top-[10%] left-6 sm:left-12 z-30 max-w-sm pointer-events-none">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
              [ 03 / MATERIAL STORY ]
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              TACTILE ANATOMY.
            </h2>
            <p className="text-xs text-zinc-400 font-normal mt-1.5 leading-relaxed">
              Ultrasonic bonded seams meet high-tensile monofilament weave.
            </p>
          </div>

          {/* Interactive Material Callouts Selector */}
          <div className="absolute bottom-[12%] left-6 sm:left-12 right-6 sm:right-12 z-30 flex flex-wrap gap-2.5 justify-start sm:justify-center">
            {MATERIALS.map((mat) => {
              const isSelected = activeMaterial === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => {
                    sound.playTick(600);
                    setActiveMaterial(mat.id);
                  }}
                  className={`px-4 py-2.5 rounded-xl border text-left transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-[#0d0d0f]/80 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-[9px] font-mono-tech uppercase tracking-wider opacity-80">
                    {mat.category}
                  </div>
                  <div className="text-xs font-bold font-display tracking-tight">
                    {mat.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Material Description Card */}
          <div className="absolute top-[18%] right-6 sm:right-12 z-30 max-w-xs p-4 rounded-2xl bg-[#0d0d0f]/90 border border-white/10 backdrop-blur-xl hidden md:block shadow-2xl">
            {(() => {
              const current = MATERIALS.find((m) => m.id === activeMaterial) || MATERIALS[0];
              return (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest">
                      {current.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">{current.name}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {current.description}
                  </p>
                </div>
              );
            })()}
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 04: SHOE DISASSEMBLY (Signature Exploded Layers) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        >
          {/* Header Typography */}
          <div className="absolute top-[10%] sm:top-[12%] text-center z-30">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
              [ 04 / ARCHITECTURE ]
            </span>
            <h2 className="font-display text-2xl sm:text-5xl font-black tracking-tight text-white uppercase mt-1">
              EVERY LAYER HAS A PURPOSE.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2 font-normal">
              Disassembled into 4 distinct modular components engineered for pure propulsion.
            </p>
          </div>

          {/* Exploded Layers Multi-plane Render */}
          <div className="relative w-full max-w-4xl px-6 flex justify-center items-center">
            <motion.div
              style={{ scale: 1.05 }}
              className="relative w-full flex justify-center items-center"
            >
              <img
                src={PRODUCT_ASSETS.exploded}
                alt="AERON 01 Exploded Technical Architecture"
                referrerPolicy="no-referrer"
                className="w-full max-h-[60vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
              />

              {/* Layer Floating Badges */}
              <motion.div
                style={{ y: layer1Y }}
                className="absolute top-[22%] left-[10%] sm:left-[18%] p-2.5 rounded-xl bg-[#0d0d0f]/90 border border-white/15 font-mono-tech text-[10px] text-white shadow-2xl flex items-center gap-2 hidden sm:flex backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                <span>01 // ENGINEERED UPPER</span>
              </motion.div>

              <motion.div
                style={{ y: layer2Y }}
                className="absolute top-[38%] right-[8%] sm:right-[15%] p-2.5 rounded-xl bg-[#0d0d0f]/90 border border-white/15 font-mono-tech text-[10px] text-white shadow-2xl flex items-center gap-2 hidden sm:flex backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>02 // NITROGEN MATRIX</span>
              </motion.div>

              <motion.div
                style={{ y: layer3Y }}
                className="absolute bottom-[36%] left-[8%] sm:left-[15%] p-2.5 rounded-xl bg-[#0d0d0f]/90 border border-white/15 font-mono-tech text-[10px] text-white shadow-2xl flex items-center gap-2 hidden sm:flex backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>03 // 3K CARBON SHANK</span>
              </motion.div>

              <motion.div
                style={{ y: layer4Y }}
                className="absolute bottom-[18%] right-[10%] sm:right-[18%] p-2.5 rounded-xl bg-[#0d0d0f]/90 border border-white/15 font-mono-tech text-[10px] text-white shadow-2xl flex items-center gap-2 hidden sm:flex backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>04 // BIO-RUBBER OUTSOLE</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 05: ENGINEERING (Editorial Annotations & Vector Lines) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene5Opacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto"
        >
          {/* Header */}
          <div className="absolute top-[10%] sm:top-[12%] left-6 sm:left-12 z-30 pointer-events-none">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
              [ 05 / ENGINEERING ]
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase mt-1">
              ENGINEERED WITH INTENTION.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-sm">
              Computational biomechanics meet aerodynamic craft.
            </p>
          </div>

          {/* Reconstructed Shoe with Interactive Hotspots */}
          <motion.div
            style={{ rotate: engineShoeRotate }}
            className="relative w-full max-w-4xl px-6 flex justify-center items-center"
          >
            <img
              src={PRODUCT_ASSETS.hero}
              alt="AERON 01 Reconstructed Technical Blueprint"
              referrerPolicy="no-referrer"
              className="w-full max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />

            {/* Editorial Hotspots */}
            {ENGINEERING_ANNOTATIONS.map((anno) => {
              const isActive = activeAnnotation === anno.id;
              return (
                <button
                  key={anno.id}
                  onClick={() => {
                    sound.playTick(700);
                    setActiveAnnotation(anno.id);
                  }}
                  style={{
                    left: `${anno.anchor.x}%`,
                    top: `${anno.anchor.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-30"
                  aria-label={anno.title}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                    <span
                      className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 transition-all ${
                        isActive
                          ? 'bg-white border-black scale-125 shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                          : 'bg-[#0d0d0f] border-white/60 hover:scale-110'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Active Annotation Display Card */}
          <div className="absolute bottom-[10%] left-6 sm:left-12 right-6 sm:right-12 z-30 flex justify-center">
            <div className="max-w-md w-full p-4 rounded-2xl bg-[#0d0d0f]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="flex-1">
                {(() => {
                  const current =
                    ENGINEERING_ANNOTATIONS.find((a) => a.id === activeAnnotation) ||
                    ENGINEERING_ANNOTATIONS[0];
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-white uppercase tracking-tight">
                          {current.title}
                        </span>
                        <span className="text-[9px] font-mono-tech text-zinc-500">
                          SPEC.ANNO
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-normal leading-relaxed">
                        {current.description}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 06: MOVEMENT (Speed Lines, Kinetic Sports Commercial Look) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene6Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        >
          {/* Dynamic Light Speed Lines & Particles */}
          <motion.div
            style={{ x: motionLinesX }}
            className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_80px)]"
          />

          {/* Kinetic Motion Blur Atmosphere */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent top-1/2" />

          {/* High-Velocity Kinetic Movement Shoe directly on screen */}
          <motion.div
            style={{
              x: speedTranslateX,
            }}
            className="relative w-full max-w-5xl px-6 flex justify-center items-center"
          >
            <img
              src={PRODUCT_ASSETS.motion}
              alt="AERON 01 High Velocity Movement"
              referrerPolicy="no-referrer"
              className="w-full max-h-[68vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] select-none pointer-events-none"
            />
          </motion.div>

          {/* Kinetic Typography */}
          <div className="absolute top-[12%] text-center z-30">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
              [ 06 / KINETICS ]
            </span>
            <h2 className="font-display text-3xl sm:text-6xl font-black tracking-tight text-white uppercase mt-1">
              BUILT FOR SPEED.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono-tech tracking-wider mt-2">
              DYNAMIC ENERGY RETURN // 82% REBOUND
            </p>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 07: HORIZONTAL PRODUCT FILM (Vertical Scroll Drives Horizontal Film) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene7Opacity }}
          className="absolute inset-0 flex flex-col justify-center z-20 pointer-events-auto overflow-hidden"
        >
          {/* Scene Title */}
          <div className="px-6 sm:px-12 mb-4 flex items-center justify-between z-30">
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
                [ 07 / PRODUCT FILM STORYBOARD ]
              </span>
              <h2 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-white">
                CINEMATIC PERSPECTIVES
              </h2>
            </div>
            <div className="text-xs font-mono-tech text-zinc-500">
              FRAME SEQUENCE 01–07
            </div>
          </div>

          {/* Horizontal Film Strip Carousel (Driven by Scroll) */}
          <motion.div
            style={{ x: storyboardX }}
            className="flex items-center gap-6 px-6 sm:px-12 w-max"
          >
            {STORYBOARD_FRAMES.map((frame, idx) => (
              <div
                key={frame.id}
                className="w-[300px] sm:w-[420px] h-[360px] sm:h-[450px] rounded-3xl p-3 flex flex-col justify-between overflow-hidden group flex-shrink-0 transition-transform duration-500 hover:scale-[1.02]"
              >
                <div className="relative w-full h-[75%] rounded-2xl overflow-hidden bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                  <img
                    src={frame.image}
                    alt={frame.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono-tech text-white border border-white/10">
                    F/{String(idx + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="pt-3 px-1">
                  <div className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-wider">
                    {frame.focalPoint}
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                    {frame.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-normal mt-0.5 truncate">
                    {frame.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 08: COLOR / VARIANTS (Smooth Crossfade & Swatch Transitions) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene8Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto"
        >
          {/* Header */}
          <div className="absolute top-[10%] sm:top-[12%] text-center z-30">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
              [ 08 / COLORWAYS ]
            </span>
            <h2 className="font-display text-2xl sm:text-5xl font-black tracking-tight text-white uppercase mt-1">
              CHROMA & TEXTURE
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 font-normal">
              4 distinct studio editions formulated with mineral pigments.
            </p>
          </div>

          {/* Active Shoe Visualizer with Smooth Fade */}
          <div className="relative w-full max-w-4xl px-6 flex justify-center items-center">
            {COLORWAYS.map((c) => {
              const isCurrent = selectedColorway.id === c.id;
              return (
                <div
                  key={c.id}
                  className={`transition-all duration-700 absolute inset-0 flex justify-center items-center ${
                    isCurrent
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[55vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
                  />
                </div>
              );
            })}
            {/* Height placeholder */}
            <div className="w-full h-[55vh] pointer-events-none" />
          </div>

          {/* Interactive Variant Selection Swatches */}
          <div className="absolute bottom-[10%] sm:bottom-[12%] z-30 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-full bg-[#0d0d0f]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              {COLORWAYS.map((c) => {
                const isActive = selectedColorway.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playTick(750);
                      onSelectColorway(c);
                    }}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-black shadow-lg font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-mono-tech text-xs tracking-wider uppercase">
                      {c.code} {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-zinc-400 font-mono-tech text-center max-w-sm font-medium">
              {selectedColorway.description}
            </p>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 09: PRODUCT SPECIFICATION (Clean Editorial Spec Sheet) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: scene9Opacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto px-6"
        >
          <div className="w-full max-w-5xl rounded-3xl bg-[#0d0d0f]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-6 gap-3">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
                  [ 09 / SPECIFICATION SHEET ]
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                  AERON 01 TECHNICAL DOSSIER
                </h2>
              </div>
              <div className="font-mono-tech text-xs text-zinc-400">
                PRODUCTION RUN: <span className="text-emerald-400 font-bold">BATCH 04 / CERTIFIED</span>
              </div>
            </div>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCT_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-2 hover:border-white/15 transition-colors"
                >
                  <span className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-widest">
                    {spec.label}
                  </span>
                  <div>
                    <div className="font-display font-bold text-lg text-white tracking-tight">
                      {spec.value}
                    </div>
                    {spec.detail && (
                      <p className="text-[11px] font-normal text-zinc-400 mt-1 leading-normal">
                        {spec.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SCENE 10: FINAL HERO / CONVERSION (High-End Luxury Checkout Climax) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: scene10Opacity,
            scale: scene10Scale,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto px-6"
        >
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Final Hero Sneaker Display */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
              <div className="absolute w-[500px] h-[250px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
              <img
                src={selectedColorway.image}
                alt={selectedColorway.name}
                referrerPolicy="no-referrer"
                className="w-full max-h-[48vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
              />
              <div className="mt-4 text-center">
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-zinc-400">
                  SELECTED: {selectedColorway.code} / {selectedColorway.name}
                </span>
              </div>
            </div>

            {/* Right: Conversion Action Terminal */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0d0d0f]/95 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
                  READY TO MOVE?
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                  AERON / 01
                </h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-display text-2xl font-bold text-white">$340 USD</span>
                  <span className="text-xs font-mono-tech text-emerald-400 font-medium">IN STOCK & DISPATCH READY</span>
                </div>
              </div>

              {/* Colorway Switcher */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-tech text-zinc-400">
                  <span>COLORWAY:</span>
                  <span className="text-white font-medium">{selectedColorway.name}</span>
                </div>
                <div className="flex gap-2">
                  {COLORWAYS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        sound.playTick(700);
                        onSelectColorway(c);
                      }}
                      className={`flex-1 py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        selectedColorway.id === c.id
                          ? 'border-white bg-white/10 shadow-sm'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 text-zinc-400'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[9px] font-mono-tech">{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-tech text-zinc-400">
                  <span>SELECT SIZE (EU):</span>
                  <span className="text-zinc-500">TRUE TO SIZE</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        sound.playTick(800);
                        setSelectedSize(sz);
                      }}
                      className={`py-2.5 rounded-xl text-xs font-mono-tech font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-white text-black shadow-lg scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleDirectAdd}
                  className="w-full py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group active:scale-95"
                >
                  {isAddedDirect ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>ADDED TO BAG (EU {selectedSize})</span>
                    </>
                  ) : (
                    <>
                      <span>ADD TO BAG · $340</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.playTick(850);
                    onOpenBag();
                  }}
                  className="w-full py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono-tech text-xs tracking-wider uppercase border border-white/10 transition-colors"
                >
                  VIEW BAG & EXPRESS CHECKOUT
                </button>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center justify-center gap-4 text-[10px] font-mono-tech text-zinc-500 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" /> 100% Authenticity Guaranteed
                </span>
                <span>·</span>
                <span>Free Carbon-Neutral Shipping</span>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};
