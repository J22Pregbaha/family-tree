import React from 'react'

/**
 * Defines the shape variants for the input.
 */
const shapes = {
  round: 'rounded-[16px]',
  square: 'rounded-[0px]',
} as const

/**
 * Defines the visual variants for the input.
 */
const variants = {
  fill: {
    white_A700: 'bg-white-a700 shadow-xs text-blue_gray-900',
    gray_50_01: 'bg-gray-50_01 shadow-xs text-blue_gray-700_7f',
  },
} as const

/**
 * Defines the size variants for the input.
 */
const sizes = {
  md: 'h-[4.63rem] px-[1.00rem] text-[0.88rem]',
  sm: 'h-[3.63rem] px-[1.00rem]',
  xs: 'h-[3.00rem] px-[0.88rem] text-[1.00rem]',
  lg: 'h-[5.75rem] pl-[1.50rem] pr-[0.75rem] text-[1.00rem]',
} as const

/**
 * Props for the Input component.
 * Extends React's input props and adds custom properties.
 */
type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix' | 'size'> &
  Partial<{
    /** Label text for the input */
    label: string;
    /** Element to be rendered before the input */
    prefix: React.ReactNode;
    /** Element to be rendered after the input */
    suffix: React.ReactNode;
    /** Shape of the input */
    shape: keyof typeof shapes;
    /** Visual variant of the input */
    variant: keyof typeof variants | null;
    /** Size variant of the input */
    size: keyof typeof sizes;
    /** Color variant of the input */
    color: string;
    /** Whether the input is disabled */
    disabled: boolean;
  }>;

/**
 * Input component renders a customizable input field with various style options.
 * It supports prefixes, suffixes, different shapes, sizes, and variants.
 *
 * @param props - The component props
 * @returns A React component that renders a customized input field
 *
 * @example
 * ```tsx
 * <Input
 *   ref={inputRef}
 *   label="Username"
 *   placeholder="Enter your username"
 *   prefix={<UserIcon />}
 *   suffix={<InfoIcon />}
 *   shape="round"
 *   variant="outline"
 *   size="md"
 *   color="indigo_100_01"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      name = '',
      placeholder = '',
      type = 'text',
      label = '',
      prefix,
      suffix,
      onChange,
      shape,
      variant = 'fill',
      size = 'md',
      color = 'white_A700',
      disabled = false,
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text ${shape && shapes[shape]} ${
          variant && (variants[variant]?.[color as keyof (typeof variants)[typeof variant]] || variants[variant])
        } ${size && sizes[size]} ${disabled ? 'bg-gray-200' : ''}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full ${disabled ? 'bg-gray-200 text-gray-500' : ''}`}
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    )
  },
)

export { Input }
