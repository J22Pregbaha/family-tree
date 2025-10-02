/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import React from 'react'

/**
 * Defines the visual variants for the checkbox.
 */
export const variants = {
  primary: ' checked:border-[3px]  ',
} as const

/**
 * Defines the size variants for the checkbox.
 */
export const sizes = {
  xs: 'h-[1.25rem] w-[1.25rem]',
} as const

/**
 * Props for the CheckBox component.
 * Extends React's input props and adds custom properties.
 */
export type CheckboxProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'prefix' | 'type' | 'onChange'
> &
  Partial<{
    /** Additional CSS class names to apply to the checkbox wrapper */
    className: string;
    /** Name attribute for the checkbox input */
    name: string;
    /** Label text for the checkbox */
    label: string;
    /** ID for the checkbox input */
    id: string;
    /** Change handler for the checkbox */
    onChange: Function;
    /** Visual variant of the checkbox */
    variant: keyof typeof variants;
    /** Size variant of the checkbox */
    size: keyof typeof sizes;
    /** Click handler for the checkbox */
    onClick: () => void;
  }>;

/**
 * CheckBox component renders a customizable checkbox input with an optional label.
 * It supports different sizes and variants, and can be controlled via props.
 *
 * @param props - The component props
 * @returns A React component that renders a customized checkbox
 *
 * @example
 * ```tsx
 * <CheckBox
 *   label="Accept terms and conditions"
 *   name="terms"
 *   id="terms-checkbox"
 *   onChange={(checked) => console.log('Checkbox checked:', checked)}
 *   variant="primary"
 *   size="xs"
 * />
 * ```
 */
const CheckBox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className = '',
      name = '',
      label = '',
      id = 'checkbox_id',
      onChange,
      variant = 'primary',
      size = 'xs',
      ...restProps
    },
    ref,
  ) => {
    /**
     * Handles the change event of the checkbox.
     * Calls the onChange prop with the checked state if provided.
     */
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) {onChange(e?.target?.checked)}
    }

    return (
      <>
        <div className={className + ' flex items-center gap-[0.31rem] cursor-pointer'}>
          <input
            className={` ${(size && sizes[size]) || ''} ${(variant && variants[variant]) || ''}`}
            ref={ref}
            type="checkbox"
            name={name}
            onChange={handleChange}
            id={id}
            {...restProps}
          />
          {!!label && <label htmlFor={id}>{label}</label>}
        </div>
      </>
    )
  },
)

export { CheckBox }
