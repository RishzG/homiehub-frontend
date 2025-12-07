import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: '🏠', label: 'Discover', path: '/discover' },
  { icon: '🔍', label: 'Browse', path: '/browse' },
  { icon: '➕', label: 'Post', path: '/post' },
  { icon: '💬', label: 'Chat', path: '/chat' },
  { icon: '👤', label: 'Profile', path: '/profile' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-20"
      style={{ 
        backgroundColor: '#1E1F22',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="flex justify-center items-center gap-8 py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/discover' && location.pathname === '/');
          
          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span 
                className="text-[10px] font-medium"
                style={{ color: isActive ? '#5865F2' : '#949BA4' }}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
