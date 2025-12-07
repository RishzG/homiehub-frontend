import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  online: boolean;
  roomPreview?: string;
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    lastMessage: 'Hey! I saw your listing. Is the room still available?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    online: true,
    roomPreview: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    lastMessage: 'That sounds perfect! When can I come see it?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    lastMessage: 'Thanks for the info!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unread: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    lastMessage: 'I\'m interested in the Back Bay apartment',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 1,
    online: false,
    roomPreview: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop',
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    { id: '1', text: 'Hi! I saw your room listing in Back Bay', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: '2', text: 'Hey! Yes, it\'s still available. Are you interested?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
    { id: '3', text: 'Definitely! The location looks great and I love the amenities', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 20) },
    { id: '4', text: 'When would you be available to see it?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { id: '5', text: 'Hey! I saw your listing. Is the room still available?', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  ],
  '2': [
    { id: '1', text: 'Hi there! Love the room photos', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
    { id: '2', text: 'Thank you! Happy to answer any questions', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 100) },
    { id: '3', text: 'That sounds perfect! When can I come see it?', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  ],
};

export function Chat() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversation && mockMessages[selectedConversation]) {
      setMessages(mockMessages[selectedConversation]);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 1000 * 60) return 'now';
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))}m`;
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))}h`;
    return date.toLocaleDateString();
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);

  // Chat detail view
  if (selectedConversation && selectedConv) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1E1F22' }}>
        {/* Chat Header */}
        <header 
          className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3"
          style={{ 
            background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.1) 0%, rgba(30, 31, 34, 1) 100%)',
            borderBottom: '1px solid rgba(235, 69, 158, 0.15)' 
          }}
        >
          <button 
            onClick={() => setSelectedConversation(null)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ backgroundColor: 'rgba(235, 69, 158, 0.15)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F2F3F5" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <div className="relative">
            <img 
              src={selectedConv.avatar} 
              alt={selectedConv.name}
              className="w-11 h-11 rounded-full"
              style={{ border: '2px solid #EB459E' }}
            />
            {selectedConv.online && (
              <div 
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2" 
                style={{ backgroundColor: '#57F287', borderColor: '#1E1F22' }} 
              />
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="font-bold" style={{ color: '#F2F3F5' }}>{selectedConv.name}</h1>
            <p className="text-xs font-medium" style={{ color: selectedConv.online ? '#57F287' : '#949BA4' }}>
              {selectedConv.online ? '● Online' : '○ Offline'}
            </p>
          </div>
          
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B5BAC1" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </header>

        {/* Room Preview (if any) */}
        {selectedConv.roomPreview && (
          <div 
            className="mx-4 mt-3 p-3 rounded-xl flex items-center gap-3"
            style={{ backgroundColor: '#2B2D31' }}
          >
            <img 
              src={selectedConv.roomPreview} 
              alt="Room" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: '#F2F3F5' }}>Discussing room listing</p>
              <p className="text-xs" style={{ color: '#949BA4' }}>Back Bay, Boston</p>
            </div>
            <button 
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: '#5865F2', color: '#fff' }}
            >
              View
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[75%] px-4 py-2.5 rounded-2xl"
                style={{
                  backgroundColor: message.sender === 'me' ? '#5865F2' : '#2B2D31',
                  color: '#F2F3F5',
                  borderBottomRightRadius: message.sender === 'me' ? '4px' : '16px',
                  borderBottomLeftRadius: message.sender === 'them' ? '4px' : '16px',
                }}
              >
                <p className="text-sm">{message.text}</p>
                <p 
                  className="text-[10px] mt-1 text-right"
                  style={{ color: message.sender === 'me' ? 'rgba(255,255,255,0.6)' : '#949BA4' }}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div 
          className="sticky bottom-0 px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: '#1E1F22', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <button className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span className="text-lg">📷</span>
          </button>
          
          <div 
            className="flex-1 flex items-center px-4 py-2 rounded-full"
            style={{ backgroundColor: '#2B2D31' }}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#F2F3F5' }}
            />
            <button className="ml-2">
              <span className="text-lg">😊</span>
            </button>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, #EB459E 0%, #FE7BBF 100%)',
              boxShadow: '0 4px 15px rgba(235, 69, 158, 0.4)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
          </motion.button>
        </div>
      </div>
    );
  }

  // Conversation list view
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#1E1F22' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-30 px-4 py-4 flex items-center justify-between"
        style={{ 
          background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.12) 0%, rgba(30, 31, 34, 1) 100%)',
          borderBottom: '1px solid rgba(235, 69, 158, 0.15)' 
        }}
      >
        <div>
          <h1 className="text-xl font-bold gradient-text-pink">Messages</h1>
          <p className="text-xs" style={{ color: '#949BA4' }}>{mockConversations.length} conversations</p>
        </div>
        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105" 
          style={{ backgroundColor: 'rgba(235, 69, 158, 0.15)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EB459E" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </header>

      {/* Conversations */}
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {mockConversations.map((conversation) => (
          <motion.button
            key={conversation.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedConversation(conversation.id)}
            className="w-full px-4 py-3 flex items-center gap-3 text-left transition-colors"
            style={{ backgroundColor: conversation.unread > 0 ? 'rgba(88, 101, 242, 0.05)' : 'transparent' }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img 
                src={conversation.avatar} 
                alt={conversation.name}
                className="w-12 h-12 rounded-full"
              />
              {conversation.online && (
                <div 
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
                  style={{ backgroundColor: '#57F287', borderColor: '#1E1F22' }}
                />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h3 
                  className="font-semibold truncate"
                  style={{ color: '#F2F3F5' }}
                >
                  {conversation.name}
                </h3>
                <span 
                  className="text-xs flex-shrink-0 ml-2"
                  style={{ color: conversation.unread > 0 ? '#5865F2' : '#949BA4' }}
                >
                  {formatTime(conversation.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p 
                  className="text-sm truncate flex-1"
                  style={{ color: conversation.unread > 0 ? '#F2F3F5' : '#949BA4' }}
                >
                  {conversation.lastMessage}
                </p>
                {conversation.unread > 0 && (
                  <span 
                    className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#5865F2', color: '#fff' }}
                  >
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
            
            {/* Room preview thumbnail */}
            {conversation.roomPreview && (
              <img 
                src={conversation.roomPreview} 
                alt="Room"
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Empty state (hidden since we have mock data) */}
      {mockConversations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">💬</span>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#F2F3F5' }}>No messages yet</h3>
          <p className="text-sm text-center px-8" style={{ color: '#949BA4' }}>
            Start swiping to match with rooms and chat with roommates!
          </p>
          <button
            onClick={() => navigate('/discover')}
            className="mt-6 px-6 py-2.5 rounded-xl font-medium"
            style={{ backgroundColor: '#5865F2', color: '#fff' }}
          >
            Start Discovering
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
