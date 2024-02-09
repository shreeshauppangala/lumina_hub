import { Box, styled } from '@mui/material';
import { StylesConfig } from 'react-select';
import { theme } from '@/app/theme/theme';

interface CustomStyleConfig extends StylesConfig {
  maxHeight: string;
}

export const customStyles: CustomStyleConfig = {
  maxHeight: theme.spacing(23),
  /**
   * Returns a menu style object with the base styles and additional custom styles.
   * @param {object} base - The base menu style object.
   * @returns A menu style object with custom styles added.
   */
  menu: (base) => ({
    ...base,
    border: `${theme.spacing(0.5)} solid ${theme.palette.primary.light}`,
    background: theme.palette.common.white,
  }),
  /**
   * Returns a CSS style object that hides the indicator separator in a React Select component.
   * @returns {object} A CSS style object with the 'display' property set to 'none'.
   */
  indicatorSeparator: () => ({
    display: 'none',
  }),
  /**
   * Returns a control object with the specified styles for a React Select component.
   * @param {object} base - The base styles for the control object.
   * @param {object} state - The state of the control object.
   * @returns {object} - The control object with the specified styles.
   */
  control: (base, state: any) => ({
    ...base,
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    pointerEvents: 'auto',
    background: theme.palette.common.white,
    borderRadius: theme.spacing(12),
    boxShadow: '0px 2px 8px rgba(64,60,67,0.24)',
    border: `${theme.spacing(0.5)} solid ${state.isDisabled ? theme.palette.grey[400] : 'transparent'}`,
    padding: theme.spacing(1, 0),

    '&:focus': {
      border: '',
    },
    '&:hover': {
      backgroundColor: '',
    },
  }),
  /**
   * Returns a placeholder style object for an input field based on the given base and state.
   * @param {object} base - the base style object for the placeholder
   * @param {object} state - the state of the input field
   * @returns An object containing the style properties for the placeholder.
   */
  placeholder: (base, state) => ({
    ...base,
    fontWeight: 400,
    fontSize: theme.spacing(9),
    color: state.isDisabled ? (theme.palette.grey as unknown as string) : '#b7b7b8',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  }),
  /**
   * Returns a modified version of the base menu list style object with updated typography and color.
   * @param {Object} base - the base menu list style object to modify
   * @returns {Object} - the modified menu list style object
   */
  menuList: (base) => ({
    ...base,
    fontSize: theme.spacing(6),
    color: theme.palette.common.black,
    maxHeight: theme.spacing(90),
  }),
  /**
   * Returns a modified version of the base object with additional styles for hover and active states.
   * @param {object} base - the base object to modify
   * @returns {object} - the modified object with additional styles for hover and active states.
   */
  option: (base) => ({
    ...base,
    borderRadius: theme.spacing(2),
    '&:hover': {
      background: theme.palette.primary.light,
      color: theme.palette.common.black as unknown as string,
    },
    '&:active': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white as unknown as string,
    },
  }),
  /**
   * Returns a style object for a single value input element.
   * @param {Object} base - The base style object to extend.
   * @param {Object} state - The state of the input element.
   * @returns An object containing the style properties for the single value input element.
   */
  singleValue: (base, state) => ({
    ...base,
    fontSize: theme.spacing(9),
    color: theme.palette.common.black,
    opacity: state.isDisabled ? 0.6 : 1,
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  }),

  /**
   * Returns a modified version of the base style object for a multi-value label.
   * @param {Object} base - the base style object for a multi-value label
   * @returns {Object} - a modified version of the base style object with a dark green background,
   * selected white text, and no border
   */

  multiValue: (base) => ({
    ...base,
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(16),
    color: theme.palette.common.white as unknown as string,
    padding: theme.spacing(4, 6),
  }),

  multiValueLabel: (base) => ({
    ...base,
    fontSize: theme.spacing(6),
    fontWeight: 600,
    color: theme.palette.common.white as unknown as string,
    paddingRight: theme.spacing(4),
    marginRight: theme.spacing(2),
    borderRight: `${theme.spacing(0.5)} solid ${theme.palette.grey[300]}`,
  }),

  /**
   * Overrides the default styles for the dropdown indicator in a React Select component.
   * @param {object} base - the base styles for the dropdown indicator
   * @returns {object} - the modified styles for the dropdown indicator
   */
  dropdownIndicator: (base, state) => ({
    ...base,
    paddingRight: theme.spacing(10),
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg) translate(10px, 0)' : 'none',
  }),
};

export const BoxContainer = styled(Box)(() => ({
  '.select-label': {
    ...theme.typography.caption,
    marginBottom: theme.spacing(2),
  },

  '.required': {
    color: theme.palette.error.main,
  },
}));
