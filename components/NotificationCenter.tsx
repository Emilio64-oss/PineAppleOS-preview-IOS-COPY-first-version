import React from 'react';
import { motion } from 'framer-motion';
import { NotificationItem } from '../types';

const notifications: NotificationItem[] = [
  { id: '1', app: 'Neural Core', title: 'System Healthy', message: 'All protocols in FluidGesture 5.0 are operational.', time: '10:24 AM', icon: '🧠', urgent: true },
  { id: '2', app: 'Messages', title: 'Sarah', message: 'The liquid glass effect is stunning!', time: '10:22 AM', icon: '💬', urgent: true },
  { id: '3', app: 'Home', title: 'Climate Control', message: 'Ambient light adjusted to "Sunset Bloom".', time: '10:15 AM', icon: '🏠' },
  { id: '4', app: 'Calendar', title: 'System Sync', message: 'Meeting with Dev Team in 30 minutes.', time: '09:30 AM', icon: '🗓' },
];

const NotificationCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      className="absolute inset-0 w-full h-full z-[100] flex flex-col pt-24 px-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
         initial={{ y: -20, opacity: 0 }}
         animate={{ y: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
         transition={{ delay: 0.1 }}
         className="flex justify-between items-center mb-6 px-2"
      >
        <h2 className="text-white text-2xl font-bold tracking-tight">Notifications</h2>
        <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase">Clear All</div>
      </motion.div>
      
      <div className="flex flex-col space-y-3 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ 
                opacity: isOpen ? 1 : 0, 
                scale: isOpen ? 1 : 0.9, 
                x: isOpen ? 0 : -20 
            }}
            transition={{ delay: i * 0.05 + 0.1 }}
            className={`neo-glass rounded-3xl p-4 flex items-start space-x-4 border-l-4 ${n.urgent ? 'border-l-purple-500' : 'border-l-white/20'}`}
          >
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl shadow-inner">
                {n.icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm text-white truncate pr-2">{n.title}</h4>
                    <span className="text-[10px] text-white/90 font-bold uppercase whitespace-nowrap bg-white/10 px-1.5 py-0.5 rounded">{n.time}</span>
                </div>
                <p className="text-xs text-white/70 leading-tight truncate">{n.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationCenter;