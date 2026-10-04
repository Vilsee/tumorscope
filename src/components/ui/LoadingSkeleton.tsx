import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-[#1A2236] rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-[#1A2236] rounded"></div>
        <div className="h-4 bg-[#1A2236] rounded w-5/6"></div>
      </div>
    </div>
  );
}
