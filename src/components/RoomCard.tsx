import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Room } from '../data/mockRooms';

interface RoomCardProps {
  room: Room;
  index: number;
}

export function RoomCard({ room, index }: RoomCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const matchPercent = 70 + (parseInt(room.id) % 30);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/room/${room.id}`)}
      className="cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
        <img
          src={room.photo}
          alt={room.location}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Match Badge - Top Left */}
        <div 
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff' }}
        >
          {matchPercent}% match
        </div>
        
        {/* Favorite Button - Top Right */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ 
            backgroundColor: isFavorite ? '#5865F2' : 'rgba(0,0,0,0.5)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? '#fff' : 'none'}
            stroke="#fff" 
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      
      {/* Content - Clean Airbnb style */}
      <div>
        {/* Location & Rating Row */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-[15px]" style={{ color: '#F2F3F5' }}>
            {room.location}
          </h3>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F2F3F5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-medium" style={{ color: '#F2F3F5' }}>4.9</span>
          </div>
        </div>
        
        {/* Room Details */}
        <p className="text-sm mb-1" style={{ color: '#949BA4' }}>
          {room.roomType} room · {room.roommateCount} roommate{room.roommateCount > 1 ? 's' : ''}
        </p>
        
        {/* Available Date */}
        <p className="text-sm mb-2" style={{ color: '#949BA4' }}>
          Available {formatDate(room.availableFrom)}
        </p>
        
        {/* Price */}
        <p>
          <span className="font-semibold" style={{ color: '#F2F3F5' }}>${room.rent}</span>
          <span className="text-sm" style={{ color: '#949BA4' }}> / month</span>
        </p>
      </div>
    </motion.div>
  );
}
