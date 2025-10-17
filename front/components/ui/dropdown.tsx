'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import useOutsideClick from '@/lib/hooks/use-outside-click';
export type DropdownMenuProps = {
    isOpen?: boolean;
    onOpenChange?: (val: boolean) => void;
    unstyled?: boolean;
};

export type DropdownMenuContextType = {
    dropdownMenuRef: React.RefObject<HTMLDivElement>;
    toggleOpen: () => void;
} & DropdownMenuProps;
const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(null);

export const useDropdownMenu = () => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        throw new Error('useDropdownMenu must be used within a DropdownMenu');
    }
    return context;
};
const DropdownMenu: React.FC<React.HTMLAttributes<HTMLDivElement> & DropdownMenuProps> = ({ className, unstyled = false, isOpen = false, onOpenChange, ...props }) => {
    const [open, setOpen] = React.useState(isOpen);
    const dropdownMenuRef = React.useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: dropdownMenuRef,
        handler: () => setOpen(false)
    });
    React.useEffect(() => {
        if (!onOpenChange) return;
        onOpenChange(open);
    }, [open, onOpenChange]);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };
    return (
        <DropdownMenuContext.Provider
            value={{
                unstyled,
                dropdownMenuRef,
                isOpen: open,
                onOpenChange,
                toggleOpen
            }}
        >
            <div ref={dropdownMenuRef} className={cn('relative z-50 group', className)} data-open={open} {...props} />
        </DropdownMenuContext.Provider>
    );
};

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { toggleOpen, unstyled } = useDropdownMenu();

    return (
        <button
            ref={ref}
            onClick={toggleOpen}
            className={cn(
                unstyled
                    ? ''
                    : 'w-full [&>span]:truncate flex items-center gap-2 px-4 py-3 shadow-stroke dark:shadow-none border-0 dark:border border-white/12 text-surface-950 dark:text-surface-0 rounded-full bg-surface-0 dark:bg-surface-950 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all group-data-[open=true]:bg-surface-100/75 dark:group-data-[open=true]:bg-surface-800/75',
                className
            )}
            {...props}
        />
    );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { isOpen, unstyled } = useDropdownMenu();
    return (
        <div
            ref={ref}
            className={cn(
                'absolute top-[calc(100%+1rem)] z-[999999] min-w-full w-full left-0 flex flex-col transition-all ease-in-out duration-100',
                unstyled ? '' : 'p-1 rounded-lg shadow-stroke dark:shadow-none bg-surface-0 dark:bg-surface-950 border-0 dark:border border-white/12',
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-95',
                className
            )}
            {...props}
        />
    );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, onClick, ...props }, ref) => {
    const { toggleOpen, unstyled } = useDropdownMenu() || {};

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (toggleOpen) {
            toggleOpen();
        }
        if (onClick) {
            onClick(e);
        }
    };

    return <button ref={ref} onClick={handleClick} className={cn(unstyled ? '' : 'py-2 px-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer flex items-center text-left gap-2  [&>span]:truncate', className)} {...props} />;
});

DropdownMenuItem.displayName = 'DropdownMenuItem';
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
