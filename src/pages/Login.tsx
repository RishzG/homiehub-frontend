import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock login logic - accept any .edu email
    if (formData.email.toLowerCase().endsWith('.edu')) {
      // Success - navigate to discover
      navigate('/discover');
    } else {
      // Show error for non-.edu emails
      setLoginError('Invalid credentials. Please use your .edu email.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-discord-bg flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-3xl">🏠</span>
            <span className="text-2xl font-bold gradient-text">HomieHub</span>
          </Link>

          {/* Header */}
          <h1 className="text-3xl font-bold text-discord-text mb-2">Welcome back!</h1>
          <p className="text-discord-text-muted mb-8">
            Log in to continue finding your perfect roommate
          </p>

          {/* Login Error */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-discord-danger/20 border border-discord-danger/50 rounded-xl text-discord-danger text-sm"
            >
              ⚠️ {loginError}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                className={`w-full px-4 py-3 bg-discord-surface border rounded-xl text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-discord-danger focus:ring-discord-danger/50' 
                    : 'border-discord-elevated focus:ring-discord-primary/50 focus:border-discord-primary'
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-discord-danger text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 bg-discord-surface border rounded-xl text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? 'border-discord-danger focus:ring-discord-danger/50' 
                      : 'border-discord-elevated focus:ring-discord-primary/50 focus:border-discord-primary'
                  }`}
                />
                {/* Show/Hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-discord-text-muted hover:text-discord-text transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-discord-danger text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-discord-elevated bg-discord-surface text-discord-primary focus:ring-discord-primary/50"
                />
                <span className="text-sm text-discord-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-sm text-discord-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isLoading
                  ? 'bg-discord-primary/50 cursor-not-allowed'
                  : 'bg-discord-primary hover:bg-discord-primary-hover shadow-lg shadow-discord-primary/30'
              } text-white`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Logging in...
                </span>
              ) : (
                'Log In ✨'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-discord-elevated" />
            <span className="text-discord-text-muted text-sm">or</span>
            <div className="flex-1 h-px bg-discord-elevated" />
          </div>

          {/* Social login */}
          <button className="w-full py-3 px-4 border border-discord-elevated rounded-xl text-discord-text font-medium hover:bg-discord-surface transition-colors flex items-center justify-center gap-3">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="text-center text-discord-text-muted mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-discord-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-discord-primary via-purple-600 to-pink-500 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-white"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-8xl mb-6"
          >
            👋
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Good to see you again!</h2>
          <p className="text-white/80 text-lg max-w-sm mx-auto">
            Your next roommate match could be waiting for you right now
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { value: '500+', label: 'Matches' },
              { value: '4.9★', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
