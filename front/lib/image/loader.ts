import type { ImageLoaderProps } from 'next/image';

export default function myImageLoader({ src, width, quality }: ImageLoaderProps) {
    return `https://primefaces.org/cdn/templates/genesis/${src}?w=${width}&q=${quality || 75}`;
}
