'use client'

interface InsulationToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}

export default function InsulationToggle({
  value,
  onChange,
  className = '',
}: InsulationToggleProps) {
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Insulation Lining
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`
            flex-1 px-4 py-2 rounded-md font-medium text-sm
            transition-colors
            ${
              !value
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          Unlined
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`
            flex-1 px-4 py-2 rounded-md font-medium text-sm
            transition-colors
            ${
              value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          Lined
        </button>
      </div>
    </div>
  )
}
