import React from 'react';
import { cn } from '@/lib/utils';

type CheckboxProps = {
    label?: string;
    checked?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & CheckboxProps>(({ className, label, checked, ...props }, ref) => {
    return (
        <label className="flex items-center space-x-2 relative ">
            <div className="relative h-6 w-6 ">
                <input
                    ref={ref}
                    type="checkbox"
                    checked={checked}
                    className={cn(
                        'peer appearance-none w-full h-full rounded-lg bg-white/16 border border-white/12 text-white/90 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]',
                        className
                    )}
                    {...props}
                />
                <i className="pi pi-check text-white text-xs leading-none absolute opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100"></i>
            </div>
            {label && <span className="text-white/90">{label}</span>}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
