import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Discover } from './pages/Discover';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Browse } from './pages/Browse';
import { RoomDetail } from './pages/RoomDetail';
import { PostRoom } from './pages/PostRoom';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/post" element={<PostRoom />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
