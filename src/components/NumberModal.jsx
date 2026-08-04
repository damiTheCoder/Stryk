import { useState, useEffect } from "react";

export default function NumberModal({ value, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm rounded-2xl bg-gray-900 p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-medium text-gray-400 mb-2">Full Value</p>
        <p className="text-3xl font-bold text-white break-all">{value}</p>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Close
        </button>
      </div>
    </div>
  );
}
