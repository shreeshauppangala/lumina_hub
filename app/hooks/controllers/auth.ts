import { Routes } from '@/app/constants';
import { LoginFormDataI, SignUpFormDataI } from '@/app/constants/interfaces';
import { getApi, patchApi, postApi } from '../config';

/**
 * Logs in a user by sending a POST request to the API endpoint for logging in.
 * @param {LoginFormData} data - The login form data containing the user's credentials.
 * @returns A Promise that resolves to the response from the Routes.
 */
export const signIn = (data: LoginFormDataI) => postApi(Routes.signIn, data);

export const signUp = (data: SignUpFormDataI) => postApi(Routes.signUp, data);

export const verifyEmail = (data: { token: string }) =>
  postApi(Routes.verifyEmail, data);

export const signOut = () => getApi(Routes.signOut);

export const getProfileData = () => getApi(Routes.profile);

export const updateProfile = (data: SignUpFormDataI) =>
  patchApi(Routes.profile, data);
