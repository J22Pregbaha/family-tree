/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Select, { Props } from 'react-select'

export const shapes = {
  square: 'rounded-[0px]',
} as const

export const sizes = {
  xs: 'h-[2.50rem] pl-[1.00rem] pr-[0.50rem]',
} as const

export type selectOptionType = { value: string | number; label: string };
export type SelectProps = Omit<Props, 'getOptionLabel'> &
  Partial<{
    className: string;
    options: selectOptionType[];
    isLoading: boolean;
    isSearchable: boolean;
    isMulti: boolean;
    onChange: (option: any) => void;
    value: string;
    indicator: React.ReactElement;
    getOptionLabel: (e: any) => string;
    [x: string]: any;
    shape: keyof typeof shapes;

    size: keyof typeof sizes;
  }>;

const SelectBox = React.forwardRef<any, SelectProps>(
  (
    {
      children,
      className = '',
      options = [],
      isLoading=false,
      isSearchable = false,
      isMulti = false,
      indicator,
      shape,

      size = 'xs',
      ...restProps
    },
    ref,
  ) => {
    return (
      <>
        <Select
          ref={ref}
          options={options}
          className={`${className} flex ${shape && shapes[shape]} ${size && sizes[size]}`}
          isLoading={isLoading}
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          styles={{
            indicatorsContainer: (provided) => ({
              ...provided,
              padding: undefined,
              flexShrink: undefined,
              width: 'max-content',
              '& > div': { padding: 0 },
            }),
            container: (provided) => ({
              ...provided,
              zIndex: 0,
              alignItems: 'center',
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: 'transparent',
              border: '0 !important',
              boxShadow: 'none !important',
              minHeight: 'auto',
              width: '100%',
              flexWrap: undefined,
              '&:hover': {
                border: '0 !important',
              },
            }),
            input: (provided) => ({
              ...provided,
              color: 'inherit',
            }),
            option: (provided, state) => ({
              ...provided,
              display: 'flex',
              minWidth: 'max-content',
              width: '100%',
              backgroundColor: state.isSelected ? '#ffffff' : 'transparent',
              color: state.isSelected ? '#358248' : 'inherit',
              '&:hover': {
                backgroundColor: '#e2e2e2',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              display: 'flex',
              marginLeft: undefined,
              marginRight: undefined,
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
              display: 'flex',
              flexWrap: undefined,
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 999999 }),
            menu: (base) => ({
              ...base,
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              minWidth: 'max-content',
            }),
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event: any) => {
            return event.target.id === 'scrollContainer'
          }}
          {...restProps}
        />
        {children}
      </>
    )
  },
)

export { SelectBox }
