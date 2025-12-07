# HomieHub Frontend - Context for AI Enhancement

## Project Overview
Gen-Z roommate matching app (Tinder meets Zillow) built with:
- React 18 + Vite + TypeScript
- Tailwind CSS v4 (@tailwindcss/vite plugin)
- Framer Motion for animations
- React Router DOM for navigation

## Design System

### Colors
```css
--primary: #5865F2 (Discord purple)
--pink: #EB459E (accent)
--green: #57F287 (success)
--background: #1E1F22 (dark)
--surface: #2B2D31 (cards)
--text-primary: #F2F3F5
--text-secondary: #B5BAC1
```

### Theme per Page
- **Discover**: Pink gradient (#EB459E)
- **Browse**: Purple gradient (#5865F2)
- **RoomDetail**: Purple with pink accents
- **PostRoom**: Purple (#5865F2)
- **Chat**: Pink (#EB459E)
- **Profile**: Green (#57F287)

## File Structure
```
frontend/
├── src/
│   ├── App.tsx              # Routes for all 10 pages
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles, gradients, utilities
│   ├── components/
│   │   ├── BottomNav.tsx    # Shared bottom nav with emojis (🏠🔍➕💬👤)
│   │   ├── SwipeDeck.tsx    # Tinder-style swipe cards
│   │   ├── SwipeCard.tsx    # Individual swipe card
│   │   ├── MatchOverlay.tsx # Match celebration modal
│   │   ├── RoomCard.tsx     # Grid room card
│   │   └── FilterPanel.tsx  # Browse filters
│   ├── pages/
│   │   ├── Landing.tsx      # Hero with CTA
│   │   ├── SignUp.tsx       # Registration form
│   │   ├── Login.tsx        # Login form
│   │   ├── Onboarding.tsx   # Multi-step wizard with sliders
│   │   ├── Discover.tsx     # Swipe cards view
│   │   ├── Browse.tsx       # Grid view with filters
│   │   ├── RoomDetail.tsx   # Full listing page
│   │   ├── PostRoom.tsx     # 5-step room posting wizard
│   │   ├── Chat.tsx         # Messaging interface
│   │   └── Profile.tsx      # User profile with tabs
│   └── data/
│       └── mockRooms.ts     # Sample room data
```

## Page Details

### 1. Landing (`/`)
- Hero section with gradient background
- "Find Your Perfect Roommate" headline
- Get Started CTA → navigates to /signup

### 2. SignUp (`/signup`)
- Form: name, email, password, confirm password
- Social login buttons (Google, Apple)
- Link to login

### 3. Login (`/login`)
- Form: email, password
- Remember me checkbox
- Forgot password link

### 4. Onboarding (`/onboarding`)
- 4-step wizard:
  1. Budget (slider $500-$5000)
  2. Location (neighborhood selection)
  3. Lifestyle (cleanliness, noise, schedule sliders)
  4. Preferences (roommate count, pets, smoking)
- Progress bar at top
- Skip button available

### 5. Discover (`/discover`)
- Tinder-style swipe interface
- Cards show: photo, price, location, match %, tags
- Swipe right = like, left = pass
- Match overlay on mutual like
- Uses Framer Motion for gestures

### 6. Browse (`/browse`)
- Grid of RoomCards (2 columns on mobile)
- Filter panel: price range, room type, neighborhoods, move-in date
- Sort dropdown: Best Match, Price, Newest
- Search bar at top

### 7. RoomDetail (`/room/:id`)
- Image gallery with dots indicator
- Price, location, availability
- Room features grid
- Roommate profile section
- Contact modal with message form
- Apply button fixed at bottom

### 8. PostRoom (`/post`)
- 5-step wizard:
  1. Photos (drag & drop upload)
  2. Location (address, neighborhood)
  3. Details (price, room type, amenities)
  4. Preferences (ideal roommate traits)
  5. Preview & publish
- Progress steps with checkmarks

### 9. Chat (`/chat`)
- Left: Conversation list with avatars, last message, timestamp
- Right: Message thread view
- Input with send button
- Online status indicators

### 10. Profile (`/profile`)
- Header with avatar, name, verification badge
- Stats row: listings, matches, response rate
- 3 tabs: About, Preferences, Listings
- Edit profile button
- Settings gear icon

## Current Styling Approach
- Using inline `style={{}}` props for colors (Tailwind v4 custom colors not auto-complete friendly)
- Gradient backgrounds on headers
- Gradient text for titles
- Glow/shadow effects on buttons
- Emoji icons in navigation and headers

## What Needs Improvement
1. **Animations**: Add micro-interactions, hover states, page transitions
2. **Mobile**: Ensure responsive on all screen sizes
3. **Loading States**: Add skeleton loaders
4. **Swipe Physics**: Better gesture feedback
5. **Notifications**: Toast messages for actions
6. **Accessibility**: Focus states, ARIA labels
7. **Polish**: Glassmorphism, premium feel

## Sample Component Code

### BottomNav.tsx
```tsx
// Shared navigation with emoji icons
// Uses useLocation() to highlight active page
// Icons: 🏠 Home, 🔍 Browse, ➕ Post, 💬 Chat, 👤 Profile
// Centered with gap-8 justify-center
```

### SwipeDeck.tsx
```tsx
// Uses Framer Motion's useMotionValue, useTransform
// Drag gestures for swipe left/right
// Rotation based on drag distance
// Opacity indicators for like/pass
```

## Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "framer-motion": "^10.x",
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x"
}
```
