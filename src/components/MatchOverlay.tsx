import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Room } from '../data/mockRooms';

interface MatchOverlayProps {
  room: Room;
  onClose: () => void;
  onMessage: () => void;
}

// Confetti particle component
function ConfettiParticle({ delay }: { delay: number }) {
  const colors = ['#5865F2', '#EB459E', '#23A559', '#FEE75C', '#ED4245'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100;
  const randomRotation = Math.random() * 360;
  
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm"
      style={{ 
        backgroundColor: randomColor,
        left: `${randomX}%`,
        top: '-20px'
      }}
      initial={{ y: 0, rotate: 0, opacity: 1 }}
      animate={{ 
        y: '100vh', 
        rotate: randomRotation + 720,
        opacity: [1, 1, 0]
      }}
      transition={{ 
        duration: 3,
        delay,
        ease: 'easeIn'
      }}
    />
  );
}

export function MatchOverlay({ room, onClose, onMessage }: MatchOverlayProps) {
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => i);
    setConfetti(particles);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-discord-primary/90 via-purple-600/90 to-pink-500/90 backdrop-blur-md"
        />
        
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((i) => (
            <ConfettiParticle key={i} delay={i * 0.02} />
          ))}
        </div>
        
        {/* Content */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black text-white mb-2"
          >
            It's a Match! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg mb-8"
          >
            You and this room are interested in each other
          </motion.p>
          
          {/* Room Card Preview */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-64 rounded-2xl overflow-hidden shadow-2xl mb-8"
          >
            <img
              src={room.photo}
              alt={room.location}
              className="w-full h-40 object-cover"
            />
            <div className="bg-discord-surface p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-white">{room.location}</h3>
                <span className="text-discord-primary font-bold">${room.rent}/mo</span>
              </div>
              <p className="text-discord-text-muted text-sm">{room.roomType} • {room.roommateCount} roommate{room.roommateCount > 1 ? 's' : ''}</p>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMessage}
              className="w-full py-3 px-6 bg-white text-discord-primary font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              Send Message 💬
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full py-3 px-6 bg-transparent text-white font-medium rounded-full border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              Keep Swiping
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
