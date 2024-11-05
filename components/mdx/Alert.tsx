import { ReactNode } from 'react';

interface AlertProps {
  type: 'info' | 'warning' | 'error' | 'success';
  children: ReactNode;
}

export function Alert({ type, children }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-500 text-blue-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    success: 'bg-green-50 border-green-500 text-green-700',
  };

  return (
    <div className={`p-4 border-l-4 rounded-r ${styles[type]} my-4`}>
      {children}
    </div>
  );
}