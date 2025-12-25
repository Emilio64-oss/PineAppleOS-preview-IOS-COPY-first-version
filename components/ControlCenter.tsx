import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Zap, Moon, Sun, Volume2, Play, SkipForward, SkipBack } from 'lucide-react';

const ControlCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(50);

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 w-full h-full z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        className="w-[85%] max-w-[340px] bg-black/60 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 flex flex-col space-y-6 pointer-events-auto shadow-2xl relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
        
        {/* Header */}
        <div className="flex justify-center pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Control Hub</span>
        </div>

        {/* Connectivity Cube Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-3xl p-4 grid grid-cols-2 gap-3 justify-items-center items-center border border-white/10">
            <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Wifi size={18} className="text-white" />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Bluetooth size={18} className="text-white" />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <Zap size={18} className="text-white" />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Moon size={18} className="text-white" />
            </motion.div>
          </div>

          <div className="bg-white/5 rounded-3xl p-4 flex flex-col justify-center items-center space-y-2 border border-white/10">
            <div className="flex items-center justify-between w-full px-1">
                <SkipBack size={20} className="text-white/50" />
                <Play size={24} className="text-white fill-white" />
                <SkipForward size={20} className="text-white/50" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">Not Playing</div>
          </div>
        </div>

        {/* Sliders */}
        <div className="flex space-x-4 h-40">
          {/* Brightness */}
          <div className="flex-1 flex flex-col items-center space-y-3">
             <div className="relative w-full flex-1 bg-white/10 rounded-3xl overflow-hidden border border-white/5">
                <div 
                  className="absolute bottom-0 w-full bg-white transition-all duration-100 ease-out"
                  style={{ height: `${brightness}%` }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-4 mix-blend-difference pointer-events-none">
                    <Sun size={24} className="text-white/50" />
                </div>
                <input 
                  type="range" min="0" max="100" value={brightness} 
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
             </div>
          </div>

          {/* Volume */}
          <div className="flex-1 flex flex-col items-center space-y-3">
             <div className="relative w-full flex-1 bg-white/10 rounded-3xl overflow-hidden border border-white/5">
                <div 
                  className="absolute bottom-0 w-full bg-white transition-all duration-100 ease-out"
                  style={{ height: `${volume}%` }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-4 mix-blend-difference pointer-events-none">
                    <Volume2 size={24} className="text-white/50" />
                </div>
                <input 
                  type="range" min="0" max="100" value={volume} 
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ControlCenter;