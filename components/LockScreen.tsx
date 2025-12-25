import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Camera, Flashlight, Fingerprint } from 'lucide-react';

const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ 
          opacity: 0, 
          scale: 1.1, 
          filter: 'blur(20px)',
          transition: { duration: 0.4, ease: "easeOut" } 
      }}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-pointer"
      onClick={onUnlock}
    >
      {/* Background with Depth Simulation */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-105"
        style={{ 
            backgroundImage: 'url(https://picsum.photos/seed/neoncity/1080/1920)',
            filter: 'brightness(0.7)'
        }}
      />
      
      {/* Depth Effect Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center pt-24 h-full text-white px-6">
        
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
        >
            <Lock size={20} className="mb-4 opacity-70" />
            <h2 className="text-xl font-medium tracking-wide mb-[-10px] text-pink-200 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                December 2025
            </h2>
            <h1 className="text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                10:24
            </h1>
        </motion.div>

        {/* Notifications Stack */}
        <div className="mt-12 w-full max-w-sm space-y-3">
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="neo-glass p-4 rounded-3xl flex items-center space-x-4 border-l-4 border-l-blue-500"
            >
                <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                    <span className="text-xl">💬</span>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-sm">Messages</h4>
                        <span className="text-[10px] text-white/50">Now</span>
                    </div>
                    <p className="text-xs text-white/80 leading-tight">Sarah: Are you seeing this update? The graphics are insane!</p>
                </div>
            </motion.div>
        </div>

        {/* Bottom Actions - Haptic Trigger Zone */}
        <div className="absolute bottom-10 w-full px-12 flex justify-between items-center">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors pointer-events-none">
                <Flashlight size={24} />
            </div>
            
            <div className="flex flex-col items-center space-y-2 animate-pulse">
                <Fingerprint size={40} className="text-white/50" />
                <div className="text-xs font-medium text-white/40 uppercase tracking-widest">
                    Touch to Unlock
                </div>
            </div>

            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors pointer-events-none">
                <Camera size={24} />
            </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 w-32 h-1 bg-white rounded-full opacity-80" />
      </div>
    </motion.div>
  );
};

export default LockScreen;