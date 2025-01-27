'use client'

import { useState, useRef, useEffect } from 'react'

type ColorPickerProps = {
  value: string
  onChange: (color: string) => void
  presetColors?: string[]
  showInput?: boolean
  disabled?: boolean
}

const ColorPicker = ({
  value,
  onChange,
  presetColors = [
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#84CC16', // Lime
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
  ],
  showInput = true,
  disabled = false
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleColorChange = (color: string) => {
    onChange(color)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-lg border ${
          disabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg'
        } transition-shadow duration-200`}
        style={{ backgroundColor: value }}
        disabled={disabled}
        aria-label="Choose color"
      >
        <span className="sr-only">Choose color</span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`w-6 h-6 rounded-md hover:scale-110 transform transition-transform duration-100 ${
                  color === value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Choose color: ${color}`}
              />
            ))}
          </div>

          {showInput && (
            <div className="mt-3">
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-8 cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleColorChange(e.target.value)}
                className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="#000000"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ColorPicker 