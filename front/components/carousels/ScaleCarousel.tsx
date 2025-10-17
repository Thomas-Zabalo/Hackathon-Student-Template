'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
type PropType = {
    options?: EmblaOptionsType;
    children?: React.ReactNode;
    height?: string;
    spacing?: string;
    size?: string;
    scale?: number;
};

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

const ScaleCarousel: React.FC<PropType> = (props) => {
    const { options, children, height = '25rem', spacing = '1rem', size = '40%', scale = 0.36 } = props;
    const TWEEN_FACTOR_BASE = scale ?? 0.36;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__slide__item') as HTMLElement;
        });
    }, []);

    const setTweenFactor = useCallback(
        (emblaApi: EmblaCarouselType) => {
            tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
        },
        [TWEEN_FACTOR_BASE]
    );

    const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === 'scroll';

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);

                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
                const scale = numberWithinRange(tweenValue, 0, 1).toString();
                const tweenNode = tweenNodes.current[slideIndex];
                tweenNode.style.transform = `scale(${scale})`;
            });
        });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi);

        emblaApi.on('reInit', setTweenNodes).on('reInit', setTweenFactor).on('reInit', tweenScale).on('scroll', tweenScale).on('slideFocus', tweenScale);
    }, [emblaApi, setTweenFactor, setTweenNodes, tweenScale]);

    return (
        <div
            className="max-w-[102rem] m-auto relative"
            style={
                {
                    '--slide-height': height,
                    '--slide-spacing': spacing,
                    '--slide-size': size
                } as React.CSSProperties
            }
        >
            <div className="absolute h-full w-[25%] bg-[linear-gradient(to_right,white_12%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(var(--surface-950))_12%,transparent_100%)] left-0 z-10 pointer-events-none lg:block hidden"></div>
            <div className="absolute h-full w-[25%] bg-[linear-gradient(to_left,white_12%,transparent_100%)] dark:bg-[linear-gradient(to_left,rgba(var(--surface-950))_12%,transparent_100%)] right-0 z-10 pointer-events-none lg:block hidden"></div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex ml-[calc(var(--slide-spacing)*-1)] py-8 touch-pan-y touch-pinch-zoom">{children}</div>
            </div>

            <div className="mt-8 mx-auto w-fit flex items-center gap-6">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
    );
};

export default ScaleCarousel;

export const ScaleCarouselItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={cn('embla__slide min-w-0 pl-[var(--slide-spacing)] flex-[0_0_var(--slide-size)] [transform:translate3d(0,0,0)]', className)}>
            <div className="embla__slide__item flex items-center justify-center h-[var(--slide-height)] select-none">{children}</div>
        </div>
    );
};
