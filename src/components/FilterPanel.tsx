import { motion, AnimatePresence } from 'framer-motion';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    priceRange: [number, number];
    roomType: string;
    neighborhoods: string[];
    moveIn: string;
  };
  onUpdateFilters: (filters: FilterPanelProps['filters']) => void;
}

export function FilterPanel({ isOpen, onClose, filters, onUpdateFilters }: FilterPanelProps) {
  const neighborhoods = [
    'Boston', 'Cambridge', 'Somerville', 'Brookline', 'Allston',
    'Back Bay', 'Fenway', 'Jamaica Plain', 'Mission Hill'
  ];
  
  const roomTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'private', label: 'Private Room' },
    { value: 'shared', label: 'Shared Room' },
    { value: 'studio', label: 'Studio' },
  ];
  
  const moveInOptions = [
    { value: 'any', label: 'Any Time' },
    { value: 'now', label: 'Immediate' },
    { value: '1month', label: 'Within 1 Month' },
    { value: '3months', label: 'Within 3 Months' },
  ];
  
  const toggleNeighborhood = (n: string) => {
    const current = filters.neighborhoods;
    if (current.includes(n)) {
      onUpdateFilters({ ...filters, neighborhoods: current.filter(x => x !== n) });
    } else {
      onUpdateFilters({ ...filters, neighborhoods: [...current, n] });
    }
  };
  
  const clearFilters = () => {
    onUpdateFilters({
      priceRange: [0, 3000],
      roomType: 'all',
      neighborhoods: [],
      moveIn: 'any',
    });
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-discord-surface rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="sticky top-0 bg-discord-surface pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-discord-elevated rounded-full" />
            </div>
            
            {/* Header */}
            <div className="px-6 pb-4 flex items-center justify-between border-b border-discord-elevated">
              <h2 className="text-xl font-bold text-discord-text">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-discord-primary text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-discord-text font-semibold mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-discord-primary font-bold">${filters.priceRange[0]}</span>
                  <span className="text-discord-text-muted">—</span>
                  <span className="text-discord-primary font-bold">${filters.priceRange[1]}</span>
                </div>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={2500}
                    step={50}
                    value={filters.priceRange[0]}
                    onChange={(e) => onUpdateFilters({
                      ...filters,
                      priceRange: [Math.min(Number(e.target.value), filters.priceRange[1] - 100), filters.priceRange[1]]
                    })}
                    className="w-full h-2 bg-discord-elevated rounded-full appearance-none cursor-pointer accent-discord-primary"
                  />
                  <input
                    type="range"
                    min={500}
                    max={3000}
                    step={50}
                    value={filters.priceRange[1]}
                    onChange={(e) => onUpdateFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], Math.max(Number(e.target.value), filters.priceRange[0] + 100)]
                    })}
                    className="w-full h-2 bg-discord-elevated rounded-full appearance-none cursor-pointer accent-discord-primary"
                  />
                </div>
              </div>
              
              {/* Room Type */}
              <div>
                <h3 className="text-discord-text font-semibold mb-3">Room Type</h3>
                <div className="flex flex-wrap gap-2">
                  {roomTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => onUpdateFilters({ ...filters, roomType: type.value })}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filters.roomType === type.value
                          ? 'bg-discord-primary text-white'
                          : 'bg-discord-bg text-discord-text-secondary border border-discord-elevated'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Neighborhoods */}
              <div>
                <h3 className="text-discord-text font-semibold mb-3">Neighborhoods</h3>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((n) => (
                    <button
                      key={n}
                      onClick={() => toggleNeighborhood(n)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        filters.neighborhoods.includes(n)
                          ? 'bg-discord-primary text-white'
                          : 'bg-discord-bg text-discord-text-secondary border border-discord-elevated'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Move-in Date */}
              <div>
                <h3 className="text-discord-text font-semibold mb-3">Move-in Date</h3>
                <div className="flex flex-wrap gap-2">
                  {moveInOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onUpdateFilters({ ...filters, moveIn: opt.value })}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filters.moveIn === opt.value
                          ? 'bg-discord-primary text-white'
                          : 'bg-discord-bg text-discord-text-secondary border border-discord-elevated'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Apply Button */}
            <div className="sticky bottom-0 p-6 bg-gradient-to-t from-discord-surface via-discord-surface to-transparent">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-4 rounded-xl font-bold text-lg bg-discord-primary text-white shadow-lg shadow-discord-primary/30"
              >
                Show Results
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
