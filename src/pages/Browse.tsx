import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRooms } from '../data/mockRooms';
import { RoomCard } from '../components/RoomCard';
import { FilterPanel } from '../components/FilterPanel';
import { BottomNav } from '../components/BottomNav';

type Filters = {
  priceRange: [number, number];
  roomType: string;
  neighborhoods: string[];
  moveIn: string;
};

export function Browse() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'price-low' | 'price-high' | 'newest'>('match');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 3000],
    roomType: 'all',
    neighborhoods: [],
    moveIn: 'any',
  });

  // Filter rooms
  const filteredRooms = useMemo(() => {
    let rooms = mockRooms.filter(room => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = 
          room.description.toLowerCase().includes(query) ||
          room.location.toLowerCase().includes(query) ||
          room.vibeTags.some((v: string) => v.toLowerCase().includes(query));
        if (!matches) return false;
      }
      
      // Price range
      if (room.rent < filters.priceRange[0] || room.rent > filters.priceRange[1]) {
        return false;
      }
      
      // Neighborhoods
      if (filters.neighborhoods.length > 0) {
        const roomNeighborhood = room.location.split(',')[0].trim();
        if (!filters.neighborhoods.some(n => roomNeighborhood.includes(n))) {
          return false;
        }
      }
      
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        rooms = [...rooms].sort((a, b) => a.rent - b.rent);
        break;
      case 'price-high':
        rooms = [...rooms].sort((a, b) => b.rent - a.rent);
        break;
      case 'newest':
        rooms = [...rooms].sort((a, b) => new Date(b.availableFrom).getTime() - new Date(a.availableFrom).getTime());
        break;
    }

    return rooms;
  }, [searchQuery, filters, sortBy]);

  const activeFilterCount = 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 3000 ? 1 : 0) +
    (filters.roomType !== 'all' ? 1 : 0) +
    filters.neighborhoods.length +
    (filters.moveIn !== 'any' ? 1 : 0);

  const sortOptions = [
    { value: 'match', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#1E1F22' }}>
      {/* Colorful Header with gradient */}
      <header 
        className="sticky top-0 z-30"
        style={{ 
          background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(30, 31, 34, 1) 100%)',
          borderBottom: '1px solid rgba(88, 101, 242, 0.2)'
        }}
      >
        {/* Top bar with logo */}
        <div 
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(88, 101, 242, 0.1)' }}
        >
          <h1 
            className="text-lg font-bold"
            style={{ 
              background: 'linear-gradient(135deg, #5865F2 0%, #EB459E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            🏠 Find Rooms
          </h1>
          <button
            onClick={() => navigate('/discover')}
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B5BAC1" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        {/* Search Bar - Clean, minimal */}
        <div className="px-4 py-3">
          <div 
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ 
              backgroundColor: '#2B2D31',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#949BA4" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search location, neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#F2F3F5' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#949BA4" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Row */}
        <div className="px-4 pb-3 flex items-center gap-2">
          {/* Filters Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ 
              backgroundColor: activeFilterCount > 0 ? '#5865F2' : 'transparent',
              border: activeFilterCount > 0 ? 'none' : '1px solid rgba(255,255,255,0.15)',
              color: activeFilterCount > 0 ? '#fff' : '#B5BAC1'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span 
                className="ml-1 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                {activeFilterCount}
              </span>
            )}
          </motion.button>

          {/* Quick Filter Pills */}
          <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { key: 'private', label: 'Private', active: filters.roomType === 'private' },
              { key: 'budget', label: 'Under $1000', active: filters.priceRange[1] <= 1000 },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => {
                  if (filter.key === 'private') {
                    setFilters(f => ({ ...f, roomType: f.roomType === 'private' ? 'all' : 'private' }));
                  } else if (filter.key === 'budget') {
                    setFilters(f => ({ ...f, priceRange: f.priceRange[1] <= 1000 ? [0, 3000] : [0, 1000] }));
                  }
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: filter.active ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
                  border: `1px solid ${filter.active ? '#5865F2' : 'rgba(255,255,255,0.15)'}`,
                  color: filter.active ? '#5865F2' : '#B5BAC1'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Results Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-sm" style={{ color: '#949BA4' }}>
          <span className="font-semibold" style={{ color: '#F2F3F5' }}>{filteredRooms.length}</span> rooms available
        </p>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: '#B5BAC1' }}
          >
            {sortOptions.find(o => o.value === sortBy)?.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          
          <AnimatePresence>
            {showSortDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 py-1 rounded-lg shadow-xl z-50"
                  style={{ 
                    backgroundColor: '#2B2D31',
                    border: '1px solid rgba(255,255,255,0.1)',
                    minWidth: '160px'
                  }}
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as typeof sortBy);
                        setShowSortDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm transition-colors"
                      style={{ 
                        color: sortBy === option.value ? '#5865F2' : '#B5BAC1',
                        backgroundColor: sortBy === option.value ? 'rgba(88, 101, 242, 0.1)' : 'transparent'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Room Grid - Airbnb style 2-column */}
      <div className="px-4">
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredRooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#949BA4" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#F2F3F5' }}>No rooms found</h3>
            <p className="text-sm mb-6" style={{ color: '#949BA4' }}>Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  priceRange: [0, 3000],
                  roomType: 'all',
                  neighborhoods: [],
                  moveIn: 'any',
                });
              }}
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: '#5865F2', color: '#fff' }}
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onUpdateFilters={setFilters}
      />
    </div>
  );
}
