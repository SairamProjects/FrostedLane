'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

const directionVariants = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
};

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const initial = directionVariants[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initial }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
