/**
 * Fractional Inch Utilities
 *
 * Handles parsing and formatting of imperial measurements in various formats:
 * - Decimal: "12.5"
 * - Fractional: "12 1/2", "12-1/2", "12 1/2""
 * - Whole numbers: "12"
 */

// Common fractions used in HVAC work (in 1/8" increments)
const COMMON_FRACTIONS: { decimal: number; display: string }[] = [
  { decimal: 0, display: '' },
  { decimal: 0.125, display: '1/8' },
  { decimal: 0.25, display: '1/4' },
  { decimal: 0.375, display: '3/8' },
  { decimal: 0.5, display: '1/2' },
  { decimal: 0.625, display: '5/8' },
  { decimal: 0.75, display: '3/4' },
  { decimal: 0.875, display: '7/8' },
]

/**
 * Parse a fractional inch string to decimal inches
 * Accepts formats like: "12", "12.5", "12 1/2", "12-1/2", "1/2"
 */
export function parseInches(input: string): number | null {
  if (!input || typeof input !== 'string') {
    return null
  }

  // Clean up input
  const cleaned = input.trim().replace(/["″'']/g, '').trim()

  if (!cleaned) {
    return null
  }

  // Try parsing as a simple decimal number first
  const simpleNum = parseFloat(cleaned)
  if (!isNaN(simpleNum) && !cleaned.includes('/')) {
    return simpleNum
  }

  // Try parsing fractional formats
  // Pattern: optional whole number, followed by optional fraction
  // Examples: "12 1/2", "12-1/2", "1/2", "12"
  const fractionPattern = /^(\d+)?\s*[-\s]?\s*(\d+)\/(\d+)$/
  const match = cleaned.match(fractionPattern)

  if (match) {
    const whole = match[1] ? parseInt(match[1], 10) : 0
    const numerator = parseInt(match[2], 10)
    const denominator = parseInt(match[3], 10)

    if (denominator === 0) {
      return null
    }

    return whole + (numerator / denominator)
  }

  // If nothing matched, try one more time as a number
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

/**
 * Find the closest common fraction to a decimal value
 */
function findClosestFraction(decimal: number): { decimal: number; display: string } {
  const fractionalPart = decimal - Math.floor(decimal)

  let closest = COMMON_FRACTIONS[0]
  let minDiff = Math.abs(fractionalPart - closest.decimal)

  for (const fraction of COMMON_FRACTIONS) {
    const diff = Math.abs(fractionalPart - fraction.decimal)
    if (diff < minDiff) {
      minDiff = diff
      closest = fraction
    }
  }

  return closest
}

/**
 * Format decimal inches to a fractional string
 * Example: 12.5 -> "12 1/2""
 */
export function formatInches(decimal: number | null | undefined): string {
  if (decimal === null || decimal === undefined || isNaN(decimal)) {
    return ''
  }

  const whole = Math.floor(decimal)
  const fraction = findClosestFraction(decimal)

  if (fraction.display === '') {
    return `${whole}"`
  }

  if (whole === 0) {
    return `${fraction.display}"`
  }

  return `${whole} ${fraction.display}"`
}

/**
 * Format decimal inches to a fractional string without the inch symbol
 * Example: 12.5 -> "12 1/2"
 */
export function formatInchesNoSymbol(decimal: number | null | undefined): string {
  if (decimal === null || decimal === undefined || isNaN(decimal)) {
    return ''
  }

  const whole = Math.floor(decimal)
  const fraction = findClosestFraction(decimal)

  if (fraction.display === '') {
    return `${whole}`
  }

  if (whole === 0) {
    return fraction.display
  }

  return `${whole} ${fraction.display}`
}

/**
 * Validate if a string is a valid inch measurement
 */
export function isValidInchInput(input: string): boolean {
  const parsed = parseInches(input)
  return parsed !== null && parsed >= 0
}

/**
 * Round to the nearest 1/8"
 */
export function roundToEighth(decimal: number): number {
  return Math.round(decimal * 8) / 8
}

/**
 * Get a display-friendly version for input placeholder
 */
export function getPlaceholderExample(): string {
  return '12 1/2'
}
