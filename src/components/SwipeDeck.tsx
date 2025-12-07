import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { mockRooms } from '../data/mockRooms';
import type { Room } from '../data/mockRooms';
import { SwipeCard } from './SwipeCard';

interface SwipeDeckProps {
  onMatch: (room: Room) => void;
}

export function SwipeDeck({ onMatch }: SwipeDeckProps) {
  const [rooms, setRooms] = useState<Room[]>([...mockRooms]);
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    setLastDirection(direction);
    
    const currentRoom = rooms[rooms.length - 1];
    
    // Remove the swiped card
    setRooms((prev) => prev.slice(0, -1));
    
    // Check for match on right swipe or super like
    if ((direction === 'right' || direction === 'up') && currentRoom?.isMatch) {
      setTimeout(() => {
        onMatch(currentRoom);
      }, 300);
    }
  };

  const handleButtonSwipe = (direction: 'left' | 'right' | 'up') => {
    handleSwipe(direction);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Card Stack */}
      <div className="relative w-[320px] sm:w-[350px] h-[480px] sm:h-[520px]">
        <AnimatePresence>
          {rooms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center glass rounded-3xl"
            >
              <span className="text-6xl mb-4">🏠</span>
              <h3 className="text-xl font-bold text-discord-text mb-2">No more rooms!</h3>
              <p className="text-discord-text-muted text-sm">Check back later for new listings</p>
            </motion.div>
          ) : (
            rooms.map((room, index) => {
              const isTop = index === rooms.length - 1;
              const scale = 1 - (rooms.length - 1 - index) * 0.05;
              const yOffset = (rooms.length - 1 - index) * -10;
              
              return (
                <motion.div
                  key={room.id}
                  initial={{ scale: 0.95, y: -20, opacity: 0 }}
                  animate={{ 
                    scale, 
                    y: yOffset, 
                    opacity: index >= rooms.length - 3 ? 1 : 0 
                  }}
                  exit={{ 
                    x: lastDirection === 'left' ? -500 : lastDirection === 'right' ? 500 : 0,
                    y: lastDirection === 'up' ? -500 : 0,
                    opacity: 0,
                    rotate: lastDirection === 'left' ? -30 : lastDirection === 'right' ? 30 : 0,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ 
                    zIndex: index,
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <SwipeCard
                    room={room}
                    onSwipe={handleSwipe}
                    isTop={isTop}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      {rooms.length > 0 && (
        <div className="flex items-center gap-4">
          {/* Pass Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonSwipe('left')}
            className="w-14 h-14 rounded-full border-2 border-discord-danger bg-transparent flex items-center justify-center text-2xl shadow-lg hover:bg-discord-danger/20 transition-colors"
          >
            👋
          </motion.button>
          
          {/* Super Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonSwipe('up')}
            className="w-16 h-16 rounded-full bg-discord-primary flex items-center justify-center text-2xl shadow-lg hover:bg-discord-primary-hover transition-colors"
          >
            ⭐
          </motion.button>
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonSwipe('right')}
            className="w-14 h-14 rounded-full border-2 border-discord-success bg-transparent flex items-center justify-center text-2xl shadow-lg hover:bg-discord-success/20 transition-colors"
          >
            ❤️
          </motion.button>
        </div>
      )}
      
      {/* Remaining count */}
      <p className="text-discord-text-muted text-sm">
        {rooms.length} room{rooms.length !== 1 ? 's' : ''} left
      </p>
    </div>
  );
}
