import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Phone, Car, Loader2, Battery, Wifi } from 'lucide-react';
import { DynamicIslandState } from '../types';

interface DynamicIslandProps {
  state: DynamicIslandState;
  systemState: string;
}

const DynamicIsland: React.FC<DynamicIslandProps> = ({ state, systemState }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-collapse after interaction
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const variants = {
    idle: { width: 120, height: 35, borderRadius: 20 },
    expanded: { width: 360, height: 180, borderRadius: 40 },
    music: { width: 200, height: 35, borderRadius: 20 },
    musicExpanded: { width: 360, height: 160, borderRadius: 40 },
    uber: { width: 360, height: 80, borderRadius: 40 },
  };

  const getVariant = () => {
    if (state === DynamicIslandState.IDLE) return variants.idle;
    if (state === DynamicIslandState.MUSIC) return isExpanded ? variants.musicExpanded : variants.music;
    if (state === DynamicIslandState.UBER) return variants.uber;
    return variants.idle;
  };

  const content = () => {
    if (state === DynamicIslandState.IDLE) {
      return (
        <motion.div className="flex w-full h-full items-center justify-between px-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <div className="w-1/3"></div>
           <div className="w-1/3"></div>
        </motion.div>
      );
    }

    if (state === DynamicIslandState.MUSIC) {
        if (isExpanded) {
            return (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full h-full p-6 text-white"
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <img 
                            src="https://picsum.photos/seed/album/100/100" 
                            className="w-12 h-12 rounded-lg shadow-lg" 
                            alt="Album Art"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold text-lg">Neon Nights</span>
                            <span className="text-white/60 text-sm">CyberPunk Orchestra</span>
                        </div>
                        <div className="ml-auto">
                            <Music className="w-6 h-6 animate-pulse text-pink-500" />
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full mb-4">
                        <div className="w-2/3 h-full bg-white rounded-full"></div>
                    </div>

                    <div className="flex justify-between items-center text-2xl">
                        <i className="fas fa-backward hover:text-white/80 cursor-pointer">⏮</i>
                        <i className="fas fa-pause hover:scale-110 transition-transform cursor-pointer">⏸</i>
                        <i className="fas fa-forward hover:text-white/80 cursor-pointer">⏭</i>
                    </div>
                </motion.div>
            )
        }
        return (
            <motion.div className="flex w-full h-full items-center justify-between px-3 text-white" layout>
                <img src="https://picsum.photos/seed/album/50/50" className="w-5 h-5 rounded-full" />
                <div className="flex space-x-1 items-end h-3 mx-2">
                     <motion.div animate={{ height: [5, 15, 5] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-green-400 rounded-full" />
                     <motion.div animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.1 }} className="w-1 bg-green-400 rounded-full" />
                     <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }} className="w-1 bg-green-400 rounded-full" />
                </div>
                <Music size={14} className="text-white/50" />
            </motion.div>
        );
    }

    if (state === DynamicIslandState.UBER) {
        return (
            <motion.div className="flex w-full h-full items-center justify-between px-6 text-white">
                <div className="flex items-center space-x-3">
                    <div className="bg-black border border-white/20 p-2 rounded-full">
                        <Car size={20} className="text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">Arriving in 2 min</span>
                        <span className="text-xs text-white/60">Toyota Camry • 4.9★</span>
                    </div>
                </div>
                <div className="text-xl font-bold text-blue-400">2:00</div>
            </motion.div>
        )
    }

    return null;
  };

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      <motion.div
        className="bg-black text-white shadow-2xl overflow-hidden relative cursor-pointer"
        animate={getVariant()}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
        {content()}
      </motion.div>
    </div>
  );
};

export default DynamicIsland;