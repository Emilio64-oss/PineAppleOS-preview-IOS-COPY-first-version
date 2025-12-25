import React from 'react';
import { motion } from 'framer-motion';

const AlwaysOnDisplay: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black flex flex-col items-center justify-center z-40 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-center space-y-4 opacity-40 animate-pulse">
        <h1 className="text-8xl font-thin tracking-tighter text-white font-[200]">
          10:24
        </h1>
        <p className="text-lg font-light text-white/60 tracking-widest uppercase">
          Tuesday, Dec 12
        </p>
      </div>
      
      <div className="absolute bottom-20 flex space-x-6 text-white/30">
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            <i className="fas fa-bell"></i>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-xs text-white/20">
        Tap to Wake
      </div>
    </motion.div>
  );
};

export default AlwaysOnDisplay;