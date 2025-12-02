import React from 'react'
import { ProjectItemDimension } from '@/types'

interface YBranch13SVGProps {
  dimensions?: ProjectItemDimension[]
  showLabels?: boolean // Show A, B, C vs actual measurements
  className?: string
}

/**
 * SVG template for Y-Branch #13
 * Displays the duct piece diagram with dimension labels
 * Can show either placeholder labels (A, B, C) or actual measurements
 */
export default function YBranch13SVG({
  dimensions = [],
  showLabels = true,
  className = '',
}: YBranch13SVGProps) {
  // Helper to get dimension display value
  const getDimensionValue = (label: string): string => {
    if (showLabels) {
      return label
    }
    const dim = dimensions.find((d) => d.label === label)
    return dim ? dim.display_value : label
  }

  // Determine font size based on whether showing labels or values
  const fontSize = showLabels ? '24' : '18'
  const fontWeight = showLabels ? 'bold' : 'normal'

  return (
    <svg
      viewBox="0 0 500 450"
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Title */}
      <text
        x="250"
        y="30"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#1f2937"
      >
        Y-BRANCH #13
      </text>

      {/* Top View - Y-Branch Shape */}
      <g transform="translate(50, 50)">
        {/* Main Y-branch outline */}
        <path
          d="M 150 200
             L 150 120
             Q 150 80, 120 60
             L 40 60
             L 40 0
             L 0 0
             L 0 60
             L 0 100
             Q 0 120, 30 140
             L 120 200
             Z"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />
        <path
          d="M 250 200
             L 250 120
             Q 250 80, 280 60
             L 360 60
             L 360 0
             L 400 0
             L 400 60
             L 400 100
             Q 400 120, 370 140
             L 280 200
             Z"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />
        {/* Center connecting section */}
        <path
          d="M 120 200 L 150 200 L 150 120 Q 150 80, 200 80 Q 250 80, 250 120 L 250 200 L 280 200"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />
        {/* Bottom trunk */}
        <rect
          x="120"
          y="200"
          width="160"
          height="20"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Dimension Labels - Top View */}
        {/* B - Left branch width */}
        <g>
          <line x1="0" y1="-10" x2="40" y2="-10" stroke="#374151" strokeWidth="1" />
          <line x1="0" y1="-15" x2="0" y2="-5" stroke="#374151" strokeWidth="1" />
          <line x1="40" y1="-15" x2="40" y2="-5" stroke="#374151" strokeWidth="1" />
          <text
            x="-30"
            y="35"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill="#2563eb"
          >
            {getDimensionValue('B')}
          </text>
        </g>

        {/* C - Right branch width */}
        <g>
          <line x1="360" y1="-10" x2="400" y2="-10" stroke="#374151" strokeWidth="1" />
          <line x1="360" y1="-15" x2="360" y2="-5" stroke="#374151" strokeWidth="1" />
          <line x1="400" y1="-15" x2="400" y2="-5" stroke="#374151" strokeWidth="1" />
          <text
            x="420"
            y="35"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill="#2563eb"
          >
            {getDimensionValue('C')}
          </text>
        </g>

        {/* G - Branch height (left side) */}
        <g>
          <line x1="-20" y1="0" x2="-20" y2="100" stroke="#374151" strokeWidth="1" />
          <line x1="-25" y1="0" x2="-15" y2="0" stroke="#374151" strokeWidth="1" />
          <line x1="-25" y1="100" x2="-15" y2="100" stroke="#374151" strokeWidth="1" />
          <text
            x="-45"
            y="55"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill="#2563eb"
          >
            {getDimensionValue('G')}
          </text>
        </g>

        {/* A - Main trunk width */}
        <g>
          <line x1="120" y1="235" x2="280" y2="235" stroke="#374151" strokeWidth="1" />
          <line x1="120" y1="230" x2="120" y2="240" stroke="#374151" strokeWidth="1" />
          <line x1="280" y1="230" x2="280" y2="240" stroke="#374151" strokeWidth="1" />
          <text
            x="185"
            y="260"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill="#2563eb"
          >
            {getDimensionValue('A')}
          </text>
        </g>
      </g>

      {/* Bottom View - Cross Section */}
      <g transform="translate(50, 330)">
        {/* Left section */}
        <rect
          x="0"
          y="0"
          width="100"
          height="60"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Center collar (square with X) */}
        <rect
          x="120"
          y="5"
          width="50"
          height="50"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />
        <line x1="120" y1="5" x2="170" y2="55" stroke="#374151" strokeWidth="1" />
        <line x1="170" y1="5" x2="120" y2="55" stroke="#374151" strokeWidth="1" />

        {/* Right section */}
        <rect
          x="190"
          y="0"
          width="100"
          height="60"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* D - Left side depth */}
        <text
          x="-25"
          y="35"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fill="#2563eb"
        >
          {getDimensionValue('D')}
        </text>

        {/* F - Center collar */}
        <text
          x="135"
          y="35"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fill="#2563eb"
        >
          {getDimensionValue('F')}
        </text>

        {/* E - Right side depth */}
        <text
          x="305"
          y="35"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fill="#2563eb"
        >
          {getDimensionValue('E')}
        </text>
      </g>
    </svg>
  )
}
