import React, { forwardRef, useMemo } from 'react';
import { Box, FormHelperText, InputLabel, Typography } from '@mui/material';
import ReactSelect, {
  ActionMeta,
  StylesConfig,
  DropdownIndicatorProps,
  components,
  Props,
  Theme,
  ValueContainerProps,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { AsyncPaginate, withAsyncPaginate } from 'react-select-async-paginate';
import { DropdownValue, MultiDropdownValue } from '@/app/constants/interfaces';
import { BlackDownArrow } from '@/app/Assets/Icons';
import { theme as MuiTheme } from '@/app/theme/theme';
import { BoxContainer, customStyles } from './styles';

interface SearchableDropDownI extends Props {
  label?: string;
  onChange: (newValue: any, actionMeta: ActionMeta<any>) => void;
  placeholder?: string;
  helperText?: string | null;
  error?: boolean;
  type?: string;
  loadOptions?: (
    usersSearchText: string,
    prevOptions: {
      name: string;
      id: string;
    }[],
    page: {
      page: number;
    },
  ) => void;
  additional?: {
    page: number;
  };
  cacheUniqs?: DropdownValue[] | MultiDropdownValue | any[];
  dropdownInnerText?: string;
  width?: string;
  className?: string;
  styles?: StylesConfig;
  hidden?: boolean;
}

const SearchableDropdown = forwardRef((props: SearchableDropDownI, ref) => {
  const {
    label,
    error,
    helperText,
    type,
    width,
    className,
    styles,
    required,
    dropdownInnerText,
  } = props;

  const CreatableAsyncPaginate = withAsyncPaginate(CreatableSelect);

  /**
   * Returns the correct React Select component based on the type of select.
   * @returns {React.ElementType} - The correct React Select component based on the type of select.
   */
  const RenderComponent: React.ElementType = useMemo(() => {
    if (type === 'creatable') {
      return CreatableSelect;
    }
    if (type === 'asyncCreatable') {
      return CreatableAsyncPaginate;
    }
    if (type === 'asyncPaginate') {
      return AsyncPaginate;
    }
    return ReactSelect;
  }, [CreatableAsyncPaginate, type]);

  /**
   * A custom dropdown indicator component that renders a dropdown icon.
   * @param {DropdownIndicatorProps} dropdownIndicatorProps - The props for the dropdown indicator.
   * @returns A dropdown indicator component.
   */
  const DropdownIndicator = (
    dropdownIndicatorProps: DropdownIndicatorProps,
  ) => (
    <components.DropdownIndicator {...dropdownIndicatorProps}>
      <BlackDownArrow />
    </components.DropdownIndicator>
  );

  /**
   * A component that wraps the value container and adds the dropdown text if it exists.
   * @param {ValueContainerProps} valueContainerProps - the props to pass to the value container.
   * @returns None
   */
  const ValueContainer = (valueContainerProps: ValueContainerProps) => {
    const { children } = valueContainerProps;
    return (
      <components.ValueContainer {...valueContainerProps}>
        {dropdownInnerText ? (
          <Box display='flex' alignItems='center' minWidth={260}>
            <Typography variant='body2' color='black'>
              {dropdownInnerText}{' '}
            </Typography>{' '}
            <Box display='flex' alignItems='center'>
              {children}
            </Box>
          </Box>
        ) : (
          children
        )}
      </components.ValueContainer>
    );
  };

  return (
    <BoxContainer width={width} className={className}>
      {label && (
        <InputLabel
          sx={(theme) => ({
            color: error
              ? theme.palette.error.main
              : theme.palette.common.black,
          })}
          className='select-label'
        >
          {label} {required && <span className='required'>*</span>}
        </InputLabel>
      )}
      <RenderComponent
        {...props}
        inputRef={ref}
        required={required}
        components={{ DropdownIndicator, ValueContainer }}
        styles={{ ...customStyles, ...styles }}
        theme={(theme: Theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: MuiTheme.palette.common.white,
            primary: MuiTheme.palette.primary.main,
          },
        })}
      />
      {error && helperText && (
        <FormHelperText sx={{ marginLeft: 7 }} error>
          {helperText}
        </FormHelperText>
      )}
    </BoxContainer>
  );
});

export default SearchableDropdown;
