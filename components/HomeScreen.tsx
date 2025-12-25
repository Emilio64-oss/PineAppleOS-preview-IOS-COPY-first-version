import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, Music, Mail, Calendar, Settings, 
    Camera, Map, Compass, Cloud, Globe, Cpu, User, Phone,
    Activity, Shield, Zap, Thermometer, Search, Layers,
    CloudRain, Heart, TrendingUp, DollarSign, Image as ImageIcon,
    Video, Gamepad2, PenTool, LayoutGrid, Calculator,
    CreditCard, ShoppingBag, Tv, Share2, Aperture, Youtube,
    Instagram, Twitter, Linkedin, Wifi, Battery
} from 'lucide-react';
import { generateNeuralResponse } from '../services/geminiService';

// --- COMPONENTS ---

const AppIcon: React.FC<{ icon: React.ReactNode; name: string; color: string; onClick?: () => void }> = ({ icon, name, color, onClick }) => (
    <motion.div 
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -5 }}
        className="flex flex-col items-center space-y-1 cursor-pointer"
        onClick={onClick}
    >
        <div className={`w-16 h-16 rounded-[1.2rem] ${color} shadow-lg relative overflow-hidden flex items-center justify-center border border-white/20`}>
             <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
             <div className="text-white drop-shadow-md">
                 {icon}
             </div>
             {/* Glossy reflection */}
             <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/20 rotate-45 transform origin-bottom-right blur-md" />
        </div>
        <span className="text-[11px] font-medium text-white drop-shadow-md tracking-tight">{name}</span>
    </motion.div>
);

const Widget = ({ children, size = "small" }: { children?: React.ReactNode, size?: "small" | "medium" | "large" }) => (
    <div className={`neo-glass rounded-[1.5rem] p-4 relative overflow-hidden ${size === 'medium' ? 'col-span-2' : ''}`}>
        {children}
    </div>
);

// --- SCREEN 0: LEFT WIDGETS ---
const WidgetsPage = () => (
    <div className="px-6 pt-16 h-full flex flex-col space-y-4">
        <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Neural Feed</h2>
        
        <Widget size="medium">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/50">
                    <Activity className="text-purple-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold">System Health</h3>
                    <p className="text-white/60 text-xs">Optimal • 98% Efficiency</p>
                </div>
                <div className="ml-auto text-purple-300 font-mono text-xl">98%</div>
            </div>
            <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[98%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            </div>
        </Widget>

        <div className="grid grid-cols-2 gap-4">
            <Widget>
                <div className="flex flex-col items-center justify-center h-full space-y-2 text-white">
                    <Shield className="text-blue-400" size={28} />
                    <span className="text-xs font-bold opacity-70">Security</span>
                    <span className="text-sm">Active</span>
                </div>
            </Widget>
             <Widget>
                <div className="flex flex-col items-center justify-center h-full space-y-2 text-white">
                    <Thermometer className="text-red-400" size={28} />
                    <span className="text-xs font-bold opacity-70">CPU Temp</span>
                    <span className="text-sm">42°C</span>
                </div>
            </Widget>
        </div>

        <Widget size="medium">
             <div className="flex justify-between items-start mb-2">
                 <h3 className="text-white font-bold text-sm">News Briefing</h3>
                 <Globe size={16} className="text-white/50" />
             </div>
             <div className="space-y-3">
                 <div className="text-white/80 text-xs border-l-2 border-blue-500 pl-2">
                     Global Tech Summit announces new AI regulations.
                 </div>
                 <div className="text-white/80 text-xs border-l-2 border-pink-500 pl-2">
                     SpaceX successful launch of Starship V.
                 </div>
             </div>
        </Widget>
    </div>
);

// --- SCREEN 1: MAIN APPS ---
const AppsPage = ({ onNeuralTrigger }: { onNeuralTrigger: (text: string) => void }) => {
    const [neuralStatus, setNeuralStatus] = useState("Standby");
    const handleNeuralCheck = async () => {
        setNeuralStatus("Thinking...");
        const response = await generateNeuralResponse("Home Screen Context", "Give me a cool, futuristic status update about the system.");
        onNeuralTrigger(response);
        setNeuralStatus("Standby");
    };

    return (
        <div className="px-6 pt-16 h-full flex flex-col">
          {/* Widgets Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
                <Widget size="medium">
                    <div className="flex flex-col h-full justify-between text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xs uppercase opacity-70 font-bold">Weather</h3>
                                <p className="text-2xl font-light">San Francisco</p>
                            </div>
                            <Cloud className="text-yellow-400" />
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-bold">18°</span>
                            <span className="text-sm opacity-80">Partly Cloudy</span>
                        </div>
                    </div>
                </Widget>
                <div className="col-span-2 flex space-x-4">
                     <div className="neo-glass rounded-[1.5rem] p-4 flex-1 flex flex-col justify-between text-white" onClick={handleNeuralCheck}>
                        <Cpu className="text-purple-400 mb-2" />
                        <div>
                            <h3 className="text-xs opacity-70 font-bold">Neural Core</h3>
                            <p className="text-sm font-medium leading-tight truncate">{neuralStatus}</p>
                        </div>
                     </div>
                     <div className="neo-glass rounded-[1.5rem] p-4 flex-1 flex flex-col justify-between text-white">
                        <Calendar className="text-red-400 mb-2" />
                        <div>
                             <h3 className="text-xs opacity-70 font-bold">Tue 12</h3>
                             <p className="text-sm font-medium">Design Review</p>
                        </div>
                     </div>
                </div>
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
              <AppIcon icon={<MessageSquare />} name="Messages" color="bg-green-500/80" />
              <AppIcon icon={<Map />} name="Maps" color="bg-blue-500/80" />
              <AppIcon icon={<Calendar />} name="Calendar" color="bg-red-500/80" />
              <AppIcon icon={<Settings />} name="Settings" color="bg-gray-500/80" />
              
              <AppIcon icon={<Camera />} name="Camera" color="bg-gray-800/80" />
              <AppIcon icon={<Cloud />} name="Weather" color="bg-blue-400/80" />
              <AppIcon icon={<Compass />} name="Safari" color="bg-blue-600/80" />
              <AppIcon icon={<Globe />} name="News" color="bg-pink-500/80" />
          </div>
        </div>
    );
};

// --- SCREEN 2: VOLUMETRIC WIDGET HUB ---
const VolumetricPage = () => (
    <div className="px-6 pt-16 h-full flex flex-col space-y-6">
        <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 pl-2">Volumetric Hub</h2>

        {/* Mega Weather Widget: Rain on Glass */}
        <div className="w-full h-48 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-blue-900/40 to-slate-800/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/22/Rain_drops_on_window_01_cropped.jpg')] bg-cover opacity-30 mix-blend-overlay"></div>
            <div className="absolute top-4 left-6 z-10">
                <div className="flex items-center space-x-2 text-white">
                    <CloudRain size={32} className="text-blue-300" />
                    <span className="text-3xl font-light">Rainy</span>
                </div>
                <div className="text-6xl font-bold text-white mt-2 tracking-tighter">14°</div>
            </div>
            <div className="absolute bottom-4 right-6 text-right">
                <p className="text-white/60 text-sm">Humidity 82%</p>
                <p className="text-white/60 text-sm">Precipitation 100%</p>
            </div>
            {/* Volumetric Rain Effect Layers */}
            <motion.div 
                animate={{ y: [0, 20] }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-50 pointer-events-none"
            />
        </div>

        <div className="grid grid-cols-2 gap-4 h-48">
             {/* Neon Fitness Ring - FIXED: Overflow Hidden + Aspect Square Constraint */}
             <div className="rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center relative p-4 overflow-hidden shadow-lg w-full h-full">
                 <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
                 <div className="relative w-full h-full flex items-center justify-center">
                    <svg className="w-[80%] h-[80%] transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                        <motion.circle 
                            cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                            strokeDasharray="314"
                            strokeDashoffset="100"
                            initial={{ strokeDashoffset: 314 }}
                            animate={{ strokeDashoffset: 50 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <Heart size={20} className="text-red-500 animate-pulse drop-shadow-md" />
                        <span className="text-white font-bold text-lg mt-1">145</span>
                        <span className="text-[9px] text-white/50 uppercase">BPM</span>
                    </div>
                 </div>
                 <div className="absolute bottom-3 text-white/80 font-medium text-[10px] uppercase tracking-wider">Cardio Zone</div>
             </div>

             {/* Spiral Calendar - Simulated with perspective */}
             <div className="rounded-[2.5rem] bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-xl border border-white/5 p-5 relative overflow-hidden flex flex-col">
                <h3 className="text-white/50 text-xs font-bold uppercase mb-3">Up Next</h3>
                <div className="space-y-3" style={{ perspective: '500px' }}>
                    <motion.div className="bg-white/10 p-3 rounded-xl border-l-2 border-pink-500" style={{ transform: 'rotateX(10deg) translateZ(0px)' }}>
                        <p className="text-white text-xs font-bold">Meeting</p>
                        <p className="text-white/50 text-[10px]">10:00 AM</p>
                    </motion.div>
                    <motion.div className="bg-white/5 p-3 rounded-xl border-l-2 border-purple-500 opacity-60" style={{ transform: 'rotateX(20deg) translateZ(-20px) scale(0.95)' }}>
                        <p className="text-white text-xs font-bold">Lunch</p>
                        <p className="text-white/50 text-[10px]">1:00 PM</p>
                    </motion.div>
                    <motion.div className="bg-white/5 p-3 rounded-xl border-l-2 border-blue-500 opacity-30" style={{ transform: 'rotateX(30deg) translateZ(-40px) scale(0.9)' }}>
                        <p className="text-white text-xs font-bold">Gym</p>
                        <p className="text-white/50 text-[10px]">6:00 PM</p>
                    </motion.div>
                </div>
             </div>
        </div>
    </div>
);

// --- SCREEN 3: MODULAR APP LIBRARY 3.0 ---

const LargeAppIcon: React.FC<{ icon: React.ReactNode; color: string; onClick?: () => void }> = ({ icon, color, onClick }) => (
    <motion.div 
        whileTap={{ scale: 0.85 }}
        className={`w-full h-full ${color} rounded-[0.9rem] flex items-center justify-center text-white shadow-inner relative overflow-hidden`}
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        {icon}
    </motion.div>
);

const MiniAppGrid: React.FC<{ icons: React.ReactNode[]; color: string }> = ({ icons, color }) => (
    <motion.div 
        whileTap={{ scale: 1.2, zIndex: 10 }}
        className="w-full h-full bg-white/10 rounded-[0.9rem] grid grid-cols-2 gap-1 p-1 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
        {icons.map((icon, i) => (
             <div key={i} className={`flex items-center justify-center rounded-md ${color} text-white/80`}>
                 {React.cloneElement(icon as React.ReactElement, { size: 8 })}
             </div>
        ))}
    </motion.div>
);

const SmartFolder: React.FC<{ 
    title: string; 
    categoryColor: string; 
    borderColor: string;
    mainApps: { icon: React.ReactNode, color: string }[];
    miniApps: React.ReactNode[];
}> = ({ title, categoryColor, borderColor, mainApps, miniApps }) => (
    <div className={`relative aspect-square rounded-[1.8rem] bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col p-3 shadow-2xl group`}>
        {/* Neon Bezel Effect */}
        <div className={`absolute inset-0 border-2 opacity-30 rounded-[1.8rem] pointer-events-none transition-opacity duration-500 group-hover:opacity-60 ${borderColor}`} 
             style={{ boxShadow: `inset 0 0 15px ${categoryColor}` }}
        />
        
        {/* Grid 2x2 */}
        <div className="flex-1 grid grid-cols-2 gap-3 mb-1">
             {mainApps.map((app, i) => (
                 <LargeAppIcon key={i} icon={app.icon} color={app.color} onClick={() => alert(`Opening App...`)} />
             ))}
             {/* The 4th space expands */}
             <MiniAppGrid icons={miniApps} color="bg-gray-700/50" />
        </div>
        <div className="text-[10px] font-bold text-white/50 pl-1 uppercase tracking-wide">{title}</div>
    </div>
);

const LibraryPage = () => (
    <div className="px-5 pt-16 h-full flex flex-col">
        {/* Liquid Metal Search Bar */}
        <div className="w-full h-11 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-2xl flex items-center px-4 space-x-2 shadow-[0_4px_15px_rgba(255,255,255,0.2)] mb-8 transform hover:scale-[1.02] transition-transform">
            <Search size={16} className="text-black/60" />
            <span className="text-black/50 text-xs font-semibold tracking-wide">App Library</span>
            <div className="ml-auto w-5 h-5 bg-black/10 rounded-full flex items-center justify-center">
                <LayoutGrid size={10} className="text-black/50" />
            </div>
        </div>

        <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 pl-2">Smart Collections</h2>

        {/* Modular Grid */}
        <div className="grid grid-cols-2 gap-4 pb-20 overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            
            <SmartFolder 
                title="Suggestions" 
                categoryColor="rgba(59, 130, 246, 0.5)"
                borderColor="border-blue-500"
                mainApps={[
                    { icon: <MessageSquare size={20} />, color: "bg-green-500" },
                    { icon: <Phone size={20} />, color: "bg-green-600" },
                    { icon: <Mail size={20} />, color: "bg-blue-500" },
                ]}
                miniApps={[<Map />, <Calendar />, <Settings />, <Music />]}
            />

            <SmartFolder 
                title="Social" 
                categoryColor="rgba(236, 72, 153, 0.5)"
                borderColor="border-pink-500"
                mainApps={[
                    { icon: <Instagram size={20} />, color: "bg-pink-600" },
                    { icon: <Twitter size={20} />, color: "bg-blue-400" },
                    { icon: <Linkedin size={20} />, color: "bg-blue-700" },
                ]}
                miniApps={[<Share2 />, <MessageSquare />, <User />, <Heart />]}
            />

            <SmartFolder 
                title="Creativity" 
                categoryColor="rgba(245, 158, 11, 0.5)"
                borderColor="border-yellow-500"
                mainApps={[
                    { icon: <Camera size={20} />, color: "bg-gray-800" },
                    { icon: <ImageIcon size={20} />, color: "bg-white/20" },
                    { icon: <Aperture size={20} />, color: "bg-purple-600" },
                ]}
                miniApps={[<PenTool />, <Video />, <Layers />, <Music />]}
            />

            <SmartFolder 
                title="Utilities" 
                categoryColor="rgba(107, 114, 128, 0.5)"
                borderColor="border-gray-500"
                mainApps={[
                    { icon: <Calculator size={20} />, color: "bg-gray-700" },
                    { icon: <Settings size={20} />, color: "bg-gray-600" },
                    { icon: <Cloud size={20} />, color: "bg-blue-400" },
                ]}
                miniApps={[<Compass />, <Shield />, <Wifi />, <Battery />]}
            />

             <SmartFolder 
                title="Finance" 
                categoryColor="rgba(16, 185, 129, 0.5)"
                borderColor="border-emerald-500"
                mainApps={[
                    { icon: <DollarSign size={20} />, color: "bg-emerald-600" },
                    { icon: <CreditCard size={20} />, color: "bg-slate-700" },
                    { icon: <TrendingUp size={20} />, color: "bg-blue-600" },
                ]}
                miniApps={[<ShoppingBag />, <Calculator />, <Globe />, <Shield />]}
            />

            <SmartFolder 
                title="Entertainment" 
                categoryColor="rgba(239, 68, 68, 0.5)"
                borderColor="border-red-500"
                mainApps={[
                    { icon: <Youtube size={20} />, color: "bg-red-600" },
                    { icon: <Tv size={20} />, color: "bg-black" },
                    { icon: <Music size={20} />, color: "bg-pink-500" },
                ]}
                miniApps={[<Gamepad2 />, <Video />, <Globe />, <ImageIcon />]}
            />

        </div>
    </div>
);

// --- MAIN CAROUSEL ---
const HomeScreen: React.FC<{ onNeuralTrigger: (text: string) => void }> = ({ onNeuralTrigger }) => {
    const [page, setPage] = useState(1); // 0: Widgets, 1: Home, 2: Volumetric, 3: Library

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const getPage = (index: number) => {
        switch(index) {
            case 0: return <WidgetsPage />;
            case 1: return <AppsPage onNeuralTrigger={onNeuralTrigger} />;
            case 2: return <VolumetricPage />;
            case 3: return <LibraryPage />;
            default: return <AppsPage onNeuralTrigger={onNeuralTrigger} />;
        }
    };

  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
       {/* Wallpaper - Parallax Effect simulated by keeping it static while content moves */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
            backgroundImage: 'url(https://picsum.photos/seed/neoncity/1080/1920)',
            filter: 'brightness(0.5) blur(0px)'
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col">
          
          <div className="flex-1 relative">
            <AnimatePresence initial={false} custom={page} mode="popLayout">
                <motion.div
                    key={page}
                    className="absolute inset-0 w-full h-full"
                    custom={page}
                    // Deep Parallax: Entering slides start further away (+/- 300) to create depth
                    initial={(d) => ({ x: d < page ? -300 : 300, opacity: 0, scale: 0.9 })}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={(d) => ({ x: d < page ? 300 : -300, opacity: 0, scale: 1.1 })} 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        // Swipe Left (Go Right)
                        if (swipe < -swipeConfidenceThreshold && page < 3) {
                            setPage(page + 1);
                        } 
                        // Swipe Right (Go Left)
                        else if (swipe > swipeConfidenceThreshold && page > 0) {
                            setPage(page - 1);
                        }
                    }}
                >
                    {getPage(page)}
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Page Indicator */}
          <div className="mt-auto mb-6 flex justify-center space-x-2 z-20">
              {[0, 1, 2, 3].map((i) => (
                   <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${page === i ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-125' : 'bg-white/30'}`} 
                    onClick={() => setPage(i)}
                   />
              ))}
          </div>

          {/* Dock - Always Visible (Glass Morphism) */}
          <div className="mx-auto mb-4 w-full max-w-[95%] h-24 neo-glass rounded-[2.5rem] flex items-center justify-evenly px-2 border-t border-white/20 z-20">
             <AppIcon icon={<Phone size={28} />} name="" color="bg-green-500" />
             <AppIcon icon={<Mail size={28} />} name="" color="bg-blue-500" />
             <AppIcon icon={<Globe size={28} />} name="" color="bg-white/10 backdrop-blur-md" />
             <AppIcon icon={<Music size={28} />} name="" color="bg-pink-500" />
          </div>
          
           {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-80 z-20" />
      </div>
    </motion.div>
  );
};

export default HomeScreen;