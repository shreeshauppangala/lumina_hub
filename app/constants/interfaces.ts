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

export interface StripeTokenI {
  id: string;
  object: string;
  card: {
    id: string;
    object: string;
    address_city: null;
    address_country: null;
    address_line1: null;
    address_line1_check: null;
    address_line2: null;
    address_state: null;
    address_zip: string;
    address_zip_check: string;
    brand: string;
    country: string;
    cvc_check: string;
    dynamic_last4: null;
    exp_month: number;
    exp_year: number;
    funding: string;
    last4: string;
    name: null;
    tokenization_method: null;
    wallet: null;
  };
  client_ip: string;
  created: number;
  livemode: false;
  type: string;
  used: false;
}
