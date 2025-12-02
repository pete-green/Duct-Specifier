'use client'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export default function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  className = '',
}: QuantityInputProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Quantity
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          className="w-16 text-center py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  )
}
