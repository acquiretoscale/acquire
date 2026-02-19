"use client";

import { useEffect, useState } from "react";

export function ConnectionBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      className="fixed top-0 inset-x-0 z-[100] flex items-center justify-center bg-red-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg"
    >
      Website connection failed. Please check your internet connection and try again.
    </div>
  );
}
