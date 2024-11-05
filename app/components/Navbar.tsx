'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
              by emil pearce
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}