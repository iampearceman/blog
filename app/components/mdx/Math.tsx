import 'katex/dist/katex.min.css';
import katex from 'katex';
import React from 'react';

interface MathProps {
  children: React.ReactNode;
}

export function Math({ children }: MathProps) {
  const mathText = React.Children.toArray(children).join('');
  
  const html = katex.renderToString(mathText, {
    throwOnError: false,
    displayMode: true,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}