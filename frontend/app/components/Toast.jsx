"use client";

import { useEffect } from "react";

const styles = {
  success: "bg-green-600",
  error: "bg-red-600",
};

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${styles[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm`}
      >
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:opacity-80">
          &times;
        </button>
      </div>
    </div>
  );
}
