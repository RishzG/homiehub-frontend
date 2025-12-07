export interface Room {
  id: string;
  photo: string;
  rent: number;
  location: string;
  address: string;
  availableFrom: string;
  roommateCount: number;
  roomType: 'Shared' | 'Private' | 'Studio';
  attachedBathroom: boolean;
  amenities: string[];
  vibeTags: string[];
  description: string;
  flatmateGender: string;
  leaseDuration: number;
  isMatch?: boolean;
}

export const mockRooms: Room[] = [
  {
    id: '1',
    photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    rent: 1200,
    location: 'Cambridge',
    address: '123 Mass Ave, Cambridge',
    availableFrom: '2025-01-15',
    roommateCount: 2,
    roomType: 'Private',
    attachedBathroom: true,
    amenities: ['WiFi', 'Laundry', 'Gym'],
    vibeTags: ['🌙 Night Owl', '🎮 Gamer', '🎵 Music Lover'],
    description: 'Cozy private room near Harvard Square with great natural light.',
    flatmateGender: 'Any',
    leaseDuration: 12,
    isMatch: true
  },
  {
    id: '2',
    photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    rent: 950,
    location: 'Somerville',
    address: '456 Davis Square, Somerville',
    availableFrom: '2025-02-01',
    roommateCount: 3,
    roomType: 'Shared',
    attachedBathroom: false,
    amenities: ['WiFi', 'Parking', 'Pet-friendly'],
    vibeTags: ['🌅 Early Bird', '🍃 Vegan', '📚 Bookworm'],
    description: 'Sunny shared room in a vibrant Davis Square apartment.',
    flatmateGender: 'Female',
    leaseDuration: 6
  },
  {
    id: '3',
    photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    rent: 1800,
    location: 'Back Bay',
    address: '789 Newbury St, Boston',
    availableFrom: '2025-01-20',
    roommateCount: 1,
    roomType: 'Studio',
    attachedBathroom: true,
    amenities: ['WiFi', 'Gym', 'Doorman', 'AC'],
    vibeTags: ['💼 Professional', '🧘 Wellness', '🍷 Wine Lover'],
    description: 'Luxury studio in the heart of Back Bay with city views.',
    flatmateGender: 'Any',
    leaseDuration: 12,
    isMatch: true
  },
  {
    id: '4',
    photo: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
    rent: 850,
    location: 'Allston',
    address: '321 Brighton Ave, Allston',
    availableFrom: '2025-01-10',
    roommateCount: 4,
    roomType: 'Shared',
    attachedBathroom: false,
    amenities: ['WiFi', 'Laundry in building'],
    vibeTags: ['🎸 Musician', '🌙 Night Owl', '🎉 Social'],
    description: 'Affordable room in a fun Allston apartment, great for students.',
    flatmateGender: 'Mixed',
    leaseDuration: 9
  },
  {
    id: '5',
    photo: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
    rent: 1400,
    location: 'South End',
    address: '555 Tremont St, Boston',
    availableFrom: '2025-02-15',
    roommateCount: 1,
    roomType: 'Private',
    attachedBathroom: true,
    amenities: ['WiFi', 'Dishwasher', 'Hardwood floors'],
    vibeTags: ['🍳 Foodie', '🎨 Creative', '🐕 Dog Parent'],
    description: 'Charming private room in a brownstone with exposed brick.',
    flatmateGender: 'Any',
    leaseDuration: 12
  },
  {
    id: '6',
    photo: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    rent: 1100,
    location: 'Jamaica Plain',
    address: '777 Centre St, Jamaica Plain',
    availableFrom: '2025-01-25',
    roommateCount: 2,
    roomType: 'Private',
    attachedBathroom: false,
    amenities: ['WiFi', 'Patio', 'Garden'],
    vibeTags: ['🌿 Plant Parent', '🚴 Cyclist', '☕ Coffee Addict'],
    description: 'Peaceful room with garden access in JP, near the pond.',
    flatmateGender: 'Female',
    leaseDuration: 12,
    isMatch: true
  },
  {
    id: '7',
    photo: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
    rent: 1050,
    location: 'Fenway',
    address: '888 Boylston St, Boston',
    availableFrom: '2025-02-01',
    roommateCount: 3,
    roomType: 'Private',
    attachedBathroom: false,
    amenities: ['WiFi', 'Gym', 'Laundry'],
    vibeTags: ['⚾ Sports Fan', '🎮 Gamer', '🍕 Pizza Lover'],
    description: 'Great location near Fenway Park, perfect for Sox fans!',
    flatmateGender: 'Male',
    leaseDuration: 10
  },
  {
    id: '8',
    photo: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    rent: 1350,
    location: 'Brookline',
    address: '444 Beacon St, Brookline',
    availableFrom: '2025-01-18',
    roommateCount: 1,
    roomType: 'Private',
    attachedBathroom: true,
    amenities: ['WiFi', 'Parking', 'AC', 'Balcony'],
    vibeTags: ['📖 Student', '🧘 Quiet', '🌅 Early Bird'],
    description: 'Quiet, spacious room in Brookline with great T access.',
    flatmateGender: 'Any',
    leaseDuration: 12
  },
  {
    id: '9',
    photo: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    rent: 2000,
    location: 'Seaport',
    address: '999 Seaport Blvd, Boston',
    availableFrom: '2025-02-01',
    roommateCount: 1,
    roomType: 'Studio',
    attachedBathroom: true,
    amenities: ['WiFi', 'Gym', 'Pool', 'Concierge'],
    vibeTags: ['💼 Professional', '🏋️ Fitness', '🍸 Social'],
    description: 'Modern luxury studio in Seaport with harbor views.',
    flatmateGender: 'Any',
    leaseDuration: 12
  },
  {
    id: '10',
    photo: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=800&h=600&fit=crop',
    rent: 900,
    location: 'Mission Hill',
    address: '222 Tremont St, Mission Hill',
    availableFrom: '2025-01-12',
    roommateCount: 4,
    roomType: 'Shared',
    attachedBathroom: false,
    amenities: ['WiFi', 'Laundry in building'],
    vibeTags: ['📚 Student', '🎵 Music Lover', '🌙 Night Owl'],
    description: 'Budget-friendly room near NEU, perfect for students.',
    flatmateGender: 'Mixed',
    leaseDuration: 6
  }
];
