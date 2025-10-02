/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const sizes = {
  ds_subtext_bold: 'tracking-[0.00rem] text-[0.88rem] font-bold',
  xs: 'tracking-[0.00rem] text-[0.625rem] font-bold',
  s: 'tracking-[0.00rem] text-[0.75rem] font-semibold sm:text-[0.625rem]',
  md: 'tracking-[0.00rem] text-[0.88rem] font-semibold sm:text-[0.75rem]',
  lg: 'tracking-[0.00rem] text-[1.00rem] font-bold sm:!text-[0.88rem]',
  xl: 'tracking-[0.00rem] text-[1.50rem] font-semibold md:text-[1.38rem] sm:!text-[1.00rem]',
  xxl: 'tracking-[0.00rem] text-[2.00rem] font-semibold md:text-[1.88rem] sm:!text-[1.25rem]',
  xxxl: 'tracking-[0.00rem] text-[2.50rem] font-semibold md:text-[2.38rem] sm:!text-[2.00rem]',
  xxxxl: 'tracking-[0.00rem] text-[3.00rem] font-semibold md:text-[2.50rem] sm:!text-[2.38rem]',
}

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = '',
  size = 's',
  as,
  ...restProps
}) => {
  const Component = as || 'h6'

  return (
    <Component className={`text-gray-900 font-outfit ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  )
}

export { Heading }
