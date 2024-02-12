'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginFormDataI } from '../constants/interfaces';
import { signIn } from './controllers/auth';
import LocalStorageService from './localStorage';
import useToken from './useToken';
import { useSnackBar } from './snackbar';

interface ProvideAuthI {
  children: ReactNode;
}

interface AuthI {
  openSignIn: boolean;
  setOpenSignIn: (open: boolean) => void;
  openSignUp: boolean;
  setOpenSignUp: (open: boolean) => void;
  openForgotPassword: boolean;
  setOpenForgotPassword: (openForgotPassword: boolean) => void;
}

const AuthContext = createContext<any>(null);

export const useAuth = (): AuthI => useContext(AuthContext);

/**
 * A class that handles all of the local storage for the extension.
 */
const LocalStorage = LocalStorageService.getService();

const useAuthFunc = () => {
  const [user, setUser] = useState(LocalStorage.getUser());
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const queryClient = useQueryClient();
  const { ShowApiErrorSnackBar } = useSnackBar();

  /**
   * Sets the token to the given value.
   * @param {string} token - the token to set the token to.
   * @returns None
   */
  const { setToken } = useToken();

  /**
   * A hook that handles the sign-in mutation and updates the necessary state and local storage.
   * @returns {Object} An object with the following properties:
   *   - mutateSignIn: A function that triggers the sign-in mutation.
   *   - isLoading: A boolean indicating whether the sign-in mutation is currently loading.
   */
  const { mutate: mutateSignIn, isPending: isSignInLoading } = useMutation<
    AxiosResponse<any, { message: string }>,
    any,
    any
  >({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      /**
       * Sets the access token and refresh token in the token object.
       * @param {Object} data - The data object containing the access token and refresh token.
       * @returns None
       */
      setToken({ access_token: data.access, refresh_token: data.refresh });
      /**
       * Sets the user data in the local storage, including the logo image URL.
       * @param {Object} data.user - The user data object.
       * @param {string} data.user.logo - The logo image URL.
       * @returns None
       */
      LocalStorage.setUser({ ...data.user });
      /**
       * Sets the Authorization header for all Axios requests to include the provided access token.
       * @param {string} data.access - The access token to include in the Authorization header.
       * @returns None
       */
      axios.defaults.headers.common.Authorization = `Bearer ${data.access}`;
      /**
       * Updates the user object with a new logo image URL.
       * If the logo image URL is not provided or is empty, it sets the logo property to an empty string.
       * @param {Object} data - The data object containing the user and logo information.
       * @param {Object} data.user - The user object to update.
       * @param {string} data.user.logo - The current logo image URL.
       * @returns None
       */
      setUser({ ...data.user });
      /**
       * Clears the query cache of the query client.
       * @returns None
       */
      queryClient.clear();
      /**
       * Navigates to a specific route based on the user's access level.
       * If the user has access to the dashboard, it navigates to '/dashboard'.
       * If the user has access to the project list, it navigates to '/projects'.
       * Otherwise, it navigates to 'calendar'.
       * @param {string} route - The route to navigate to.
       * @param {object} options - Additional options for the navigation.
       * @returns None
       */
      // navigate(
      //   data.user?.access.dashboard
      //     ? '/dashboard'
      //     : data.user?.access.project_list
      //       ? '/projects'
      //       : 'calendar',
      //   { replace: true },
      // );
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  /**
   * A function that is called when the user signs in.
   */
  const onSignIn = (data: LoginFormDataI) => mutateSignIn(data);

  return {
    onSignIn,
    isSignInLoading,

    user,

    openSignIn,
    setOpenSignIn,
    openSignUp,
    setOpenSignUp,
    openForgotPassword,
    setOpenForgotPassword,
  };
};

export const ProvideAuth = ({ children }: ProvideAuthI) => {
  const AuthValue = useAuthFunc();

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};
