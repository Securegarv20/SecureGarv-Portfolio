
import React from 'react';

interface FilterButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  colorClass?: string;
}

const FilterButton = ({ 
  label, 
  count, 
  isActive, 
  onClick, 
  colorClass = "bg-primary/20" 
}: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2
      ${isActive 
        ? `${colorClass} shadow-lg scale-105 text-white` 
        : 'glass hover:bg-white/20'}`
    }
  >
    {label}
    <span className="inline-flex items-center justify-center bg-black/30 text-xs w-5 h-5 rounded-full">
      {count}
    </span>
  </button>
);

export default FilterButton;
