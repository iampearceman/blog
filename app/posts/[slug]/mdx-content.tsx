'use client'

import { MDXRemote } from 'next-mdx-remote'
import React from 'react'

const components = {
  InfoBox: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 my-4">
      {children}
    </div>
  ),
}

export function MDXContent({ source }: { source: any }) {
  return (
    <MDXRemote 
      {...source}
      components={components}
    />
  )
}