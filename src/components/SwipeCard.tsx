import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Room } from '../data/mockRooms';

interface SwipeCardProps {
  room: Room;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isTop: boolean;
}

export function SwipeCard({ room, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Rotation based on x position
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  
  // Opacity for stamps based on drag
  const likeOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const nopeOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);
  const superOpacity = useTransform(y, [-200, -100, 0], [1, 0.5, 0]);
  
  // Background tint
  const greenTint = useTransform(x, [0, 200], [0, 0.3]);
  const redTint = useTransform(x, [-200, 0], [0.3, 0]);
  const purpleTint = useTransform(y, [-200, 0], [0.3, 0]);

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    const threshold = 100;
    const velocityThreshold = 500;
    
    if (info.offset.y < -threshold || info.velocity.y < -velocityThreshold) {
      onSwipe('up');
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: isTop ? 1.02 : 1 }}
    >
      {/* Card Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Room Photo */}
        <img
          src={room.photo}
          alt={room.location}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Color Tints */}
        <motion.div
          className="absolute inset-0 bg-green-500 pointer-events-none"
          style={{ opacity: greenTint }}
        />
        <motion.div
          className="absolute inset-0 bg-red-500 pointer-events-none"
          style={{ opacity: redTint }}
        />
        <motion.div
          className="absolute inset-0 bg-purple-500 pointer-events-none"
          style={{ opacity: purpleTint }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Rent Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-discord-primary text-white font-bold text-sm shadow-lg">
          ${room.rent}/mo
        </div>
        
        {/* Room Type Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass text-white text-xs font-medium">
          {room.roomType}
        </div>
        
        {/* LIKE Stamp */}
        <motion.div
          className="absolute top-16 left-6 border-4 border-green-500 text-green-500 text-3xl font-black px-4 py-2 rounded-lg -rotate-12 pointer-events-none"
          style={{ opacity: likeOpacity }}
        >
          LIKE ❤️
        </motion.div>
        
        {/* NOPE Stamp */}
        <motion.div
          className="absolute top-16 right-6 border-4 border-red-500 text-red-500 text-3xl font-black px-4 py-2 rounded-lg rotate-12 pointer-events-none"
          style={{ opacity: nopeOpacity }}
        >
          NOPE 👋
        </motion.div>
        
        {/* SUPER Stamp */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 border-4 border-purple-500 text-purple-400 text-3xl font-black px-4 py-2 rounded-lg pointer-events-none"
          style={{ opacity: superOpacity }}
        >
          SUPER ⭐
        </motion.div>
        
        {/* Info Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Location & Date */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{room.location}</h2>
            <span className="text-discord-text-secondary text-sm">
              Available {formatDate(room.availableFrom)}
            </span>
          </div>
          
          {/* Address */}
          <p className="text-discord-text-muted text-sm mb-3">{room.address}</p>
          
          {/* Details Row */}
          <div className="flex items-center gap-4 mb-3 text-sm text-discord-text-secondary">
            <span className="flex items-center gap-1">
              👥 {room.roommateCount} roommate{room.roommateCount > 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              🛁 {room.attachedBathroom ? 'Private' : 'Shared'} bath
            </span>
            <span className="flex items-center gap-1">
              📅 {room.leaseDuration}mo
            </span>
          </div>
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 rounded-full bg-discord-elevated/80 text-xs text-discord-text-secondary"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="px-2 py-1 rounded-full bg-discord-elevated/80 text-xs text-discord-text-muted">
                +{room.amenities.length - 3}
              </span>
            )}
          </div>
          
          {/* Vibe Tags */}
          <div className="flex flex-wrap gap-2">
            {room.vibeTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full glass-light text-xs text-white font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
