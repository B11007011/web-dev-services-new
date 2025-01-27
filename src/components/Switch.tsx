'use client'

type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
  color?: string
}

const Switch = ({
  checked,
  onChange,
  size = 'md',
  disabled = false,
  label,
  color = 'blue'
}: SwitchProps) => {
  const sizes = {
    sm: {
      switch: 'w-8 h-4',
      dot: 'w-3 h-3',
      translate: 'translate-x-4',
      text: 'text-sm'
    },
    md: {
      switch: 'w-11 h-6',
      dot: 'w-5 h-5',
      translate: 'translate-x-5',
      text: 'text-base'
    },
    lg: {
      switch: 'w-14 h-7',
      dot: 'w-6 h-6',
      translate: 'translate-x-7',
      text: 'text-lg'
    }
  }

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
    yellow: 'bg-yellow-500'
  }

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`${sizes[size].switch} ${
            checked ? colors[color as keyof typeof colors] : 'bg-gray-200'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } rounded-full transition-colors duration-200 ease-in-out`}
        />
        <div
          className={`${sizes[size].dot} absolute left-0.5 top-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out ${
            checked ? sizes[size].translate : 'translate-x-0'
          } shadow-sm`}
        />
      </div>
      {label && (
        <span
          className={`ml-3 ${sizes[size].text} ${
            disabled ? 'text-gray-400' : 'text-gray-900'
          }`}
        >
          {label}
        </span>
      )}
    </label>
  )
}

export default Switch 