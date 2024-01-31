export interface SignUpFormDataI {
  full_name: string;
  email: string;
  password: string & { length: { gte: 8 } };
  confirm_password: string & { length: { gte: 8 } };
  address: string;
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
