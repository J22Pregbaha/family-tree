import React from 'react'

/**
 * Props for the Img component.
 * Extends React's DetailedHTMLProps for img elements and adds custom properties.
 */
export type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
  Partial<{
    /** Additional CSS class names to apply to the img element. */
    className: string;
    /** The source URL of the image. */
    src: string;
    /** The alternative text for the image. */
    alt: string;
    /** An optional URL to navigate to when the image is clicked. */
    href?: string;
  }>;

/**
 * Img component renders an image with optional navigation functionality.
 * It extends the standard HTML img element with additional features like lazy loading
 * and click-to-navigate.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply to the img element
 * @param props.src - The source URL of the image (defaults to 'defaultNoData.png')
 * @param props.alt - The alternative text for the image (defaults to 'testImg')
 * @param props.href - An optional URL to navigate to when the image is clicked
 * @param props.children - Child elements (not typically used for img elements)
 * @returns A React component that renders an enhanced img element
 *
 * @example
 * ```tsx
 * <Img
 *   src="/path/to/image.jpg"
 *   alt="Description of image"
 *   className="rounded-full"
 *   href="/profile"
 * />
 * ```
 */
const Img: React.FC<React.PropsWithChildren<ImgProps>> = ({
  className,
  src = 'defaultNoData.png',
  alt = 'Img',
  ...restProps
}) => {

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...restProps}
      loading={'lazy'}
    />
  )
}

export { Img }
