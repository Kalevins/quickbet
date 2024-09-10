import type { FC } from "react";

interface RadialProgressProps {
  radius?: number;
  fontSize?: number;
  stroke?: number;
  rating: number;
}

export const RadialProgress: FC<RadialProgressProps> = ({
  radius = 50,
  fontSize = 32,
  stroke = 10,
  rating,
}): JSX.Element => {
  const percentage = rating * 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const color =
    percentage >= 75 ? "success" : percentage >= 50 ? "warning" : "error";
  const svgSize = radius * 2 + stroke;

  return (
    <svg width={svgSize} height={svgSize}>
      <g transform="rotate(-90 100 100)">
        <circle
          r={radius}
          cx={200 - (radius + stroke / 2)}
          cy={radius + stroke / 2}
          fill="transparent"
          stroke={`var(--color-${color}-opacity)`}
          strokeWidth={`${stroke}px`}
          strokeDasharray={circumference}
          strokeDashoffset="0"
        />
        <circle
          r={radius}
          cx={200 - (radius + stroke / 2)}
          cy={radius + stroke / 2}
          fill="transparent"
          stroke={`var(--color-${color})`}
          strokeWidth={`${stroke}px`}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={`${fontSize}px`}
        fill={`var(--color-text)`}
      >
        {percentage.toFixed(0)}%
      </text>
    </svg>
  );
};
