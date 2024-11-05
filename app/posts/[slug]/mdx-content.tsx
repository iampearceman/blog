'use client'

import { MDXRemote } from 'next-mdx-remote'
import React from 'react'
import { MDXComponentProvider } from '../../components/MDXProvider'

const components = {
  InfoBox: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 my-4">
      {children}
    </div>
  ),
}

export function MDXContent({ source }: { source: any }) {
  return (
    <MDXComponentProvider>
      <MDXRemote
        {...source}
      components={components}
      />
    </MDXComponentProvider>
  )
}
