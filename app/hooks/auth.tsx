import { ReactNode, createContext, useContext, useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginFormDataI, SignUpFormDataI, SignedInUserI } from '../constants/interfaces';
import { getProfileData, signIn, signUp } from './controllers/auth';
import LocalStorageService from './localStorage';
import { useSnackBar } from './snackbar';

interface ProvideAuthI {
  children: ReactNode;
}

interface AuthI {
  user: SignedInUserI;

  onSignIn: (data: LoginFormDataI | CredentialResponse) => void;
  isSignInLoading: boolean;

  onSignUp: (data: SignUpFormDataI | CredentialResponse) => void;
  isSignUpLoading: boolean;

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
  const [openSignIn, setOpenSignIn] = useState(true);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const queryClient = useQueryClient();
  const { ShowApiErrorSnackBar } = useSnackBar();

  const { mutate: mutateSignUp, isPending: isSignUpLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.clear();
      setOpenSignUp(false);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  /**
   * A function that is called when the user signs up.
   */
  const onSignUp = (data: SignUpFormDataI) => {
    mutateSignUp(data);
  };

  /**
   * A hook that handles the sign-in mutation and updates the necessary state and local storage.
   * @returns {Object} An object with the following properties:
   *   - mutateSignIn: A function that triggers the sign-in mutation.
   *   - isLoading: A boolean indicating whether the sign-in mutation is currently loading.
   */
  const { mutate: mutateSignIn, isPending: isSignInLoading } = useMutation<
    AxiosResponse<{ message: 'User logged in successfully'; data: SignedInUserI }, any>,
    Error,
    LoginFormDataI,
    unknown
  >({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      /**
       * Sets the user data in the local storage, including the logo image URL.
       * @param {Object} data.data - The user data object.
       * @returns None
       */
      LocalStorage.setUser({ ...data.data });
      /**
       * Updates the user object with a new logo image URL.
       * If the logo image URL is not provided or is empty, it sets the logo property to an empty string.
       * @param {Object} data - The data object containing the user and logo information.
       * @param {Object} data.data - The user object to update.
       * @returns None
       */
      setUser({ ...data.data });
      /**
       * Clears the query cache of the query client.
       * @returns None
       */
      queryClient.clear();
      setOpenSignIn(false);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  /**
   * A function that is called when the user signs in.
   */
  const onSignIn = (data: LoginFormDataI) => {
    mutateSignIn(data);
  };

  /**
   * Custom hook that uses the `useQuery` hook from a query library to fetch profile data.
   * @returns An object containing the profile data.
   */
  const UseGetProfileData = () =>
    useQuery({
      queryKey: ['profile'],
      queryFn: () => getProfileData(),
      select: ({ data }) => data,
      // enabled: !!LocalStorage.getAccessToken() && !!LocalStorage.getRefreshToken(),
    });

  return {
    onSignIn,
    isSignInLoading,

    onSignUp,
    isSignUpLoading,

    UseGetProfileData,

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
