import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface OnboardingData {
  budgetMin: number;
  budgetMax: number;
  locations: string[];
  lifestyle: {
    sleepSchedule: string;
    foodPreference: string;
    smoking: string;
    alcohol: string;
  };
  roomPrefs: {
    roomType: string;
    bathroom: string;
    leaseDuration: string;
  };
}

// Step components
function BudgetStep({ data, onUpdate }: { data: OnboardingData; onUpdate: (data: Partial<OnboardingData>) => void }) {
  return (
    <div className="text-center w-full">
      <span className="text-6xl mb-4 block">💰</span>
      <h2 className="text-2xl sm:text-3xl font-bold text-discord-text mb-2">What's your budget?</h2>
      <p className="text-discord-text-muted mb-8">Set your monthly rent range</p>
      
      <div className="w-full max-w-md mx-auto px-4">
        {/* Budget display */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="text-center">
            <p className="text-discord-text-muted text-xs uppercase tracking-wide mb-1">Min</p>
            <p className="text-3xl font-bold text-discord-primary">${data.budgetMin}</p>
          </div>
          <div className="w-8 h-0.5 bg-discord-elevated rounded-full" />
          <div className="text-center">
            <p className="text-discord-text-muted text-xs uppercase tracking-wide mb-1">Max</p>
            <p className="text-3xl font-bold text-discord-primary">${data.budgetMax}</p>
          </div>
        </div>
        
        {/* Min slider */}
        <div className="mb-8 w-full">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-discord-text-secondary font-medium">Minimum Rent</label>
            <span className="text-sm text-discord-primary font-bold">${data.budgetMin}</span>
          </div>
          <input
            type="range"
            min={300}
            max={2500}
            step={50}
            value={data.budgetMin}
            onChange={(e) => onUpdate({ budgetMin: Math.min(Number(e.target.value), data.budgetMax - 100) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-discord-text-muted mt-2">
            <span>$300</span>
            <span>$2,500</span>
          </div>
        </div>
        
        {/* Max slider */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-discord-text-secondary font-medium">Maximum Rent</label>
            <span className="text-sm text-discord-primary font-bold">${data.budgetMax}</span>
          </div>
          <input
            type="range"
            min={500}
            max={3000}
            step={50}
            value={data.budgetMax}
            onChange={(e) => onUpdate({ budgetMax: Math.max(Number(e.target.value), data.budgetMin + 100) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-discord-text-muted mt-2">
            <span>$500</span>
            <span>$3,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationStep({ data, onUpdate }: { data: OnboardingData; onUpdate: (data: Partial<OnboardingData>) => void }) {
  const locations = [
    'Boston', 'Cambridge', 'Somerville', 'Brookline', 'Allston',
    'Back Bay', 'South End', 'Fenway', 'Jamaica Plain', 'Mission Hill',
    'North End', 'Charlestown', 'South Boston', 'Dorchester'
  ];
  
  const toggleLocation = (loc: string) => {
    const current = data.locations;
    if (current.includes(loc)) {
      onUpdate({ locations: current.filter(l => l !== loc) });
    } else {
      onUpdate({ locations: [...current, loc] });
    }
  };
  
  return (
    <div className="text-center">
      <span className="text-6xl mb-6 block">📍</span>
      <h2 className="text-3xl font-bold text-discord-text mb-3">Where do you want to live?</h2>
      <p className="text-discord-text-muted mb-8">Select your preferred neighborhoods</p>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
        {locations.map((loc) => (
          <motion.button
            key={loc}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLocation(loc)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              data.locations.includes(loc)
                ? 'bg-discord-primary text-white'
                : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated hover:border-discord-primary'
            }`}
          >
            {loc}
          </motion.button>
        ))}
      </div>
      
      {data.locations.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-discord-text-muted text-sm mt-6"
        >
          {data.locations.length} location{data.locations.length > 1 ? 's' : ''} selected
        </motion.p>
      )}
    </div>
  );
}

function LifestyleStep({ data, onUpdate }: { data: OnboardingData; onUpdate: (data: Partial<OnboardingData>) => void }) {
  const updateLifestyle = (key: keyof OnboardingData['lifestyle'], value: string) => {
    onUpdate({ lifestyle: { ...data.lifestyle, [key]: value } });
  };
  
  const options = {
    sleepSchedule: [
      { value: 'early', label: '🌅 Early Bird', desc: 'Up by 7am' },
      { value: 'normal', label: '☀️ Regular', desc: '8am - 11pm' },
      { value: 'night', label: '🌙 Night Owl', desc: 'Late nights' },
    ],
    foodPreference: [
      { value: 'everything', label: '🍔 Everything', desc: 'No restrictions' },
      { value: 'vegetarian', label: '🥗 Vegetarian', desc: 'No meat' },
      { value: 'vegan', label: '🌱 Vegan', desc: 'Plant-based' },
    ],
    smoking: [
      { value: 'no', label: '🚭 No Smoking', desc: 'Smoke-free' },
      { value: 'outside', label: '🚬 Outside Only', desc: 'Not indoors' },
      { value: 'yes', label: '💨 Smoking OK', desc: 'No preference' },
    ],
    alcohol: [
      { value: 'never', label: '🚫 Never', desc: 'No alcohol' },
      { value: 'occasionally', label: '🍷 Sometimes', desc: 'Occasionally' },
      { value: 'regularly', label: '🍻 Regularly', desc: 'Social drinker' },
    ],
  };
  
  return (
    <div className="text-center">
      <span className="text-6xl mb-6 block">🌙</span>
      <h2 className="text-3xl font-bold text-discord-text mb-3">What's your lifestyle?</h2>
      <p className="text-discord-text-muted mb-8">Help us find compatible roommates</p>
      
      <div className="max-w-md mx-auto space-y-6">
        {/* Sleep Schedule */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Sleep Schedule</p>
          <div className="flex gap-2 justify-center">
            {options.sleepSchedule.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLifestyle('sleepSchedule', opt.value)}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  data.lifestyle.sleepSchedule === opt.value
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated'
                }`}
              >
                <span className="block text-lg">{opt.label.split(' ')[0]}</span>
                <span className="text-xs opacity-80">{opt.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Food */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Food Preference</p>
          <div className="flex gap-2 justify-center">
            {options.foodPreference.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLifestyle('foodPreference', opt.value)}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  data.lifestyle.foodPreference === opt.value
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated'
                }`}
              >
                <span className="block text-lg">{opt.label.split(' ')[0]}</span>
                <span className="text-xs opacity-80">{opt.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Smoking */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Smoking</p>
          <div className="flex gap-2 justify-center">
            {options.smoking.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLifestyle('smoking', opt.value)}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  data.lifestyle.smoking === opt.value
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated'
                }`}
              >
                <span className="block text-lg">{opt.label.split(' ')[0]}</span>
                <span className="text-xs opacity-80">{opt.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Alcohol */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Alcohol</p>
          <div className="flex gap-2 justify-center">
            {options.alcohol.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLifestyle('alcohol', opt.value)}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  data.lifestyle.alcohol === opt.value
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated'
                }`}
              >
                <span className="block text-lg">{opt.label.split(' ')[0]}</span>
                <span className="text-xs opacity-80">{opt.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomPrefsStep({ data, onUpdate }: { data: OnboardingData; onUpdate: (data: Partial<OnboardingData>) => void }) {
  const updateRoomPrefs = (key: keyof OnboardingData['roomPrefs'], value: string) => {
    onUpdate({ roomPrefs: { ...data.roomPrefs, [key]: value } });
  };
  
  return (
    <div className="text-center">
      <span className="text-6xl mb-6 block">🏠</span>
      <h2 className="text-3xl font-bold text-discord-text mb-3">Room preferences</h2>
      <p className="text-discord-text-muted mb-8">What are you looking for?</p>
      
      <div className="max-w-md mx-auto space-y-6">
        {/* Room Type */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Room Type</p>
          <div className="flex gap-3 justify-center">
            {[
              { value: 'private', label: '🚪 Private', desc: 'Own room' },
              { value: 'shared', label: '👥 Shared', desc: 'With roommate' },
              { value: 'studio', label: '🏢 Studio', desc: 'Entire unit' },
            ].map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateRoomPrefs('roomType', opt.value)}
                className={`flex-1 p-4 rounded-xl transition-all ${
                  data.roomPrefs.roomType === opt.value
                    ? 'bg-discord-primary text-white shadow-lg shadow-discord-primary/30'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated hover:border-discord-primary'
                }`}
              >
                <span className="block text-2xl mb-1">{opt.label.split(' ')[0]}</span>
                <span className="block font-medium">{opt.label.split(' ')[1]}</span>
                <span className="text-xs opacity-80">{opt.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Bathroom */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Bathroom</p>
          <div className="flex gap-3 justify-center">
            {[
              { value: 'private', label: '🛁 Private' },
              { value: 'shared', label: '🚿 Shared' },
              { value: 'any', label: '✨ Any' },
            ].map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateRoomPrefs('bathroom', opt.value)}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  data.roomPrefs.bathroom === opt.value
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated'
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Lease Duration */}
        <div>
          <p className="text-sm text-discord-text-secondary mb-3">Lease Duration</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {[
              { value: '3', label: '3 months' },
              { value: '6', label: '6 months' },
              { value: '12', label: '12 months' },
              { value: 'flexible', label: 'Flexible' },
            ].map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateRoomPrefs('leaseDuration', opt.value)}
                className={`px-4 py-2 rounded-full transition-all ${
                  data.roomPrefs.leaseDuration === opt.value
                    ? 'bg-discord-primary text-white'
                    : 'bg-discord-surface text-discord-text-secondary border border-discord-elevated'
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompletedStep() {
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Generate confetti particles
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#5865F2', '#EB459E', '#23A559', '#FEE75C', '#ED4245'][Math.floor(Math.random() * 5)],
  }));
  
  return (
    <div className="text-center relative">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -20, x: `${c.x}vw`, opacity: 1 }}
              animate={{ y: '100vh', opacity: 0 }}
              transition={{ duration: 3, delay: c.delay, ease: 'easeIn' }}
              onAnimationComplete={() => c.id === 49 && setShowConfetti(false)}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>
      )}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 200 }}
        className="text-8xl mb-6"
      >
        🎉
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-discord-text mb-3"
      >
        You're all set!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-discord-text-muted text-lg mb-8"
      >
        Your preferences are saved. Let's find your perfect roommate!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {['🌙 Night Owl', '🥗 Vegetarian', '🚭 No Smoking', '🚪 Private Room'].map((tag) => (
          <span key={tag} className="px-3 py-1.5 bg-discord-surface rounded-full text-discord-text-secondary text-sm">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Main component
export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    budgetMin: 800,
    budgetMax: 1500,
    locations: [],
    lifestyle: {
      sleepSchedule: 'normal',
      foodPreference: 'everything',
      smoking: 'no',
      alcohol: 'occasionally',
    },
    roomPrefs: {
      roomType: 'private',
      bathroom: 'any',
      leaseDuration: '12',
    },
  });

  const steps = [
    { component: BudgetStep, label: 'Budget' },
    { component: LocationStep, label: 'Location' },
    { component: LifestyleStep, label: 'Lifestyle' },
    { component: RoomPrefsStep, label: 'Room' },
    { component: CompletedStep, label: 'Done' },
  ];

  const totalSteps = steps.length;
  const isLastStep = step === totalSteps - 1;
  const isCompleted = step === totalSteps - 1;

  const handleUpdate = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // Save to localStorage or send to API
      console.log('Onboarding data:', data);
      navigate('/discover');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
    navigate('/discover');
  };

  const CurrentStepComponent = steps[step].component;

  return (
    <div className="min-h-screen bg-discord-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(30, 31, 34, 0.9)', borderBottom: '1px solid #313338' }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <span className="text-xl font-bold gradient-text">HomieHub</span>
        </div>
        
        {!isCompleted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
            style={{ 
              backgroundColor: '#2B2D31', 
              border: '1px solid #313338',
              padding: '8px 16px',
              borderRadius: '8px'
            }}
            className="text-discord-text-secondary hover:text-discord-text text-sm font-medium transition-all"
          >
            Skip for now
          </motion.button>
        )}
      </header>

      {/* Progress dots */}
      {!isCompleted && (
        <div className="flex justify-center gap-2 py-6">
          {steps.slice(0, -1).map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step
                  ? 'w-8 bg-discord-primary'
                  : index < step
                    ? 'w-2 bg-discord-primary'
                    : 'w-2 bg-discord-elevated'
              }`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md px-4"
          >
            <CurrentStepComponent data={data} onUpdate={handleUpdate} />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation buttons - inside main for proper centering */}
        <div className="w-full max-w-md mt-10 flex justify-center gap-3 px-4">
          {step > 0 && !isCompleted && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              style={{ backgroundColor: '#2B2D31', border: '1px solid #313338' }}
              className="flex-1 py-4 rounded-xl font-bold text-lg text-discord-text hover:bg-discord-elevated transition-colors"
            >
              Back
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            style={{ backgroundColor: '#5865F2' }}
            className="flex-1 py-4 rounded-xl font-bold text-lg text-white hover:opacity-90 transition-all shadow-lg"
          >
            {isCompleted ? 'Start Swiping 🚀' : 'Next'}
          </motion.button>
        </div>
      </main>
    </div>
  );
}
