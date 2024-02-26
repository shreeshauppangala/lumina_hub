import { API } from '@/app/constants';
import { LoginFormDataI, SignUpFormDataI } from '@/app/constants/interfaces';
import { postApi } from '../config';

/**
 * Logs in a user by sending a POST request to the API endpoint for logging in.
 * @param {LoginFormData} data - The login form data containing the user's credentials.
 * @returns A Promise that resolves to the response from the API.
 */
export const signIn = (data: LoginFormDataI) => postApi(`${API.signIn}`, data);

export const signUp = (data: SignUpFormDataI) => postApi(`${API.signUp}`, data);