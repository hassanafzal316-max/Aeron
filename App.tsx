import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { COLORWAYS } from './productData';
import { Colorway, CartItem } from './types';
import { Navigation } from './Navigation';
import { CinematicStage } from './components/CinematicStage';
import { BagDrawer } from './components/BagDrawer';
import { sound } from './utils/sound';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(COLORWAYS[0]);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll for cinema camera feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleSceneChange = (scene: number, progress: number) => {
    setCurrentScene(scene);
    setScrollProgress(progress);
  };

  const handleJumpToSection = (sceneIndex: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const sceneTargets: Record<number, number> = {
      1: 0.02,
      2: 0.15,
      3: 0.28,
      4: 0.41,
      5: 0.54,
      6: 0.66,
      7: 0.77,
      8: 0.87,
      9: 0.94,
      10: 0.99,
    };

    const targetRatio = sceneTargets[sceneIndex] ?? 0;
    const targetY = totalHeight * targetRatio;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.5 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (colorway: Colorway, size: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.colorway.id === colorway.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${colorway.id}-${size}-${Date.now()}`,
          colorway,
          size,
          quantity: 1,
          unitPrice: 340,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalBagQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-white selection:text-black">
      {/* Sticky Minimal Navigation */}
      <Navigation
        currentScene={currentScene}
        totalScenes={10}
        scrollProgress={scrollProgress}
        bagCount={totalBagQuantity}
        onOpenBag={() => setIsBagOpen(true)}
        onJumpToSection={handleJumpToSection}
      />

      {/* Main 750vh Scroll-Driven Cinematic Experience */}
      <main>
        <CinematicStage
          onSceneChange={handleSceneChange}
          selectedColorway={selectedColorway}
          onSelectColorway={setSelectedColorway}
          onOpenBag={() => setIsBagOpen(true)}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Interactive Cart & Checkout Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        selectedColorway={selectedColorway}
        onSelectColorway={setSelectedColorway}
      />
    </div>
  );
}
