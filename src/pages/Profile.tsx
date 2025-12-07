import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

type UserProfile = {
  name: string;
  age: number;
  avatar: string;
  bio: string;
  occupation: string;
  location: string;
  memberSince: string;
  verified: boolean;
  preferences: {
    budget: [number, number];
    moveIn: string;
    roomType: string;
    lifestyle: string[];
  };
  stats: {
    matches: number;
    responses: number;
    listings: number;
  };
};

const mockProfile: UserProfile = {
  name: 'Jordan Smith',
  age: 26,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123',
  bio: 'Software engineer who loves cooking and hiking. Looking for a chill roommate in the Boston area. I work from home 3 days a week and enjoy a clean, quiet living space.',
  occupation: 'Software Engineer',
  location: 'Boston, MA',
  memberSince: 'October 2024',
  verified: true,
  preferences: {
    budget: [800, 1500],
    moveIn: 'January 2025',
    roomType: 'Private',
    lifestyle: ['Early Bird', 'Clean', 'Non-Smoker', 'Pet Friendly'],
  },
  stats: {
    matches: 12,
    responses: 95,
    listings: 1,
  },
};

const menuItems = [
  { icon: '⚙️', label: 'Settings', path: '/settings' },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '🔒', label: 'Privacy', path: '/privacy' },
  { icon: '❓', label: 'Help & Support', path: '/help' },
  { icon: '📜', label: 'Terms of Service', path: '/terms' },
];

export function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'preferences' | 'listings'>('about');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#1E1F22' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-30 px-4 py-4 flex items-center justify-between"
        style={{ 
          background: 'linear-gradient(135deg, rgba(87, 242, 135, 0.1) 0%, rgba(30, 31, 34, 1) 100%)',
          borderBottom: '1px solid rgba(87, 242, 135, 0.15)' 
        }}
      >
        <h1 className="text-xl font-bold gradient-text-success">My Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ 
            background: isEditing 
              ? 'linear-gradient(135deg, #23A559 0%, #57F287 100%)' 
              : 'rgba(255,255,255,0.05)', 
            color: isEditing ? '#fff' : '#B5BAC1',
            boxShadow: isEditing ? '0 4px 15px rgba(87, 242, 135, 0.3)' : 'none'
          }}
        >
          {isEditing ? '✓ Save' : '✏️ Edit'}
        </button>
      </header>

      {/* Profile Header */}
      <div 
        className="px-4 py-8 flex flex-col items-center"
        style={{
          background: 'linear-gradient(180deg, rgba(87, 242, 135, 0.05) 0%, transparent 100%)'
        }}
      >
        <div className="relative mb-4">
          <div 
            className="w-28 h-28 rounded-full p-1"
            style={{ background: 'linear-gradient(135deg, #5865F2, #EB459E, #57F287)' }}
          >
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-full h-full rounded-full object-cover"
              style={{ border: '3px solid #1E1F22' }}
            />
          </div>
          {profile.verified && (
            <div 
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #5865F2, #7289DA)',
                border: '3px solid #1E1F22' 
              }}
            >
              <span className="text-white text-sm">✓</span>
            </div>
          )}
          {isEditing && (
            <button 
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #EB459E, #FE7BBF)', border: '3px solid #1E1F22' }}
            >
              <span className="text-white text-sm">📷</span>
            </button>
          )}
        </div>
        
        <h2 className="text-2xl font-bold" style={{ color: '#F2F3F5' }}>
          {profile.name}, {profile.age}
        </h2>
        <p className="text-sm mt-1" style={{ color: '#B5BAC1' }}>
          {profile.occupation} • {profile.location}
        </p>
        <div 
          className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(88, 101, 242, 0.15)' }}
        >
          <span className="text-xs">✨</span>
          <span className="text-xs font-medium" style={{ color: '#5865F2' }}>Member since {profile.memberSince}</span>
        </div>

        {/* Stats */}
        <div 
          className="flex gap-4 mt-6 p-4 rounded-2xl w-full justify-center"
          style={{ 
            backgroundColor: '#2B2D31',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="text-center flex-1">
            <p 
              className="text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, #5865F2, #7289DA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {profile.stats.matches}
            </p>
            <p className="text-xs font-medium" style={{ color: '#949BA4' }}>Matches</p>
          </div>
          <div className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center flex-1">
            <p 
              className="text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, #23A559, #57F287)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {profile.stats.responses}%
            </p>
            <p className="text-xs font-medium" style={{ color: '#949BA4' }}>Response</p>
          </div>
          <div className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center flex-1">
            <p 
              className="text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, #EB459E, #FE7BBF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {profile.stats.listings}
            </p>
            <p className="text-xs font-medium" style={{ color: '#949BA4' }}>Listings</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div 
          className="flex rounded-xl p-1"
          style={{ backgroundColor: '#2B2D31' }}
        >
          {(['about', 'preferences', 'listings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors"
              style={{
                backgroundColor: activeTab === tab ? '#5865F2' : 'transparent',
                color: activeTab === tab ? '#fff' : '#949BA4'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Bio */}
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#2B2D31' }}
            >
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#B5BAC1' }}>About Me</h3>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-transparent outline-none resize-none text-sm"
                  style={{ color: '#F2F3F5' }}
                  rows={4}
                />
              ) : (
                <p className="text-sm" style={{ color: '#F2F3F5' }}>{profile.bio}</p>
              )}
            </div>

            {/* Lifestyle Tags */}
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#2B2D31' }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#B5BAC1' }}>Lifestyle</h3>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.lifestyle.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: 'rgba(88, 101, 242, 0.2)', color: '#5865F2' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div 
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: '#2B2D31' }}
            >
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => console.log('Navigate to', item.path)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left transition-colors hover:bg-opacity-80"
                  style={{ 
                    borderBottom: index < menuItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1 text-sm" style={{ color: '#F2F3F5' }}>{item.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#949BA4" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ backgroundColor: 'rgba(237, 66, 69, 0.1)', color: '#ED4245' }}
            >
              Log Out
            </button>
          </motion.div>
        )}

        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div 
              className="p-4 rounded-xl space-y-4"
              style={{ backgroundColor: '#2B2D31' }}
            >
              <div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#B5BAC1' }}>Budget Range</h3>
                <p className="text-lg font-semibold" style={{ color: '#F2F3F5' }}>
                  ${profile.preferences.budget[0]} - ${profile.preferences.budget[1]}/mo
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#B5BAC1' }}>Move-in Date</h3>
                <p className="text-lg font-semibold" style={{ color: '#F2F3F5' }}>
                  {profile.preferences.moveIn}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#B5BAC1' }}>Room Type</h3>
                <p className="text-lg font-semibold" style={{ color: '#F2F3F5' }}>
                  {profile.preferences.roomType}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/onboarding')}
              className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ backgroundColor: '#5865F2', color: '#fff' }}
            >
              Update Preferences
            </button>
          </motion.div>
        )}

        {activeTab === 'listings' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {profile.stats.listings > 0 ? (
              <div 
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: '#2B2D31' }}
              >
                <div className="aspect-video relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"
                    alt="Your listing"
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium"
                    style={{ backgroundColor: '#57F287', color: '#1E1F22' }}
                  >
                    Active
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold" style={{ color: '#F2F3F5' }}>Back Bay, Boston</h3>
                      <p className="text-sm" style={{ color: '#949BA4' }}>Private room • Shared bath</p>
                    </div>
                    <p className="font-bold" style={{ color: '#5865F2' }}>$1,200/mo</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      className="flex-1 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#B5BAC1' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="flex-1 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: '#5865F2', color: '#fff' }}
                    >
                      View Matches
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-5xl mb-4 block">🏠</span>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#F2F3F5' }}>No listings yet</h3>
                <p className="text-sm mb-6" style={{ color: '#949BA4' }}>
                  Have a room to rent? Post it and find your perfect roommate!
                </p>
                <button
                  onClick={() => navigate('/post')}
                  className="px-6 py-2.5 rounded-xl font-medium"
                  style={{ backgroundColor: '#5865F2', color: '#fff' }}
                >
                  Post a Room
                </button>
              </div>
            )}

            {profile.stats.listings > 0 && (
              <button
                onClick={() => navigate('/post')}
                className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#B5BAC1' }}
              >
                <span>➕</span> Add Another Listing
              </button>
            )}
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
