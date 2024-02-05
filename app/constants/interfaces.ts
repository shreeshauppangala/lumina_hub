/**
 * Represents a dropdown value, which consists of a label and a value.
 * The value can be either a number or null.
 * @typedef {Object} DropdownValue
 * @property {string} label - The label of the dropdown value.
 * @property {number | null} value - The value of the dropdown value, which can be a number or null.
 */
export type DropdownValue = {
  label: string;
  value: number;
} | null;

/**
 * Represents the value of a multi-dropdown component.
 * It can either be an array of objects with properties `data`, `label`, and `value`,
 * or it can be `null`.
 */
export type MultiDropdownValue =
  | {
      data?: any;
      label: string;
      value: number;
    }[]
  | null;

export interface SignUpFormDataI {
  full_name: string;
  email: string;
  password: string & { length: { gte: 8 } };
  confirm_password: string & { length: { gte: 8 } };
  house_name: string;
  village: string;
  city: string;
  state: string;
  pin_code: (number & { length: 6 }) | undefined;
  mobile_number: (number & { length: 10 }) | undefined;
  termsAgreement: boolean;
}

export interface LoginFormDataI {
  email: string;
  password: string;
}

export interface ProductDetailsI {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartDataI {
  products: ProductDetailsI[];
  total: number;
}
