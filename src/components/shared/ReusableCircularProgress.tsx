import { CircularProgress } from '@mui/material'
import React from 'react'

export interface Props {
  size?: number;
  color?: 'warning' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'inherit';
  fixed?: boolean;
}

export default function ReusableCircularProgress({ size = 24, color = 'warning', fixed=false }: Props) {
  return (
    fixed ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <CircularProgress size={size} color={color} />
      </div>
    ) : <CircularProgress size={size} color={color} />
  )
}
