import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Battery, Wifi, Signal } from 'lucide-react';
import AlwaysOnDisplay from './components/AlwaysOnDisplay';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import DynamicIsland from './components/DynamicIsland';
import ControlCenter from './components/ControlCenter';
import NotificationCenter from './components/NotificationCenter';
import { SystemState, DynamicIslandState, PanelState } from './types';

const StatusBar: React.FC<{ onPanelOpen: (p: PanelState) => void }> = ({ onPanelOpen }) => (
    <div className="absolute top-0 w-full h-12 px-8 flex justify-between items-center z-[110] text-white font-medium text-sm mix-blend-difference">
        <div 
            className="h-full flex-1 flex items-center cursor-pointer pointer-events-auto" 
            onClick={() => onPanelOpen('NOTIFICATIONS')}
        >
            <span>9:41</span>
        </div>
        <div className="w-32" /> {/* Dynamic Island Space */}
        <div 
            className="h-full flex-1 flex items-center justify-end space-x-2 cursor-pointer pointer-events-auto"
            onClick={() => onPanelOpen('CONTROL')}
        >
            <Signal size={16} />
            <Wifi size={16} />
            <Battery size={20} />
        </div>
    </div>
);

const App: React.FC = () => {
  const [osState, setOsState] = useState<SystemState>('AOD');
  const [panelState, setPanelState] = useState<PanelState>('NONE');
  const [islandState, setIslandState] = useState<DynamicIslandState>(DynamicIslandState.IDLE);
  const [neuralMessage, setNeuralMessage] = useState<string | null>(null);

  const handleWake = () => {
    if (osState === 'AOD') setOsState('LOCK');
  };

  const handleUnlock = () => {
    if (osState === 'LOCK') setOsState('HOME');
  };

  const triggerNeuralNotification = (message: string) => {
    setNeuralMessage(message);
    setIslandState(DynamicIslandState.UBER);
    setTimeout(() => {
        setIslandState(DynamicIslandState.IDLE);
        setNeuralMessage(null);
    }, 5000);
  };

  return (
    <div className="w-full h-screen bg-gray-950 flex items-center justify-center sm:p-4 overflow-hidden">
      {/* Phone Frame */}
      <div className="relative w-full h-full sm:w-auto sm:max-w-[400px] sm:h-auto sm:aspect-[9/19.5] bg-black sm:rounded-[55px] shadow-2xl sm:border-[8px] border-gray-800 overflow-hidden sm:ring-4 ring-gray-900/50 flex flex-col">
        
        {/* Screen Content */}
        <div className={`relative flex-1 w-full h-full overflow-hidden bg-black transition-all duration-700 ${panelState !== 'NONE' ? 'prism-blur scale-95 origin-center rounded-[3rem]' : ''}`}>
            
            {osState !== 'AOD' && <StatusBar onPanelOpen={setPanelState} />}
            <DynamicIsland state={islandState} systemState={osState} />

            <AnimatePresence mode="wait">
                {osState === 'AOD' && (
                    <AlwaysOnDisplay key="aod" onClick={handleWake} />
                )}
                {osState === 'LOCK' && (
                    <LockScreen key="lock" onUnlock={handleUnlock} />
                )}
                {osState === 'HOME' && (
                    <HomeScreen key="home" onNeuralTrigger={triggerNeuralNotification} />
                )}
            </AnimatePresence>

            {/* Neural Overlay Message */}
            <AnimatePresence>
                {neuralMessage && islandState === DynamicIslandState.UBER && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-24 left-0 w-full flex justify-center z-[60] pointer-events-none"
                    >
                        <div className="neo-glass px-6 py-3 rounded-full text-white text-sm font-medium shadow-purple-500/20 shadow-xl border border-purple-500/30 max-w-[80%] text-center">
                            Neural Core: {neuralMessage}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Paneles Flotantes */}
        <ControlCenter isOpen={panelState === 'CONTROL'} onClose={() => setPanelState('NONE')} />
        <NotificationCenter isOpen={panelState === 'NOTIFICATIONS'} onClose={() => setPanelState('NONE')} />
      </div>
    </div>
  );
};

export default App;