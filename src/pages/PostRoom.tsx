import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

type RoomData = {
  photos: string[];
  location: string;
  neighborhood: string;
  rent: number;
  availableFrom: string;
  roomType: 'private' | 'shared';
  bathroomType: 'private' | 'shared';
  amenities: string[];
  description: string;
  roommatePrefs: {
    ageRange: [number, number];
    gender: string;
    lifestyle: string[];
  };
};

const steps = [
  { id: 1, title: 'Photos', icon: '📷' },
  { id: 2, title: 'Location', icon: '📍' },
  { id: 3, title: 'Details', icon: '🏠' },
  { id: 4, title: 'Preferences', icon: '👥' },
  { id: 5, title: 'Preview', icon: '✨' },
];

const amenitiesList = [
  'WiFi', 'Parking', 'Laundry', 'AC', 'Heating', 'Dishwasher',
  'Gym', 'Pool', 'Balcony', 'Pet Friendly', 'Furnished', 'Storage'
];

const lifestyleOptions = [
  'Early Bird', 'Night Owl', 'Clean Freak', 'Social', 'Quiet',
  'Works from Home', 'Student', 'Professional', 'Non-Smoker', 'Pet Owner'
];

export function PostRoom() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [roomData, setRoomData] = useState<RoomData>({
    photos: [],
    location: '',
    neighborhood: '',
    rent: 1200,
    availableFrom: '',
    roomType: 'private',
    bathroomType: 'shared',
    amenities: [],
    description: '',
    roommatePrefs: {
      ageRange: [21, 35],
      gender: 'any',
      lifestyle: [],
    },
  });

  // Mock photo URLs for demo
  const mockPhotos = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  ];

  const addMockPhoto = () => {
    if (roomData.photos.length < 6) {
      const nextPhoto = mockPhotos[roomData.photos.length % mockPhotos.length];
      setRoomData(prev => ({ ...prev, photos: [...prev.photos, nextPhoto] }));
    }
  };

  const removePhoto = (index: number) => {
    setRoomData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setRoomData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleLifestyle = (lifestyle: string) => {
    setRoomData(prev => ({
      ...prev,
      roommatePrefs: {
        ...prev.roommatePrefs,
        lifestyle: prev.roommatePrefs.lifestyle.includes(lifestyle)
          ? prev.roommatePrefs.lifestyle.filter(l => l !== lifestyle)
          : [...prev.roommatePrefs.lifestyle, lifestyle]
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Mock submit
    alert('Room posted successfully! 🎉');
    navigate('/browse');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#F2F3F5' }}>
                Add photos of your room
              </h2>
              <p className="text-sm" style={{ color: '#949BA4' }}>
                Add up to 6 photos. First photo will be the cover.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {roomData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <img src={photo} alt={`Room ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                  >
                    ✕
                  </button>
                  {index === 0 && (
                    <div 
                      className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs"
                      style={{ backgroundColor: '#5865F2', color: '#fff' }}
                    >
                      Cover
                    </div>
                  )}
                </div>
              ))}
              
              {roomData.photos.length < 6 && (
                <button
                  onClick={addMockPhoto}
                  className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors"
                  style={{ borderColor: '#5865F2', color: '#5865F2' }}
                >
                  <span className="text-2xl">+</span>
                  <span className="text-xs">Add Photo</span>
                </button>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#F2F3F5' }}>
                Where's your place?
              </h2>
              <p className="text-sm" style={{ color: '#949BA4' }}>
                Help roommates find you
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#B5BAC1' }}>
                  Full Address
                </label>
                <input
                  type="text"
                  value={roomData.location}
                  onChange={(e) => setRoomData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="123 Main St, Boston, MA"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ backgroundColor: '#2B2D31', color: '#F2F3F5', border: '1px solid #3F4147' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#B5BAC1' }}>
                  Neighborhood
                </label>
                <select
                  value={roomData.neighborhood}
                  onChange={(e) => setRoomData(prev => ({ ...prev, neighborhood: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ backgroundColor: '#2B2D31', color: '#F2F3F5', border: '1px solid #3F4147' }}
                >
                  <option value="">Select neighborhood</option>
                  <option value="Back Bay">Back Bay</option>
                  <option value="Beacon Hill">Beacon Hill</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Somerville">Somerville</option>
                  <option value="Allston">Allston</option>
                  <option value="Brighton">Brighton</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#B5BAC1' }}>
                  Monthly Rent ($)
                </label>
                <input
                  type="number"
                  value={roomData.rent}
                  onChange={(e) => setRoomData(prev => ({ ...prev, rent: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ backgroundColor: '#2B2D31', color: '#F2F3F5', border: '1px solid #3F4147' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#B5BAC1' }}>
                  Available From
                </label>
                <input
                  type="date"
                  value={roomData.availableFrom}
                  onChange={(e) => setRoomData(prev => ({ ...prev, availableFrom: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ backgroundColor: '#2B2D31', color: '#F2F3F5', border: '1px solid #3F4147' }}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#F2F3F5' }}>
                Room Details
              </h2>
              <p className="text-sm" style={{ color: '#949BA4' }}>
                Tell us more about the room
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#B5BAC1' }}>
                  Room Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['private', 'shared'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setRoomData(prev => ({ ...prev, roomType: type }))}
                      className="py-3 px-4 rounded-xl text-center font-medium transition-all"
                      style={{
                        backgroundColor: roomData.roomType === type ? '#5865F2' : '#2B2D31',
                        color: roomData.roomType === type ? '#fff' : '#B5BAC1',
                        border: `1px solid ${roomData.roomType === type ? '#5865F2' : '#3F4147'}`
                      }}
                    >
                      {type === 'private' ? '🚪 Private' : '👥 Shared'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#B5BAC1' }}>
                  Bathroom
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['private', 'shared'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setRoomData(prev => ({ ...prev, bathroomType: type }))}
                      className="py-3 px-4 rounded-xl text-center font-medium transition-all"
                      style={{
                        backgroundColor: roomData.bathroomType === type ? '#5865F2' : '#2B2D31',
                        color: roomData.bathroomType === type ? '#fff' : '#B5BAC1',
                        border: `1px solid ${roomData.bathroomType === type ? '#5865F2' : '#3F4147'}`
                      }}
                    >
                      {type === 'private' ? '🛁 Private' : '🚿 Shared'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#B5BAC1' }}>
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className="px-3 py-1.5 rounded-full text-sm transition-all"
                      style={{
                        backgroundColor: roomData.amenities.includes(amenity) ? 'rgba(88, 101, 242, 0.2)' : '#2B2D31',
                        color: roomData.amenities.includes(amenity) ? '#5865F2' : '#B5BAC1',
                        border: `1px solid ${roomData.amenities.includes(amenity) ? '#5865F2' : '#3F4147'}`
                      }}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#B5BAC1' }}>
                  Description
                </label>
                <textarea
                  value={roomData.description}
                  onChange={(e) => setRoomData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your room and living situation..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                  style={{ backgroundColor: '#2B2D31', color: '#F2F3F5', border: '1px solid #3F4147' }}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#F2F3F5' }}>
                Ideal Roommate
              </h2>
              <p className="text-sm" style={{ color: '#949BA4' }}>
                Help us match you with compatible roommates
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#B5BAC1' }}>
                  Age Range: {roomData.roommatePrefs.ageRange[0]} - {roomData.roommatePrefs.ageRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={roomData.roommatePrefs.ageRange[0]}
                    onChange={(e) => setRoomData(prev => ({
                      ...prev,
                      roommatePrefs: {
                        ...prev.roommatePrefs,
                        ageRange: [parseInt(e.target.value), prev.roommatePrefs.ageRange[1]]
                      }
                    }))}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={roomData.roommatePrefs.ageRange[1]}
                    onChange={(e) => setRoomData(prev => ({
                      ...prev,
                      roommatePrefs: {
                        ...prev.roommatePrefs,
                        ageRange: [prev.roommatePrefs.ageRange[0], parseInt(e.target.value)]
                      }
                    }))}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#B5BAC1' }}>
                  Gender Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['any', 'male', 'female'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setRoomData(prev => ({
                        ...prev,
                        roommatePrefs: { ...prev.roommatePrefs, gender }
                      }))}
                      className="py-2 px-4 rounded-xl text-center font-medium capitalize transition-all"
                      style={{
                        backgroundColor: roomData.roommatePrefs.gender === gender ? '#5865F2' : '#2B2D31',
                        color: roomData.roommatePrefs.gender === gender ? '#fff' : '#B5BAC1',
                        border: `1px solid ${roomData.roommatePrefs.gender === gender ? '#5865F2' : '#3F4147'}`
                      }}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#B5BAC1' }}>
                  Preferred Lifestyle
                </label>
                <div className="flex flex-wrap gap-2">
                  {lifestyleOptions.map((lifestyle) => (
                    <button
                      key={lifestyle}
                      onClick={() => toggleLifestyle(lifestyle)}
                      className="px-3 py-1.5 rounded-full text-sm transition-all"
                      style={{
                        backgroundColor: roomData.roommatePrefs.lifestyle.includes(lifestyle) ? 'rgba(88, 101, 242, 0.2)' : '#2B2D31',
                        color: roomData.roommatePrefs.lifestyle.includes(lifestyle) ? '#5865F2' : '#B5BAC1',
                        border: `1px solid ${roomData.roommatePrefs.lifestyle.includes(lifestyle) ? '#5865F2' : '#3F4147'}`
                      }}
                    >
                      {lifestyle}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#F2F3F5' }}>
                Preview Your Listing
              </h2>
              <p className="text-sm" style={{ color: '#949BA4' }}>
                Review before publishing
              </p>
            </div>

            {/* Preview Card */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#2B2D31' }}>
              {roomData.photos[0] && (
                <div className="aspect-video relative">
                  <img src={roomData.photos[0]} alt="Room" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {roomData.photos.length > 1 && (
                      <span className="px-2 py-1 rounded-md text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff' }}>
                        +{roomData.photos.length - 1} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: '#F2F3F5' }}>
                      {roomData.neighborhood || 'Your Neighborhood'}
                    </h3>
                    <p className="text-sm" style={{ color: '#949BA4' }}>
                      {roomData.location || '123 Main St, Boston'}
                    </p>
                  </div>
                  <p className="text-xl font-bold" style={{ color: '#5865F2' }}>
                    ${roomData.rent}<span className="text-sm font-normal">/mo</span>
                  </p>
                </div>

                <div className="flex gap-4 text-sm" style={{ color: '#B5BAC1' }}>
                  <span>🚪 {roomData.roomType} room</span>
                  <span>🛁 {roomData.bathroomType} bath</span>
                </div>

                {roomData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {roomData.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1E1F22', color: '#949BA4' }}>
                        {amenity}
                      </span>
                    ))}
                    {roomData.amenities.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#1E1F22', color: '#949BA4' }}>
                        +{roomData.amenities.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {roomData.description && (
                  <p className="text-sm line-clamp-2" style={{ color: '#949BA4' }}>
                    {roomData.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#1E1F22' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-30 px-4 py-4 flex items-center justify-between"
        style={{ 
          background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(30, 31, 34, 1) 100%)',
          borderBottom: '1px solid rgba(88, 101, 242, 0.2)' 
        }}
      >
        <button 
          onClick={() => currentStep > 1 ? prevStep() : navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ backgroundColor: 'rgba(88, 101, 242, 0.2)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F2F3F5" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="text-center">
          <h1 className="font-bold text-lg gradient-text">Post Your Room</h1>
          <p className="text-xs" style={{ color: '#949BA4' }}>Step {currentStep} of 5</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress Steps */}
      <div className="px-4 py-5">
        <div 
          className="flex justify-between items-center p-3 rounded-2xl"
          style={{ backgroundColor: 'rgba(88, 101, 242, 0.08)' }}
        >
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all shadow-lg"
                  style={{
                    background: currentStep >= step.id 
                      ? 'linear-gradient(135deg, #5865F2 0%, #EB459E 100%)' 
                      : '#2B2D31',
                    color: '#fff',
                    boxShadow: currentStep >= step.id ? '0 4px 15px rgba(88, 101, 242, 0.4)' : 'none'
                  }}
                >
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <span 
                  className="text-[10px] mt-1.5 font-medium"
                  style={{ color: currentStep >= step.id ? '#5865F2' : '#949BA4' }}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className="w-4 h-1 mx-0.5 rounded-full transition-all"
                  style={{ 
                    background: currentStep > step.id 
                      ? 'linear-gradient(90deg, #5865F2, #EB459E)' 
                      : '#3F4147' 
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div 
        className="fixed bottom-16 left-0 right-0 px-4 py-4"
        style={{ 
          background: 'linear-gradient(to top, #1E1F22 80%, transparent)',
          paddingTop: '2rem'
        }}
      >
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#2B2D31', color: '#B5BAC1', border: '1px solid #3F4147' }}
            >
              Back
            </button>
          )}
          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="flex-1 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(88, 101, 242, 0.4)'
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #23A559 0%, #57F287 100%)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(87, 242, 135, 0.4)'
              }}
            >
              🎉 Publish Listing
            </button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
