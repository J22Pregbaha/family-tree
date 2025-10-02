/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

// Define the sizes object
export const sizes = {
  xxxs: 'tracking-[0.00rem] text-[0.5rem] font-normal not-italic',
  xxs: 'tracking-[0.00rem] text-[0.625rem] font-normal not-italic',
  xs: 'tracking-[0.00rem] text-[0.75rem] font-normal not-italic',
  s: 'tracking-[0.00rem] text-[0.875rem] font-normal not-italic sm:!text-[0.75rem]',
  md: 'tracking-[0.00rem] text-[1.00rem] font-light not-italic sm:!text-[0.875rem]',
  lg: 'tracking-[0.00rem] text-[1.13rem] font-light not-italic sm:!text-[1.00rem]',
  xl: 'tracking-[0.00rem] text-[1.25rem] font-normal not-italic sm:!text-[1.13rem]',
  xxl: 'tracking-[0.00rem] text-[1.50rem] font-normal not-italic md:text-[1.38rem] sm:!text-[1.25rem]',
  xxxl: 'tracking-[0.00rem] text-[2.00rem] font-normal not-italic md:text-[1.88rem] sm:!text-[1.50rem]',
  xxxxl: 'tracking-[0.00rem] text-[3.00rem] font-normal not-italic md:text-[2.75rem] sm:!text-[2.00rem]',
  xxxxxl: 'tracking-[0.00rem] text-[4.50rem] font-normal not-italic md:text-[2.75rem] sm:!text-[2.00rem]',
  xxxxxxl: 'tracking-[0.00rem] text-[4.50rem] font-normal not-italic md:text-[2.75rem] sm:!text-[4.00rem]',
}

export type TextProps = Partial<{
  className: string;
  as: any;
  isKampe: boolean;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// Use React.forwardRef to forward the ref to the underlying DOM element
const Text = React.forwardRef<HTMLElement, React.PropsWithChildren<TextProps>>(
  ({ children, className = '', as, size = 'md', isKampe = false, ...restProps }, ref) => {
    const Component = as || 'p'

    return (
      <Component
        ref={ref} // Forward the ref here
        className={`text-gray-700 font-outfit ${className} ${sizes[size]} ${isKampe ? '!font-roboto' : ''}`}
        {...restProps}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text' // Optional but recommended for debugging

export { Text }
