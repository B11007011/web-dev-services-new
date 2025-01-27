'use client'

import { useState, useRef, useEffect } from 'react'

type Mark = {
  value: number
  label: string
}

type SliderProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  marks?: Mark[]
  showTooltip?: boolean
  disabled?: boolean
  color?: string
}

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks,
  showTooltip = true,
  disabled = false,
  color = 'blue'
}: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
    yellow: 'bg-yellow-500'
  }

  const percentage = ((value - min) / (max - min)) * 100

  const handleMove = (clientX: number) => {
    if (disabled || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const width = rect.width
    const left = rect.left
    const newPercentage = Math.max(0, Math.min(100, ((clientX - left) / width) * 100))
    const newValue = Math.round((newPercentage * (max - min)) / 100 / step) * step + min
    onChange(newValue)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="py-4">
      <div
        ref={sliderRef}
        className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={(e) => !disabled && handleMove(e.clientX)}
      >
        {/* Track fill */}
        <div
          className={`absolute h-full rounded-full ${colors[color as keyof typeof colors]} ${
            disabled ? 'opacity-50' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 rounded-full bg-white border-2 ${
            colors[color as keyof typeof colors].replace('bg-', 'border-')
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'} ${
            isDragging ? 'ring-4 ring-opacity-20' : ''
          }`}
          style={{ left: `${percentage}%` }}
          onMouseDown={() => !disabled && setIsDragging(true)}
        >
          {/* Tooltip */}
          {showTooltip && (isDragging || value > min) && (
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white rounded ${
                colors[color as keyof typeof colors]
              }`}
            >
              {value}
            </div>
          )}
        </div>

        {/* Marks */}
        {marks && (
          <div className="absolute w-full top-6">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100
              return (
                <div
                  key={mark.value}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${markPercentage}%` }}
                >
                  <div className="w-px h-2 bg-gray-300" />
                  <div className="mt-1 text-xs text-gray-500">{mark.label}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Slider