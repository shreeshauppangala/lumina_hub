/**
 * Represents a dropdown value, which consists of a label and a value.
 * The value can be either a number or null.
 * @typedef {Object} DropdownValue
 * @property {string} label - The label of the dropdown value.
 * @property {number | null} value - The value of the dropdown value, which can be a number or null.
 */
export type DropdownValue = {
  label: string;
  value: string;
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

export interface UserI {
  picture: string;
  full_name: string;
  email: string;
  password: string & { length: { gte: 8 } };
  house_name: string;
  village: string;
  city: string;
  state: string;
  pin_code: (number & { length: 6 }) | undefined;
  mobile_number: (number & { length: 10 }) | undefined;
  isEmailVerified: boolean;
  isAdmin: boolean;
  cart: CartDataI[];
  orders: OrdersI[];
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: Date | null;
  verifyEmailToken: string | null;
  verifyEmailTokenExpiry: Date | null;
}

export interface SignUpFormDataI
  extends Omit<
    UserI,
    | 'cart'
    | 'orders'
    | 'forgotPasswordToken'
    | 'forgotPasswordTokenExpiry'
    | 'verifyEmailToken'
    | 'verifyEmailTokenExpiry'
    | 'isAdmin'
    | 'isEmailVerified'
    | 'picture'
    | 'state'
    | 'city'
  > {
  picture: string | File;
  confirm_password: string & { length: { gte: 8 } };
  termsAgreement: boolean;
  state: DropdownValue;
  city: DropdownValue;
}

export interface GoogleDataI {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface LoginFormDataI {
  email: string;
  password: string;
}

export interface SignedInUserI {
  _id: string;
  email: string;
  full_name: string;
  picture: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
}

export interface ProductI {
  _id: string;
  pictures: string[];
  name: string;
  description: string;
  price: number;
  bulb_type: string;
  watt: number;
  quantity_available: number;
  __v: number;
}

export interface AddEditProductFormDataI {
  pictures: File[] | string[];
  name: string;
  price: number;
  bulb_type: DropdownValue;
  watt: number;
  quantity_available: number;
  description: string;
}

export interface CartDataI {
  product: ProductI;
  selected_quantity: number;
  _id: string;
}

export interface OrdersI {
  _id: string;
  order_date: string;
  shipped_date: string;
  delivered_date: string;
  cancelled_date: string;
  total_amount: number;
  current_status: 'Order Placed' | 'shipped' | 'cancelled' | 'delivered';
  product: {
    item: ProductI;
    selected_quantity: number;
  };
}
