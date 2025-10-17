'use client';
import React, { forwardRef, useImperativeHandle } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

type PropType = {
    options?: EmblaOptionsType;
    height?: string;
    spacing?: string;
    size?: string;
    hideButtons?: boolean;
    hideMask?: boolean;
    refContainerClass?: string;
};

const Carousel = forwardRef<
    {
        onPrev: () => void;
        onNext: () => void;
    },
    React.HTMLAttributes<HTMLDivElement> & PropType
>((props, ref) => {
    const { options, children, className, refContainerClass, hideButtons = false, hideMask = false, height = '25rem', spacing = '1rem', size = '20%' } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    useImperativeHandle(ref, () => ({
        onPrev: onPrevButtonClick,
        onNext: onNextButtonClick
    }));

    return (
        <section
            className={cn('max-w-[88rem] m-auto relative', className)}
            style={
                {
                    '--slide-height': height,
                    '--slide-spacing': spacing,
                    '--slide-size': size
                } as React.CSSProperties
            }
        >
            {!hideMask ? (
                <>
                    <div className="absolute h-full w-[25%] bg-[linear-gradient(to_right,white_12%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgb(var(--surface-950))_12%,transparent_100%)] left-0 z-10 pointer-events-none"></div>
                    <div className="absolute h-full w-[25%] bg-[linear-gradient(to_left,white_12%,transparent_100%)] dark:bg-[linear-gradient(to_left,rgb(var(--surface-950))_12%,transparent_100%)] right-0 z-10 pointer-events-none"></div>
                </>
            ) : null}
            <div className={cn('overflow-hidden block', refContainerClass)} ref={emblaRef}>
                <div className="embla__container py-4 flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)*-1)] [backface-visibility:hidden]">{children}</div>
            </div>
            {!hideButtons ? (
                <div className="mt-8 mx-auto w-fit flex items-center gap-6">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            ) : null}
        </section>
    );
});
Carousel.displayName = 'Carousel';
export default Carousel;

export const CarouselItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={cn('min-w-0 pl-[var(--slide-spacing)] flex-[0_0_var(--slide-size)] ', className)}>
            <div className="flex items-center justify-center h-[var(--slide-height)] select-none">{children}</div>
        </div>
    );
};
