import React from 'react';

const FlowerLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 animate-fade-in">
      {/* Outer rotating/pulsing wrapper */}
      <div className="relative w-24 h-24 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full animate-[spin_8s_linear_infinite] text-rose-400"
          fill="currentColor"
        >
          {/* Center/Pistil */}
          <circle cx="50" cy="50" r="12" className="text-amber-300" />
          
          {/* Petals */}
          <path d="M50 15 C40 30, 60 30, 50 15 Z" />
          <path d="M50 85 C40 70, 60 70, 50 85 Z" />
          <path d="M15 50 C30 40, 30 60, 15 50 Z" />
          <path d="M85 50 C70 40, 70 60, 85 50 Z" />
          
          {/* Diagonal Petals */}
          <path d="M25 25 C40 35, 30 45, 25 25 Z" />
          <path d="M75 75 C60 65, 70 55, 75 75 Z" />
          <path d="M75 25 C60 35, 70 45, 75 25 Z" />
          <path d="M25 75 C40 65, 30 55, 25 75 Z" />
        </svg>
      </div>
      
      {/* Elegant elegant text underneath */}
      <p className="mt-4 text-sm font-medium tracking-widest text-stone-500 uppercase animate-bounce">
        Crafting your bouquet...
      </p>
    </div>
  );
};

export default FlowerLoader;