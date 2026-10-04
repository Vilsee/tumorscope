import React from 'react';

export function GradeBar({ grade }: { grade: 1 | 2 | 3 | 4 }) {
  const colors = {
    1: 'bg-green-500',
    2: 'bg-amber-400',
    3: 'bg-orange-500',
    4: 'bg-red-500'
  };
  
  return (
    <div className="flex gap-1 items-center">
      <span className="text-xs text-[#8A96AC] mr-1">Grade</span>
      {[1, 2, 3, 4].map((g) => (
        <div 
          key={g} 
          className={`h-2 w-6 rounded-sm ${g <= grade ? colors[grade] : 'bg-[#1A2236]'}`}
        />
      ))}
    </div>
  );
}
