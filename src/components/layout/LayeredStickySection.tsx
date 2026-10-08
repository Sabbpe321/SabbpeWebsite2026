'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface LayeredStickySectionProps {
    children: ReactNode;
    index: number;
    className?: string;
    isLast?: boolean;
    id?: string;
}

export default function LayeredStickySection({ children, index, className = "", isLast = false, id }: LayeredStickySectionProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(1000);

    useEffect(() => {
        setViewportHeight(window.innerHeight);
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContentHeight(entry.contentRect.height);
            }
        });

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    const NAVBAR_HEIGHT = 110;
    // Calculate sticky top position.
    // If content fits: Stick at 110px.
    // If content is tall: Stick such that the BOTTOM of the content aligns with viewport bottom (roughly),
    // allowing the user to read it all before it sticks.
    // We add a small buffer (20px) to bottom alignment.
    const stickyTop = contentHeight < (viewportHeight - NAVBAR_HEIGHT)
        ? NAVBAR_HEIGHT
        : (viewportHeight - contentHeight - 40);

    // Wrapper Logic:
    // We want the element to stick for roughly 1 screen worth of scroll (so the next card covers it).
    // So distinct physical height = contentHeight + viewportHeight.
    // But we don't want to create a huge gap. We want the next card to start immediately.
    // So we use negative margin to pull the next card up.
    // Effective layout space = contentHeight.
    const wrapperHeight = contentHeight + viewportHeight;
    const marginBottom = isLast ? 0 : -viewportHeight;

    return (
        <div
            id={id}
            style={{
                height: wrapperHeight > 0 ? wrapperHeight : 'auto',
                marginBottom: marginBottom,
                zIndex: 20 + index
            }}
            className="relative w-full pointer-events-none"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[1200px] mx-auto pointer-events-auto transition-all duration-300 ${className}`}
                style={{
                    position: 'sticky',
                    top: stickyTop,
                }}
            >
                <div
                    ref={contentRef}
                    className="w-full relative rounded-[28px] border border-sabbpe-border bg-sabbpe-navy-light backdrop-blur-xl shadow-[0px_30px_90px_rgba(0,0,0,0.55)] overflow-hidden"
                >
                    {/* Top Highlight Edge */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/25 to-transparent z-50 pointer-events-none" />

                    {/* Content */}
                    <div className="p-6 md:p-10">
                        {children}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
