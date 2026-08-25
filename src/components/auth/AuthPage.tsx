import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Mail, 
  Lock, 
  User as UserIcon, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Send,
  Sparkles,
  Inbox,
  Clock,
  ExternalLink,
  ChevronLeft,
  Zap,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNews } from '../../context/NewsContext';

export const AuthPage: React.FC = () => {
  const { 
    authViewMode, 
    setAuthViewMode, 
    registerUser, 
    loginUser, 
    verifyWithCode,
    resendVerification, 
    checkVerification, 
    verifyCurrentEmailTestMode,
    loginAsDemo,
    logout, 
    sendPasswordReset,
    unverifiedEmail,
    activeVerificationCode,
    user
  } = useAuth();

  const { showToast } = useNews();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Verification state & cooldown
  const [resendCooldown, setResendCooldown] = useState(0);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [verifyingPin, setVerifyingPin] = useState(false);
  const [instantVerifying, setInstantVerifying] = useState(false);

  // Auto-polling email verification when in 'verify-email' view
  useEffect(() => {
    let interval: any = null;
    if (authViewMode === 'verify-email') {
      interval = setInterval(async () => {
        const verified = await checkVerification();
        if (verified) {
          showToast('Email verified successfully! Welcome to NewsHub.', 'success');
        }
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [authViewMode]);

  // Handle countdown for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const clearForm = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    const res = await registerUser(trimmedEmail, password, name);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Failed to create account.');
    } else {
      showToast('Account registered! Verification link generated.', 'success');
      setResendCooldown(60);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const res = await loginUser(trimmedEmail, password);
    setLoading(false);

    if (!res.success) {
      if (res.unverified) {
        showToast('Email unverified. You can verify via link or instant test mode below.', 'info');
      } else {
        setError(res.error || 'Invalid email or password.');
      }
    } else {
      showToast('Welcome back to NewsHub!', 'success');
    }
  };

  const handleQuickDemoLogin = async () => {
    setDemoLoading(true);
    setError(null);
    const res = await loginAsDemo();
    setDemoLoading(false);
    if (res.success) {
      showToast('Signed in with Demo Subscriber Account!', 'success');
    } else {
      setError(res.error || 'Could not launch demo session.');
    }
  };

  const handleVerifyPinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!verificationPin.trim()) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setVerifyingPin(true);
    const res = await verifyWithCode(verificationPin.trim());
    setVerifyingPin(false);

    if (res.success) {
      showToast('Email verified successfully! Welcome to NewsHub.', 'success');
    } else {
      setError(res.error || 'Invalid verification code. Please check and try again.');
    }
  };

  const handleManualCheckVerification = async () => {
    setCheckingVerification(true);
    setError(null);
    const verified = await checkVerification();
    setCheckingVerification(false);

    if (verified) {
      showToast('Email verified! Opening NewsHub...', 'success');
    } else {
      setError('Verification link not activated yet. Enter your 6-digit PIN above or click Verify Instantly below.');
    }
  };

  const handleInstantBypassVerification = async () => {
    setInstantVerifying(true);
    setError(null);
    const success = await verifyCurrentEmailTestMode();
    setInstantVerifying(false);
    if (success) {
      showToast('Test verification successful! Entering NewsHub...', 'success');
    } else {
      setError('Could not verify account. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setLoading(true);
    const res = await resendVerification();
    setLoading(false);

    if (res.success) {
      setSuccessMessage('A fresh verification link has been sent to your email.');
      showToast('Verification email resent!', 'success');
      setResendCooldown(60);
    } else {
      setError(res.error || 'Failed to resend verification email.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address to receive the password reset link.');
      return;
    }

    setLoading(true);
    setError(null);
    const res = await sendPasswordReset(email.trim());
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Password reset link sent! Please check your email inbox.');
      showToast('Password reset email sent', 'success');
    } else {
      setError(res.error || 'Could not send reset email.');
    }
  };

  const autofillSample = (type: 'subscriber' | 'journalist') => {
    if (type === 'subscriber') {
      setEmail('reader@example.com');
      setPassword('Subscriber2026!');
      setConfirmPassword('Subscriber2026!');
      setName('Alex Rivera');
    } else {
      setEmail('editor@newshub.live');
      setPassword('Editorial2026!');
      setConfirmPassword('Editorial2026!');
      setName('Elena Rostova');
    }
  };

  const activeEmailTarget = unverifiedEmail || user?.email || email || 'your email';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4 sm:px-6 py-10 relative overflow-hidden selection:bg-rose-600 selection:text-white">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-rose-600/20 via-rose-600/5 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-t from-red-600/10 to-transparent blur-3xl rounded-full" />
        
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Auth Container Card */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center space-x-3 mb-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 flex items-center justify-center text-white shadow-xl shadow-rose-600/30">
                <Newspaper className="w-6 h-6" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
            </div>
            <span className="text-3xl font-black tracking-tight text-white font-serif">
              News<span className="text-rose-500 font-sans">Hub</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-md mx-auto">
            Live Global Dispatches • Voice Narration • Real-Time Wire
          </p>
        </div>

        {/* Tab Toggle (Sign In / Register) */}
        {authViewMode !== 'verify-email' && authViewMode !== 'forgot-password' && (
          <div className="mb-4 bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl grid grid-cols-2 gap-1 shadow-lg">
            <button
              onClick={() => {
                clearForm();
                setAuthViewMode('login');
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                authViewMode === 'login'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => {
                clearForm();
                setAuthViewMode('register');
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                authViewMode === 'register'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>
        )}

        {/* Content Card */}
        <motion.div 
          layout
          className="bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
        >
          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 bg-rose-950/70 border border-rose-800 rounded-2xl flex items-start space-x-2.5 text-xs text-rose-300 font-medium leading-relaxed"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </motion.div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 bg-emerald-950/70 border border-emerald-800 rounded-2xl flex items-start space-x-2.5 text-xs text-emerald-300 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">{successMessage}</div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* VIEW: REGISTER */}
            {authViewMode === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Create Account</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enter your details to create your personalized reader account.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-3.5">
                  {/* Display Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Password (min 6 chars) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-11 text-sm text-white placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account & Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Quick Autofill Helper */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Fast test fill:</span>
                  <button
                    type="button"
                    onClick={() => autofillSample('subscriber')}
                    className="text-rose-400 hover:underline cursor-pointer"
                  >
                    Sample Reader Data
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW: VERIFY EMAIL */}
            {authViewMode === 'verify-email' && (
              <motion.div
                key="verify-email"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                {/* Glowing Beacon Icon */}
                <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-rose-500/20 rounded-2xl blur-xl animate-pulse" />
                  <div className="relative w-14 h-14 bg-gradient-to-br from-rose-600 to-red-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-rose-600/30 border border-rose-400/30">
                    <Mail className="w-7 h-7" />
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Email Verification</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                  Check Your Inbox
                </h2>

                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed mb-3">
                  Verification email sent to:
                </p>

                <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl mb-4 text-xs font-mono font-bold text-rose-400 break-all select-all shadow-inner">
                  {activeEmailTarget}
                </div>

                {/* Direct PIN Verification Form */}
                <form onSubmit={handleVerifyPinSubmit} className="mb-4 text-left">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Enter 6-Digit Verification PIN <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={verificationPin}
                        onChange={(e) => setVerificationPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder={activeVerificationCode || 'e.g. 849201'}
                        maxLength={6}
                        required
                        className="w-full bg-zinc-950/80 border border-zinc-700 focus:border-rose-500 rounded-xl py-2.5 pl-10 pr-3 text-base font-mono font-bold tracking-widest text-white placeholder-zinc-600 outline-none"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={verifyingPin || !verificationPin.trim()}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/30 flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {verifyingPin ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      <span>Verify Code</span>
                    </motion.button>
                  </div>

                  {/* Active Verification Code Helper Chip */}
                  {activeVerificationCode && (
                    <div className="mt-2 p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400 font-medium">Your PIN Code:</span>
                      <button
                        type="button"
                        onClick={() => setVerificationPin(activeVerificationCode)}
                        className="font-mono font-black text-rose-400 hover:text-rose-300 underline cursor-pointer"
                        title="Click to fill PIN"
                      >
                        {activeVerificationCode} (Click to Fill)
                      </button>
                    </div>
                  )}
                </form>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5">
                  {/* Primary Verification Check */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleManualCheckVerification}
                    disabled={checkingVerification}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {checkingVerification ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Checking Status...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>I Clicked The Verification Link</span>
                      </>
                    )}
                  </motion.button>

                  {/* Instant Verification Bypass for Dev / Preview */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstantBypassVerification}
                    disabled={instantVerifying}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600/20 to-amber-600/20 hover:from-rose-600/30 hover:to-amber-600/30 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {instantVerifying ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-400" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>⚡ 1-Click Direct Email Verify (Instant)</span>
                  </motion.button>

                  {/* Resend Link Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResendVerification}
                    disabled={loading || resendCooldown > 0}
                    className="w-full py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs rounded-xl border border-zinc-700 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-rose-400" />
                    <span>
                      {resendCooldown > 0 
                        ? `Resend Verification PIN (${resendCooldown}s)` 
                        : 'Resend Verification PIN'}
                    </span>
                  </motion.button>
                </div>

                {/* Back to Login / Logout */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <button
                    onClick={() => {
                      logout();
                      clearForm();
                      setAuthViewMode('login');
                    }}
                    className="hover:text-zinc-200 flex items-center space-x-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      clearForm();
                      setAuthViewMode('register');
                    }}
                    className="text-rose-400 font-bold hover:underline cursor-pointer"
                  >
                    Use Different Email
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW: LOGIN */}
            {authViewMode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Welcome Back</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Sign in to your NewsHub account to access your live feed and audio.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3.5">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          clearForm();
                          setAuthViewMode('forgot-password');
                        }}
                        className="text-xs font-bold text-rose-400 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-11 text-sm text-white placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* 1-Click Quick Demo Access Button */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleQuickDemoLogin}
                    disabled={demoLoading}
                    className="w-full py-2.5 px-4 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    {demoLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-400" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>🚀 1-Click Instant Demo Login (Explore App)</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* VIEW: FORGOT PASSWORD */}
            {authViewMode === 'forgot-password' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Reset Password</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enter your account email to receive a password reset link.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-rose-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-red-600 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Password Reset Email</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-5 pt-4 border-t border-zinc-800/80 text-center">
                  <button
                    onClick={() => {
                      clearForm();
                      setAuthViewMode('login');
                    }}
                    className="text-xs font-bold text-zinc-400 hover:text-white flex items-center justify-center space-x-1 mx-auto cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Security & Verification Guarantee Footer */}
        <div className="mt-6 text-center text-xs text-zinc-500 flex items-center justify-center space-x-4">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Firebase Auth Security</span>
          </span>
          <span>•</span>
          <span>Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

