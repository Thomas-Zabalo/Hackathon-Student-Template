'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import ReactDOM from 'react-dom';

interface ModalContextProps {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    onToggle?: () => void;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProps extends ModalContextProps {
    children?: React.ReactNode;
}

const ModalContext = React.createContext<ModalContextProps | undefined>(undefined);

const useModal = (): ModalContextProps => {
    const context = React.useContext(ModalContext);

    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    return context;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen((prev) => !prev);

    return <ModalContext.Provider value={{ isOpen, onClose, onOpen, onToggle, setIsOpen }}>{children}</ModalContext.Provider>;
};

Modal.displayName = 'Modal';

interface ModalOverlay {
    children?: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlay> = ({ children }) => {
    const { isOpen, onClose } = useModal();

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div
                onClick={onClose}
                data-state={isOpen ? 'open' : 'close'}
                className="fixed inset-0 z-[9999999] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                style={{ pointerEvents: 'auto' }}
            />
            {children}
        </>,
        document.body
    );
};

ModalOverlay.displayName = 'ModalOverlay';

interface ModalTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
}

const ModalTrigger = React.forwardRef<HTMLElement, ModalTriggerProps>(({ className, asChild, children, ...props }, ref) => {
    const { onOpen } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLElement | HTMLButtonElement, MouseEvent>) => {
        if (onOpen) {
            onOpen();
        }
        if (props.onClick) {
            props.onClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
        }
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement, {
            ref,
            onClick: (e: React.MouseEvent<HTMLElement>) => {
                handleClick(e);
                if (children.props.onClick) {
                    children.props.onClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
                }
            },
            ...props
        });
    }

    return (
        <button ref={ref as React.Ref<HTMLButtonElement>} className={cn('', className)} onClick={handleClick} {...props}>
            {children}
        </button>
    );
});

ModalTrigger.displayName = 'ModalTrigger';

const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
    const { isOpen } = useModal();
    return (
        <div
            ref={ref}
            role="modal"
            data-state={isOpen ? 'open' : 'close'}
            className={cn(
                'fixed left-[50%] top-[50%] z-[9999999] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-surface-200 dark:border-surface-800 bg-surface-0 dark:bg-surface-950 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl sm:max-w-[425px]',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
ModalContent.displayName = 'ModalContent';

const ModalCloseButton = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { onClose } = useModal();
    return (
        <button
            ref={ref}
            onClick={onClose}
            className={cn('w-8 h-8 border border-surface-200 dark:border-surface-800 rounded-lg flex items-center justify-center text-surface-950 dark:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all', className)}
            {...props}
        >
            <i className="pi pi-times text-sm"></i>
        </button>
    );
});
ModalCloseButton.displayName = 'ModalCloseButton';
export { Modal, ModalTrigger, ModalOverlay, ModalContent, ModalCloseButton };
