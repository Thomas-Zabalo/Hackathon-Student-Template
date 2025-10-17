import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
};

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        if (onButtonClick) onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
        if (onButtonClick) onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);
    }, [emblaApi, onSelect]);

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = ({ ...props }) => {
    return (
        <button className="w-32 h-12 rounded-full flex items-center justify-center shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12" type="button" {...props}>
            <i className="pi pi-arrow-left text-xl"></i>
        </button>
    );
};

export const NextButton: React.FC<PropType> = ({ ...props }) => {
    return (
        <button className="w-32 h-12 rounded-full flex items-center justify-center shadow-stroke dark:shadow-black-card border-0 dark:border border-white/12" type="button" {...props}>
            <i className="pi pi-arrow-right text-xl"></i>
        </button>
    );
};
