'use client';
import useVisible from '@/lib/hooks/use-visible';
import { cn } from '@/lib/utils';
import React from 'react';

type AnimatedContainerProps = {
    visibleClass?: string;
    notVisibleClass?: string;
    delay?: number;
};

const AnimatedContainer: React.FC<React.HTMLAttributes<HTMLDivElement> & AnimatedContainerProps> = ({ className, children, visibleClass, notVisibleClass, delay = 0, ...props }) => {
    const [elementRef, isVisible] = useVisible({ delay });
    return (
        <div ref={elementRef} className={cn('', isVisible ? cn('animate-in fade-in slide-in-from-top-24 duration-500', visibleClass) : cn('opacity-0', notVisibleClass), className)} {...props}>
            {children}
        </div>
    );
};

export default AnimatedContainer;
