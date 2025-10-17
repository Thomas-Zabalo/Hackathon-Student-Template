import React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, rows = 8, ...props }, ref) => (
    <textarea
        ref={ref}
        rows={rows}
        className={cn(
            'resize-none bg-white/16 rounded-2xl px-4 py-2 outline-none text-white/90 placeholder:text-surface-0/60  backdrop-blur-[48px] border border-white/12 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]',
            className
        )}
        {...props}
    ></textarea>
));

Textarea.displayName = 'Textarea';

export { Textarea };
