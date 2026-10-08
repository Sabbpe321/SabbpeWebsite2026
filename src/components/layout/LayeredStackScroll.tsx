'use client';

import React from 'react';

export default function LayeredStackScroll({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full z-10 bg-[#02040a]">
            {children}
        </div>
    );
}
