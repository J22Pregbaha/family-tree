import React from 'react'
import ReusableCircularProgress from './ReusableCircularProgress'

/**
 * Defines the shape variants for the button.
 */
export const shapes = {
  square: 'rounded-[0px]',
  circle: 'rounded-[50%]',
  round: 'rounded-[14px]',
} as const

/**
 * Defines the visual variants for the button.
 */
export const variants = {
  fill: {
    white_A700: 'bg-white-a700',
    gray_200: 'bg-gray-200 text-blue_gray-300',
    gray_400: 'bg-gray-400 text-white-a700',
    gray_50: 'bg-gray-50 shadow-sm text-blue_gray-900',
    gray_50_01: 'bg-gray-50_01 text-gray-600_02',
    gray_100: 'bg-gray-100 text-gray-900_01',
    blue_600: 'bg-blue-600 text-white-a700',
    gray_100_02: 'bg-gray-100_02 shadow-sm text-gray-50_02',
    green_700: 'bg-green-700 text-gray-50_03',
    red_300: 'bg-red-k300 text-white-a700',
    red_400: 'bg-red-400 text-white-a700',
  },
  outline: {
    blue_600: 'border-indigo-50 border border-solid text-blue-600',
    green_100: 'border-green-100 border-t border-b border-solid text-blue_gray-700',
    white_A700: 'border-white-a700 border-[0.5px] border-solid',
    indigo_50: 'border-indigo-50 border border-solid text-blue_gray-700',
    indigo_100_01: 'border-indigo-100_01 border border-solid text-blue_gray-700',
    red_400: 'border-red-400 border boorder-solid text-red-400',
  },
} as const

/**
 * Defines the size variants for the button.
 */
export const sizes = {
  xxxl: 'h-[3.25rem] px-[1.00rem] text-[1.00rem] sm:!text-[0.88rem]',
  xxxxl: 'h-[3.50rem] px-[1.50rem] text-[1.00rem] sm:!text-[0.88rem]',
  lg: 'h-[2.25rem] px-[0.50rem] text-[0.88rem] sm:!text-[0.75rem]',
  md: 'h-[2.00rem] px-[0.50rem]',
  xs: 'h-[1.75rem] px-[0.63rem] text-[0.88rem] sm:!text-[0.75rem]',
  xxl: 'h-[3.00rem] px-[2.13rem] text-[1.00rem] sm:!text-[0.88rem]',
  sm: 'h-[2.00rem] px-[0.38rem] text-[0.88rem] sm:!text-[0.75rem]',
  xl: 'h-[2.50rem] px-[1.50rem] text-[0.88rem] sm:!text-[0.75rem]',
} as const

/**
 * Props for the Button component.
 * Extends React's button props and adds custom properties.
 */
export type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onClick'
> &
  Partial<{
    /** Additional CSS class names to apply to the button */
    className: string;
    /** Element to be rendered before the button text */
    leftIcon: React.ReactNode;
    /** Element to be rendered after the button text */
    rightIcon: React.ReactNode;
    /** Click handler for the button */
    onClick: () => void;
    /** Shape of the button */
    shape: keyof typeof shapes;
    /** Visual variant of the button */
    variant: keyof typeof variants | null;
    /** Size variant of the button */
    size: keyof typeof sizes;
    /** Color variant of the button */
    color: string;
    /** Whether the button is disabled */
    disabled: boolean;
    /** Whether the button is in a loading state */
    loading: boolean;
    isKampe: boolean;
  }>;

/**
 * Button component renders a customizable button with various style options.
 * It supports icons, different shapes, sizes, and variants, as well as loading and disabled states.
 *
 * @param props - The component props
 * @returns A React component that renders a customized button
 *
 * @example
 * ```tsx
 * <Button
 *   leftIcon={<Icon name="user" />}
 *   shape="round"
 *   variant="fill"
 *   size="md"
 *   color="green_700"
 *   onClick={() => console.log('Button clicked')}
 *   loading={isLoading}
 * >
 *   Click me
 * </Button>
 * ```
 */
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = '',
  leftIcon,
  rightIcon,
  shape,
  variant = 'fill',
  size = 'xs',
  color = 'white_A700',
  disabled = false,
  loading = false,
  isKampe = false,
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center 
      whitespace-nowrap 
      ${shape && shapes[shape]} 
      ${size && sizes[size]} 
      ${variant && variants[variant]?.[color as keyof (typeof variants)[typeof variant]]}
      ${(disabled || loading) ? 'opacity-75 bg-gray-200 text-blue_gray-300' : ''} 
      ${disabled ? 'cursor-not-allowed' : loading ? 'cursor-progress' : 'cursor-pointer'}
      ${isKampe ? '!font-roboto' : ''}`}
      {...restProps}
      disabled={disabled || loading}
    >
      {!!leftIcon && leftIcon}
      {loading ? <ReusableCircularProgress /> : children}
      {!!rightIcon && rightIcon}
    </button>
  )
}

export { Button }
