import React, { useState } from 'react';
import { X, Plus, Minus, Check, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Colorway } from '../types';
import { COLORWAYS, SIZES } from '../data/productData';
import { sound } from '../utils/sound';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToCart: (colorway: Colorway, size: number) => void;
  selectedColorway: Colorway;
  onSelectColorway: (colorway: Colorway) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  selectedColorway,
  onSelectColorway,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    sound.playDeepBoom();
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      sound.playPurchaseChord();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#52525b', '#e4e4e7']
      });
    }, 1200);
  };

  const handleQuickAdd = () => {
    sound.playTick(900);
    onAddToCart(selectedColorway, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0d0d0f] border-l border-white/10 text-zinc-100 flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-300 backdrop-blur-xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight text-white">YOUR BAG</span>
              <span className="text-xs font-mono text-zinc-500 font-medium">({items.reduce((s, i) => s + i.quantity, 0)})</span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5 font-medium">
              COMPLIMENTARY EXPRESS GLOBAL SHIPPING
            </p>
          </div>
          <button
            onClick={() => {
              sound.playTick(500);
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderComplete ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">ORDER CONFIRMED</h3>
              <p className="text-xs font-mono text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Thank you for reserving your pair of AERON / 01. Your production allocation has been verified.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>DISPATCH WINDOW:</span>
                  <span className="text-white font-semibold">24-48 HOURS</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>AUTHENTICITY TOKEN:</span>
                  <span className="text-white font-semibold">AER-88429-X</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors shadow-md"
              >
                RETURN TO EXPERIENCE
              </button>
            </div>
          ) : (
            <>
              {/* Quick Configurator Box inside Bag if empty or customizing */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    CONFIGURE PAIR
                  </span>
                  <span className="text-xs font-bold font-mono text-white">$340 USD</span>
                </div>

                {/* Colorway selector */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">
                    COLORWAY: <span className="text-white font-bold">{selectedColorway.name}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {COLORWAYS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          sound.playTick(750);
                          onSelectColorway(c);
                        }}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                          selectedColorway.id === c.id
                            ? 'border-white bg-white/10 shadow-xs'
                            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 text-zinc-400'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 mb-1"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[9px] font-mono font-semibold truncate w-full text-zinc-300">
                          {c.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>SELECT SIZE (EU):</span>
                    <span className="text-zinc-500 font-medium">TRUE TO SIZE</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          sound.playTick(800);
                          setSelectedSize(sz);
                        }}
                        className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedSize === sz
                            ? 'bg-white text-black shadow-md scale-105'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/[0.08]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TO BAG · {selectedColorway.name} (EU {selectedSize})</span>
                </button>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 font-mono text-xs">
                  Your bag is currently empty. Configure above or browse the experience.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                    BAG CONTENTS
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex gap-3 items-center"
                    >
                      <img
                        src={item.colorway.image}
                        alt={item.colorway.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl bg-black/40 border border-white/[0.08] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-sm tracking-tight truncate text-white">
                            AERON / 01
                          </h4>
                          <span className="font-mono text-xs font-bold text-white">
                            ${item.unitPrice * item.quantity}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400">
                          {item.colorway.name} · EU {item.size}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2 py-0.5 bg-white/5">
                            <button
                              onClick={() => {
                                sound.playTick(500);
                                onUpdateQuantity(item.id, -1);
                              }}
                              className="text-zinc-400 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => {
                                sound.playTick(600);
                                onUpdateQuantity(item.id, 1);
                              }}
                              className="text-zinc-400 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              sound.playTick(450);
                              onRemoveItem(item.id);
                            }}
                            className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 transition-colors uppercase font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Truck className="w-3.5 h-3.5 mb-1 text-zinc-400" />
                  <span>Express Post</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <ShieldCheck className="w-3.5 h-3.5 mb-1 text-zinc-400" />
                  <span>2-Yr Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <RefreshCw className="w-3.5 h-3.5 mb-1 text-zinc-400" />
                  <span>30-Day Return</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {!orderComplete && (
          <div className="p-6 border-t border-white/10 bg-[#0d0d0f]/95 backdrop-blur-xl space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="text-white font-bold">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>GLOBAL SHIPPING</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>ESTIMATED TAX</span>
                <span className="text-zinc-500">CALCULATED AT STEP 2</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                <span>TOTAL</span>
                <span>${subtotal > 0 ? subtotal : 340} USD</span>
              </div>
            </div>

            <button
              onClick={items.length > 0 ? handleCheckout : handleQuickAdd}
              disabled={isCheckingOut}
              className="w-full py-4 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group disabled:opacity-50 active:scale-95"
            >
              {isCheckingOut ? (
                <span>PROCESSING ALLOCATION...</span>
              ) : items.length > 0 ? (
                <>
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <span>ADD TO BAG & CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
