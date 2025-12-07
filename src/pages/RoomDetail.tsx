import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRooms } from '../data/mockRooms';
import { BottomNav } from '../components/BottomNav';

export function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  // Find the room by ID
  const room = mockRooms.find(r => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen bg-discord-bg flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🏠</span>
          <h1 className="text-2xl font-bold text-discord-text mb-2">Room not found</h1>
          <p className="text-discord-text-muted mb-6">This listing may have been removed</p>
          <button
            onClick={() => navigate('/browse')}
            style={{ backgroundColor: '#5865F2' }}
            className="px-6 py-3 rounded-xl text-white font-medium"
          >
            Browse Rooms
          </button>
        </div>
      </div>
    );
  }

  // Mock multiple images (in real app, room would have an images array)
  const images = [
    room.photo,
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  ];

  // Mock roommate data
  const roommate = {
    name: 'Alex Chen',
    age: 24,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    bio: 'Graduate student at MIT. Love cooking, hiking, and board games. Looking for a chill roommate who respects quiet hours.',
    verifiedStudent: true,
    responseRate: '95%',
    responseTime: '< 1 hour',
  };

  const matchPercent = 70 + (parseInt(room.id) % 30);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-discord-bg pb-24">
      {/* Header - Colorful Gradient */}
      <header 
        className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.2) 0%, rgba(30, 31, 34, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(88, 101, 242, 0.2)'
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ 
            backgroundColor: 'rgba(88, 101, 242, 0.2)',
            border: '1px solid rgba(88, 101, 242, 0.3)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5865F2" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ 
              backgroundColor: 'rgba(88, 101, 242, 0.1)',
              border: '1px solid rgba(88, 101, 242, 0.2)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5865F2" strokeWidth="2">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
            </svg>
          </button>
          <button 
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ 
              backgroundColor: 'rgba(235, 69, 158, 0.1)',
              border: '1px solid rgba(235, 69, 158, 0.2)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB459E" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={images[currentImageIndex]}
            alt={room.location}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Match badge */}
        <div 
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-sm font-bold"
          style={{ backgroundColor: '#23A559' }}
        >
          {matchPercent}% match
        </div>

        {/* Navigation arrows */}
        {currentImageIndex > 0 && (
          <button
            onClick={() => setCurrentImageIndex(i => i - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            ‹
          </button>
        )}
        {currentImageIndex < images.length - 1 && (
          <button
            onClick={() => setCurrentImageIndex(i => i + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            ›
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Price and location */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-discord-text mb-1">
              ${room.rent}<span className="text-lg font-normal text-discord-text-muted">/mo</span>
            </h1>
            <p className="text-discord-text-secondary flex items-center gap-1">
              📍 {room.address}
            </p>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#2B2D31', color: '#5865F2' }}
          >
            {room.roomType}
          </span>
        </div>

        {/* Quick stats */}
        <div 
          className="grid grid-cols-3 gap-3 p-4 rounded-2xl mb-6"
          style={{ backgroundColor: '#2B2D31' }}
        >
          <div className="text-center">
            <span className="text-2xl mb-1 block">🗓️</span>
            <p className="text-discord-text text-sm font-medium">{formatDate(room.availableFrom)}</p>
            <p className="text-discord-text-muted text-xs">Available</p>
          </div>
          <div className="text-center">
            <span className="text-2xl mb-1 block">👥</span>
            <p className="text-discord-text text-sm font-medium">{room.roommateCount} roommate{room.roommateCount > 1 ? 's' : ''}</p>
            <p className="text-discord-text-muted text-xs">Currently</p>
          </div>
          <div className="text-center">
            <span className="text-2xl mb-1 block">📅</span>
            <p className="text-discord-text text-sm font-medium">{room.leaseDuration} months</p>
            <p className="text-discord-text-muted text-xs">Lease</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-discord-text mb-3">About this room</h2>
          <p className="text-discord-text-secondary leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-discord-text mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: '#2B2D31', color: '#B5BAC1' }}
              >
                {amenity}
              </span>
            ))}
            <span
              className="px-3 py-1.5 rounded-full text-sm"
              style={{ backgroundColor: '#2B2D31', color: '#B5BAC1' }}
            >
              {room.attachedBathroom ? '🛁 Private Bath' : '🚿 Shared Bath'}
            </span>
          </div>
        </div>

        {/* Vibe tags */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-discord-text mb-3">Vibe</h2>
          <div className="flex flex-wrap gap-2">
            {room.vibeTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'rgba(88, 101, 242, 0.2)', color: '#5865F2' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Roommate preferences */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-discord-text mb-3">Looking for</h2>
          <p className="text-discord-text-secondary">
            {room.flatmateGender === 'Any' ? 'Open to all genders' : `${room.flatmateGender} preferred`}
          </p>
        </div>

        {/* Roommate profile */}
        <div 
          className="p-4 rounded-2xl mb-6"
          style={{ backgroundColor: '#2B2D31' }}
        >
          <h2 className="text-lg font-bold text-discord-text mb-4">Meet your potential roommate</h2>
          <div className="flex items-start gap-4">
            <img
              src={roommate.avatar}
              alt={roommate.name}
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: '#313338' }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-discord-text">{roommate.name}</h3>
                <span className="text-discord-text-muted">{roommate.age}</span>
                {roommate.verifiedStudent && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#23A559', color: 'white' }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-discord-text-secondary text-sm mb-3">{roommate.bio}</p>
              <div className="flex gap-4 text-xs text-discord-text-muted">
                <span>📩 {roommate.responseRate} response</span>
                <span>⏱️ {roommate.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div 
          className="h-48 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: '#2B2D31' }}
        >
          <div className="text-center">
            <span className="text-4xl mb-2 block">🗺️</span>
            <p className="text-discord-text-muted text-sm">Map view coming soon</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div 
        className="fixed bottom-0 left-0 right-0 p-4 border-t"
        style={{ backgroundColor: '#1E1F22', borderColor: '#313338' }}
      >
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-xl font-bold text-lg transition-colors"
            style={{ backgroundColor: '#2B2D31', color: '#F2F3F5', border: '1px solid #313338' }}
          >
            👋 Pass
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowContactModal(true)}
            className="flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg"
            style={{ backgroundColor: '#5865F2' }}
          >
            💬 Message
          </motion.button>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowContactModal(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6"
            style={{ backgroundColor: '#2B2D31' }}
          >
            <h2 className="text-xl font-bold text-discord-text mb-4">Send a message</h2>
            <textarea
              placeholder="Hi! I'm interested in your room listing..."
              className="w-full h-32 p-4 rounded-xl resize-none text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 focus:ring-discord-primary"
              style={{ backgroundColor: '#1E1F22', border: '1px solid #313338' }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-3 rounded-xl font-medium"
                style={{ backgroundColor: '#313338', color: '#B5BAC1' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  navigate('/chat');
                }}
                className="flex-1 py-3 rounded-xl font-medium text-white"
                style={{ backgroundColor: '#5865F2' }}
              >
                Send Message
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
