import React from 'react'

/**
 * Props for the CloseSVG component.
 * Extends React's SVGProps and adds custom properties.
 */
export type CloseSVGProps = React.SVGProps<SVGSVGElement> &
  Partial<{
    /** The fill color for the SVG. */
    fillColor: string;
    /** Additional CSS class names to apply to the SVG element. */
    className: string;
  }>;

/**
 * CloseSVG component renders a customizable close (X) icon as an SVG.
 * It can be used in various contexts where a close or dismiss action is needed.
 *
 * @param props - The component props
 * @returns A React component that renders a close icon SVG
 *
 * @example
 * ```tsx
 * <CloseSVG
 *   fillColor="#FF0000"
 *   className="my-close-icon"
 *   width={24}
 *   height={24}
 * />
 * ```
 */
const CloseSVG: React.FC<CloseSVGProps> = ({
  fillColor = '#000000',
  className = '',
  ...props
}) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 20}
      width={props?.height || 20}
      viewBox={`0 0 ${props?.width || 20} ${props?.height || 20}`}
    >
      <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
    </svg>
  )
}
export { CloseSVG }
