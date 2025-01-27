'use client'

import { useState } from 'react'

type RatingProps = {
  value: number
  onChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  allowHalf?: boolean
  count?: number
}

const Rating = ({
  value,
  onChange,
  size = 'md',
  readonly = false,
  allowHalf = true,
  count = 5
}: RatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (readonly) return

    const rect = event.currentTarget.getBoundingClientRect()
    const halfPoint = (rect.right - rect.left) / 2
    const isHalf = event.clientX - rect.left < halfPoint

    setHoverRating(index + (isHalf && allowHalf ? 0.5 : 1))
  }

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating)
    }
  }

  const renderStar = (index: number) => {
    const displayRating = hoverRating ?? value
    const filled = index + 1 <= displayRating
    const half = allowHalf && index + 0.5 === displayRating

    return (
      <div
        key={index}
        className={`cursor-${readonly ? 'default' : 'pointer'}`}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onClick={() => handleClick(index + 1)}
      >
        <svg
          className={`${sizeClasses[size]} ${
            filled || half ? 'text-yellow-400' : 'text-gray-300'
          } transition-colors duration-150`}
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {half ? (
            <defs>
              <linearGradient id={`half-${index}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="none" />
              </linearGradient>
            </defs>
          ) : null}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={filled ? 0 : 2}
            fill={half ? `url(#half-${index})` : undefined}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="inline-flex gap-1"
      onMouseLeave={() => !readonly && setHoverRating(null)}
    >
      {[...Array(count)].map((_, index) => renderStar(index))}
    </div>
  )
}

export default Rating 