import { ReactNode } from 'react';

interface ImageGridProps {
  children: ReactNode;
}

export function ImageGrid({ children }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {children}
    </div>
  );
}