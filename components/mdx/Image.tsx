import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function Image({ src, alt, width = 800, height = 600 }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-lg"
    />
  );
}