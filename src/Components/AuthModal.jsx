import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";

function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          throw new Error("Please enter your display name.");
        }
        await signup(email, password, displayName);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      console.error("Auth error:", err);
      let msg = err.message || "Failed to authenticate";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "An account with this email already exists.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      }
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSubmitting(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error("Google Auth error:", err);
      setError(err.message || "Google sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-md bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp
              ? "Sign up to sync your favorites & watch history across devices"
              : "Sign in to access your Nerio Stream account"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/70 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/70 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/70 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative px-3 bg-[#121829] text-xs text-slate-400">Or continue with</span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          disabled={submitting}
          type="button"
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700/70 rounded-xl text-sm font-medium text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Google
        </button>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
