'use client'

import { useState, useEffect, useCallback } from 'react'
import { parseInches, formatInchesNoSymbol, isValidInchInput } from '@/lib/fractional-inches'

interface FractionalInputProps {
  label: string
  description?: string
  value: string
  onChange: (value: string, decimalValue: number | null) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export default function FractionalInput({
  label,
  description,
  value,
  onChange,
  placeholder = '12 1/2',
  required = false,
  className = '',
}: FractionalInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const [isValid, setIsValid] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)

      if (newValue === '') {
        setIsValid(!required)
        onChange('', null)
        return
      }

      const parsed = parseInches(newValue)
      const valid = parsed !== null && parsed >= 0

      setIsValid(valid)

      if (valid && parsed !== null) {
        onChange(newValue, parsed)
      } else {
        onChange(newValue, null)
      }
    },
    [onChange, required]
  )

  const handleBlur = useCallback(() => {
    setIsFocused(false)

    // Format the value on blur if it's valid
    if (inputValue) {
      const parsed = parseInches(inputValue)
      if (parsed !== null && parsed >= 0) {
        const formatted = formatInchesNoSymbol(parsed)
        setInputValue(formatted)
        onChange(formatted, parsed)
      }
    }
  }, [inputValue, onChange])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const borderColor = !isValid
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : isFocused
    ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="inline-flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            {label}
          </span>
          {description && <span className="text-gray-500">{description}</span>}
        </span>
      </label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`
            block w-full px-3 py-2 pr-8
            border rounded-md shadow-sm
            font-mono text-lg
            placeholder-gray-400
            focus:outline-none focus:ring-1
            ${borderColor}
          `}
          required={required}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
          "
        </span>
      </div>
      {!isValid && inputValue && (
        <p className="mt-1 text-sm text-red-600">
          Enter a valid measurement (e.g., 12, 12.5, or 12 1/2)
        </p>
      )}
    </div>
  )
}
