import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if email is .edu
  const isEduEmail = (email: string) => {
    return email.toLowerCase().endsWith('.edu');
  };

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { level: 0, text: '', color: '' };
    if (password.length < 6) return { level: 1, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { level: 2, text: 'Fair', color: 'bg-yellow-500' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { level: 4, text: 'Strong', color: 'bg-green-500' };
    }
    return { level: 3, text: 'Good', color: 'bg-blue-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isEduEmail(formData.email)) {
      newErrors.email = 'Please use your .edu email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call (mock for now)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    // Navigate to onboarding after successful signup
    navigate('/onboarding');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
          <h1 className="text-3xl font-bold text-discord-text mb-2">Create your account</h1>
          <p className="text-discord-text-muted mb-8">
            Join thousands of students finding their perfect roommate
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 bg-discord-surface border rounded-xl text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 transition-all ${
                  errors.name 
                    ? 'border-discord-danger focus:ring-discord-danger/50' 
                    : 'border-discord-elevated focus:ring-discord-primary/50 focus:border-discord-primary'
                }`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-discord-danger text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                University Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@university.edu"
                  className={`w-full px-4 py-3 pr-12 bg-discord-surface border rounded-xl text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-discord-danger focus:ring-discord-danger/50' 
                      : formData.email && isEduEmail(formData.email)
                        ? 'border-discord-success focus:ring-discord-success/50'
                        : 'border-discord-elevated focus:ring-discord-primary/50 focus:border-discord-primary'
                  }`}
                />
                {/* Validation icon */}
                {formData.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isEduEmail(formData.email) ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-discord-success text-xl"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <span className="text-discord-danger text-xl">✗</span>
                    )}
                  </div>
                )}
              </div>
              {errors.email ? (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-discord-danger text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              ) : (
                <p className="text-discord-text-muted text-xs mt-1">
                  🎓 Only .edu emails are accepted for verification
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-discord-surface border rounded-xl text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-discord-danger focus:ring-discord-danger/50' 
                    : 'border-discord-elevated focus:ring-discord-primary/50 focus:border-discord-primary'
                }`}
              />
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength.level 
                            ? passwordStrength.color 
                            : 'bg-discord-elevated'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    passwordStrength.level <= 1 ? 'text-red-400' :
                    passwordStrength.level === 2 ? 'text-yellow-400' :
                    passwordStrength.level === 3 ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    {passwordStrength.text}
                  </p>
                </div>
              )}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 bg-discord-surface border rounded-xl text-discord-text placeholder-discord-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword 
                      ? 'border-discord-danger focus:ring-discord-danger/50' 
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-discord-success focus:ring-discord-success/50'
                        : 'border-discord-elevated focus:ring-discord-primary/50 focus:border-discord-primary'
                  }`}
                />
                {/* Match icon */}
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {formData.password === formData.confirmPassword ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-discord-success text-xl"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <span className="text-discord-danger text-xl">✗</span>
                    )}
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-discord-danger text-sm mt-1"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-discord-elevated bg-discord-surface text-discord-primary focus:ring-discord-primary/50"
                />
                <span className="text-sm text-discord-text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-discord-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-discord-primary hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeTerms && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-discord-danger text-sm mt-1"
                >
                  {errors.agreeTerms}
                </motion.p>
              )}
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
                  Creating account...
                </span>
              ) : (
                'Create Account ✨'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-discord-elevated" />
            <span className="text-discord-text-muted text-sm">or</span>
            <div className="flex-1 h-px bg-discord-elevated" />
          </div>

          {/* Social login (mock) */}
          <button className="w-full py-3 px-4 border border-discord-elevated rounded-xl text-discord-text font-medium hover:bg-discord-surface transition-colors flex items-center justify-center gap-3">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-discord-text-muted mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-discord-primary hover:underline font-medium">
              Log in
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
            🏠
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Find your perfect roommate</h2>
          <p className="text-white/80 text-lg max-w-sm mx-auto">
            Join thousands of verified students already matched on HomieHub
          </p>
          
          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['🎓 .edu Verified', '🤖 AI Matching', '💬 Secure Chat'].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
