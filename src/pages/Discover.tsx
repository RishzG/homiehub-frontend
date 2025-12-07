import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SwipeDeck } from '../components/SwipeDeck';
import { MatchOverlay } from '../components/MatchOverlay';
import { BottomNav } from '../components/BottomNav';
import type { Room } from '../data/mockRooms';

export function Discover() {
  const [matchedRoom, setMatchedRoom] = useState<Room | null>(null);

  const handleMatch = (room: Room) => {
    setMatchedRoom(room);
  };

  const handleCloseMatch = () => {
    setMatchedRoom(null);
  };

  const handleMessage = () => {
    // TODO: Navigate to chat with room owner
    console.log('Message room:', matchedRoom?.id);
    setMatchedRoom(null);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ backgroundColor: '#1E1F22' }}>
      {/* Header - Colorful Gradient */}
      <header 
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3"
        style={{ 
          background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.15) 0%, rgba(30, 31, 34, 1) 100%)',
          borderBottom: '1px solid rgba(235, 69, 158, 0.2)' 
        }}
      >
        <h1 
          className="text-lg font-bold"
          style={{ 
            background: 'linear-gradient(135deg, #EB459E 0%, #5865F2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ✨ HomieHub
        </h1>
        
        <div className="flex items-center gap-2">
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ 
              backgroundColor: 'rgba(235, 69, 158, 0.1)',
              border: '1px solid rgba(235, 69, 158, 0.2)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB459E" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
            style={{ border: '2px solid #5865F2' }}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-1" style={{ color: '#F2F3F5' }}>Discover Rooms</h2>
          <p className="text-sm" style={{ color: '#949BA4' }}>Swipe right on rooms you like</p>
        </div>
        
        <SwipeDeck onMatch={handleMatch} />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Match Overlay */}
      <AnimatePresence>
        {matchedRoom && (
          <MatchOverlay
            room={matchedRoom}
            onClose={handleCloseMatch}
            onMessage={handleMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
