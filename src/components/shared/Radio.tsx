import React from 'react'

export const variants = {
  primary: ' checked:border-2 ',
  success: ' checked:border-blue-600 checked:bg-blue-600 border-gray-300 text-green-700 ',
} as const
export const sizes = {
  xs: 'h-[1.25rem] w-[1.25rem]',
} as const

export type RadioProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'prefix' | 'type'
> &
  Partial<{
    className: string;
    name: string;
    label: string;
    id: string;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
  }>;
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    className = '',
    name = '',
    label = '',
    id = 'radio_id',
    variant = 'success',
    size = 'xs',
    onChange,
    ...restProps
  }, ref) => {
    return (
      <label className={className + ' flex items-center gap-[0.31rem] cursor-pointer'}>
        <input
          className={`peer cursor-pointer appearance-none rounded-full border-2 border-gray-300             
            ${(size && sizes[size]) || ''} 
            ${(variant && variants[variant]) || ''} transition-all`
          }
          ref={ref}
          type="radio"
          name={name}
          {...restProps}
          id={id}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    )
  },
)

export { Radio }
