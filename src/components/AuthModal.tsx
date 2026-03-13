"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/lib/auth-store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mounted, setMounted] = useState(false);

  const { login, signup, loading, error, clearError } = useAuthStore();

  // Portal requires the DOM to be available
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    let success = false;
    if (mode === "login") {
      success = await login(email, password);
    } else {
      success = await signup(email, password, firstName, lastName);
    }

    if (success) {
      onClose();
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    clearError();
  };

  const modal = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-primary/40 transition-colors hover:text-primary/80"
          aria-label="Close"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>

        <h2 className="mb-6 font-serif text-3xl text-primary">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-primary/20 bg-transparent px-4 py-3 font-sans text-sm font-light text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
          />

          {error && (
            <div className="font-mono text-xs text-accent">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="font-sans text-sm font-medium text-primary/60 transition-colors hover:text-primary"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
