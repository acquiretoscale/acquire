"use client";

import { useState } from "react";
import { AnimatedSignIn } from "@/components/ui/animated-sign-in";

export default function InvestorPortalPage() {
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    email: string,
    password: string,
    _rememberMe: boolean
  ) => {
    setError("");
    setIsSubmitting(true);

    if (!email.trim() || !password) {
      setError("Please enter both login and password.");
      setIsSubmitting(false);
      return;
    }

    // Demo: accept any non-empty credentials for now
    // Replace with actual auth integration (e.g. Supabase Auth) when ready
    await new Promise((r) => setTimeout(r, 600));
    setIsAuthenticated(true);
    setIsSubmitting(false);
  };

  if (isAuthenticated) {
    return (
      <div className="relative min-h-[calc(100vh-140px)] overflow-hidden bg-[var(--surface-dark)]">
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <section className="relative flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--on-dark)] md:text-4xl">
              Welcome to the Investor Portal
            </h1>
            <div
              className="mx-auto mt-4 h-1 w-12 rounded-full bg-[var(--accent)]"
              aria-hidden
            />
            <p className="mt-6 text-lg text-[var(--on-dark-muted)]">
              You have access. Portal content and features will be available
              here.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <AnimatedSignIn
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
