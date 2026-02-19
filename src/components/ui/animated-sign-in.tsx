"use client";

import React, { useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";

type AnimatedSignInProps = {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  isSubmitting?: boolean;
  error?: string;
};

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export function AnimatedSignIn({
  onSubmit,
  isSubmitting = false,
  error,
}: AnimatedSignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setIsEmailValid(validateEmail(e.target.value));
    } else {
      setIsEmailValid(true);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsFormSubmitted(true);

      if (email && password && validateEmail(email) && onSubmit) {
        await onSubmit(email, password, rememberMe);
      }
    },
    [email, password, rememberMe, onSubmit]
  );

  const formInvalid = isFormSubmitted && (!email || !password || !isEmailValid);

  return (
    <div className="investor-portal-login relative min-h-[calc(100vh-140px)] overflow-hidden bg-[var(--surface-dark)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(243,227,172,0.25)_0%,rgba(243,227,172,0.08)_40%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative flex min-h-[calc(100vh-140px)] flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="investor-portal-login-card w-full max-w-[320px] shrink-0">
          <div className="investor-portal-login-card-inner">
            <div className="investor-portal-login-header">
              <h1>Welcome</h1>
              <p>Please sign in to continue</p>
            </div>

            <form
              className={`investor-portal-login-form ${!formInvalid && !error ? "" : ""}`}
              onSubmit={handleSubmit}
            >
              <div
                className={`investor-portal-form-field ${isEmailFocused || email ? "active" : ""} ${!isEmailValid && email ? "invalid" : ""}`}
              >
                <input
                  type="email"
                  id="investor-email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  placeholder=" "
                  required
                  autoComplete="username"
                />
                <label htmlFor="investor-email">Email Address</label>
                {!isEmailValid && email && (
                  <span className="investor-portal-error-message">
                    Please enter a valid email
                  </span>
                )}
              </div>

              <div
                className={`investor-portal-form-field ${isPasswordFocused || password ? "active" : ""}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="investor-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder=" "
                  required
                  autoComplete="current-password"
                />
                <label htmlFor="investor-password">Password</label>
                <button
                  type="button"
                  className="investor-portal-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {error && (
                <p className="investor-portal-form-error" role="alert">
                  {error}
                </p>
              )}

              <div className="investor-portal-form-options">
                <label className="investor-portal-remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="investor-portal-checkmark" />
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="investor-portal-golden-button"
                disabled={isSubmitting || formInvalid}
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
        <div className="investor-portal-login-footer">
          <p className="font-semibold text-[var(--on-dark)]">
            Area exclusive to our investor network.
          </p>
          <p className="mt-2">
            Having trouble logging in?{" "}
            <a href="mailto:contact@acquiretoscale.com" className="text-[var(--accent)] hover:underline">
              contact@acquiretoscale.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
