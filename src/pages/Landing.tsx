import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Animated counter component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count}{suffix}</span>;
}

// Floating card for hero section
function FloatingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=500&fit=crop"
          alt="Room preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-bold">Cambridge</span>
            <span className="text-discord-primary font-bold text-sm">$1,200/mo</span>
          </div>
          <p className="text-white/70 text-xs">Near Harvard Square • Private Room</p>
        </div>
        {/* Like stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          className="absolute top-4 left-4 border-2 border-green-500 text-green-500 text-sm font-bold px-2 py-1 rounded"
        >
          LIKE ❤️
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: '🤖', title: 'AI Matching', desc: 'Smart compatibility scoring based on lifestyle' },
    { icon: '🎓', title: 'Verified Students', desc: '.edu email verification, no scams' },
    { icon: '💜', title: 'Vibe Matching', desc: 'Night owl? Vegan? We match your lifestyle' },
    { icon: '💬', title: 'Secure Chat', desc: 'In-app messaging, no sketchy phone numbers' },
  ];

  const testimonials = [
    { quote: "Found my perfect roommate in just 2 days! The vibe matching is spot on.", name: "Sarah K.", school: "NEU '26", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    { quote: "Finally, no more scrolling through sketchy Craigslist posts. This is a game changer.", name: "Mike T.", school: "MIT '25", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
    { quote: "The lifestyle filters saved me from living with someone completely incompatible.", name: "Priya R.", school: "Harvard '27", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya" },
  ];

  const universities = ['NEU', 'MIT', 'Harvard', 'BU', 'BC', 'Tufts', 'Berklee', 'Emerson'];

  return (
    <div className="min-h-screen bg-discord-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold gradient-text">HomieHub</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-discord-text-secondary hover:text-discord-text transition-colors"
            >
              Login
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-discord-primary rounded-full text-white font-medium hover:bg-discord-primary-hover transition-colors"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Section 1: Problem */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Background chaos effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-32 bg-red-500 rounded-lg rotate-3" />
          <div className="absolute top-40 right-20 w-48 h-24 bg-red-500 rounded-lg -rotate-6" />
          <div className="absolute bottom-32 left-1/4 w-56 h-28 bg-red-500 rounded-lg rotate-2" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-discord-text mb-6">
              Finding a roommate<br />
              <span className="text-discord-danger">shouldn't feel like this...</span>
            </h1>
            
            {/* Chaos mockup */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 opacity-60">
              <motion.div 
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-discord-surface p-4 rounded-lg max-w-xs text-left"
              >
                <p className="text-xs text-discord-text-muted mb-1">WhatsApp Housing Group</p>
                <p className="text-sm text-discord-text">🚨 URGENT: Need roommate ASAP $$$$ DM me!!!!</p>
                <p className="text-xs text-red-400 mt-1">+47 unread messages</p>
              </motion.div>
              
              <motion.div 
                animate={{ rotate: [1, -1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="bg-discord-surface p-4 rounded-lg max-w-xs text-left"
              >
                <p className="text-xs text-discord-text-muted mb-1">Craigslist</p>
                <p className="text-sm text-discord-text">Room 4 rent. No questions asked. Cash only. 👀</p>
                <p className="text-xs text-red-400 mt-1">⚠️ Flagged for review</p>
              </motion.div>
              
              <motion.div 
                animate={{ rotate: [-1, 2, -1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="bg-discord-surface p-4 rounded-lg max-w-xs text-left"
              >
                <p className="text-xs text-discord-text-muted mb-1">Facebook Marketplace</p>
                <p className="text-sm text-discord-text">Looking for QUIET roommate. No guests. No cooking. No fun.</p>
                <p className="text-xs text-discord-text-muted mt-1">Posted 3 months ago</p>
              </motion.div>
            </div>
            
            <p className="text-xl text-discord-text-secondary mb-8">
              Endless scrolling. Sketchy posts. Zero compatibility info.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-discord-text-muted"
            >
              <span className="text-4xl">👇</span>
              <p className="mt-2">There's a better way</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Solution Reveal */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        {/* Purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-discord-primary/20 via-transparent to-purple-600/20" />
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-discord-primary font-medium mb-4">Introducing</p>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">HomieHub</span> 🏠
            </h2>
            <p className="text-xl text-discord-text-secondary mb-8">
              AI-powered roommate matching for university students. 
              Swipe, match, and find your perfect living situation.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-discord-primary rounded-full text-white font-bold text-lg hover:bg-discord-primary-hover transition-colors shadow-lg shadow-discord-primary/30"
              >
                Get Started Free ✨
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/discover')}
                className="px-8 py-4 bg-transparent border-2 border-discord-text-muted rounded-full text-discord-text font-bold text-lg hover:border-discord-text transition-colors"
              >
                Try Demo
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <FloatingCard />
          </motion.div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-discord-text mb-4">How It Works</h2>
            <p className="text-discord-text-secondary">Find your roommate in 3 simple steps</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: '📝', title: 'Create Profile', desc: 'Sign up with your .edu email and set your preferences' },
              { step: 2, icon: '👆', title: 'Swipe & Match', desc: 'Browse rooms and swipe right on ones you love' },
              { step: 3, icon: '🎉', title: 'Connect & Move In', desc: 'Chat with matches and find your perfect home' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 text-center hover:border-discord-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-discord-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-bold text-discord-text mb-2">{item.title}</h3>
                  <p className="text-discord-text-muted">{item.desc}</p>
                </div>
                
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-discord-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Features */}
      <section className="py-24 px-6 bg-discord-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-discord-text mb-4">Why HomieHub?</h2>
            <p className="text-discord-text-secondary">Built for students, by students</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center cursor-pointer group"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{feature.icon}</span>
                <h3 className="text-lg font-bold text-discord-text mb-2">{feature.title}</h3>
                <p className="text-sm text-discord-text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Stats & Social Proof */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { value: 500, suffix: '+', label: 'Matches Made' },
              { value: 50, suffix: '+', label: 'Universities' },
              { value: 4.9, suffix: '★', label: 'User Rating' },
              { value: 2, suffix: ' days', label: 'Avg Match Time' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-discord-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* University logos */}
          <div className="text-center">
            <p className="text-discord-text-muted mb-6">Trusted by students at</p>
            <div className="flex flex-wrap justify-center gap-6">
              {universities.map((uni, index) => (
                <motion.div
                  key={uni}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-discord-surface rounded-full text-discord-text-secondary font-medium"
                >
                  🎓 {uni}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="py-24 px-6 bg-discord-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-discord-text mb-4">What Students Say</h2>
            <p className="text-discord-text-secondary">Real stories from real users</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-discord-elevated"
                  />
                  <div>
                    <p className="font-bold text-discord-text">{testimonial.name}</p>
                    <p className="text-sm text-discord-text-muted">{testimonial.school}</p>
                  </div>
                </div>
                <p className="text-discord-text-secondary italic">"{testimonial.quote}"</p>
                <div className="mt-4 text-yellow-500">★★★★★</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-discord-primary via-purple-600 to-pink-500 opacity-90" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to find your perfect roommate?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of students already matched on HomieHub
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="px-10 py-5 bg-white text-discord-primary rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition-colors"
          >
            Sign Up Free 🚀
          </motion.button>
          <p className="mt-4 text-white/60 text-sm">No credit card required • .edu email only</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-discord-surface border-t border-discord-elevated">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏠</span>
            <span className="font-bold gradient-text">HomieHub</span>
          </div>
          <p className="text-discord-text-muted text-sm">© 2025 HomieHub. Made for students, by students.</p>
          <div className="flex items-center gap-6 text-discord-text-muted text-sm">
            <a href="#" className="hover:text-discord-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-discord-text transition-colors">Terms</a>
            <a href="#" className="hover:text-discord-text transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
