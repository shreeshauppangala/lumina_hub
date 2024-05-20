import { ReactNode, createContext, useContext, useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import axios, { AxiosResponse } from 'axios';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  LoginFormDataI,
  SignUpFormDataI,
  SignedInUserI,
  UserI,
} from '../constants/interfaces';
import {
  getProfileData,
  signIn,
  signOut,
  signUp,
  updateProfile,
  verifyEmail,
} from './controllers/auth';
import LocalStorageService from './localStorage';
import { useSnackBar } from './snackbar';
import { useMisc } from './misc';

interface ProvideAuthI {
  children: ReactNode;
}

interface SignUpData extends Omit<SignUpFormDataI, 'city' | 'state'> {
  city: string;
  state: string;
}

interface AuthI {
  user: SignedInUserI;

  openSignIn: boolean;
  setOpenSignIn: (open: boolean) => void;
  onSignIn: (data: LoginFormDataI | CredentialResponse) => void;
  isSigningIn: boolean;

  openSignUp: boolean;
  setOpenSignUp: (open: boolean) => void;
  onSignUp: (data: SignUpData) => void;
  isSignUpLoading: boolean;

  logoutModalOpen: boolean;
  setLogoutModalOpen: (logoutModalOpen: boolean) => void;
  isSigningOut: boolean;
  onSignOut: () => void;

  isEmailVerified: boolean;
  isVerifyingEmail: boolean;
  onVerifyEmail: (data: { token: string }) => void;

  openForgotPassword: boolean;
  setOpenForgotPassword: (openForgotPassword: boolean) => void;

  isProfileUpdating: boolean;
  onUpdateProfile: (data: SignUpData) => void;
  UseGetProfileData: () => UseQueryResult<UserI, Error>;
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
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar, ShowErrorSnackBar } =
    useSnackBar();

  const { onFileUpload } = useMisc();

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
  const onSignUp = async (data: SignUpFormDataI) => {
    if (typeof data.picture !== 'string') {
      const url = await onFileUpload({ file: data.picture, folder: 'user' });
      mutateSignUp({ ...data, picture: url });
    } else {
      mutateSignUp(data);
    }
  };

  /**
   * A hook that handles the sign-in mutation and updates the necessary state and local storage.
   * @returns {Object} An object with the following properties:
   *   - mutateSignIn: A function that triggers the sign-in mutation.
   *   - isLoading: A boolean indicating whether the sign-in mutation is currently loading.
   */
  const { mutate: mutateSignIn, isPending: isSigningIn } = useMutation<
    AxiosResponse<
      { message: 'User logged in successfully'; data: SignedInUserI },
      any
    >,
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

  const { mutate: mutateSignOut, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      LocalStorage.clear();
      queryClient.clear();
      setUser(null);
      setLogoutModalOpen(false);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  const onSignOut = () => {
    mutateSignOut();
  };

  /**
   * Adds a response interceptor to the axios instance that will handle 401 responses.
   * @returns None
   */
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          onSignOut();
          ShowErrorSnackBar('Session Expired');
        }
      }
      return Promise.reject(error);
    },
  );

  const { mutate: mutateVerifyEmail, isPending: isVerifyingEmail } =
    useMutation({
      mutationFn: verifyEmail,
      onSuccess: () => {
        setIsEmailVerified(true);
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const onVerifyEmail = (data: { token: string }) => {
    mutateVerifyEmail(data);
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
    });

  const { mutate: mutateUpdateProfile, isPending: isProfileUpdating } =
    useMutation({
      mutationFn: updateProfile,
      onSuccess: ({ data }) => {
        queryClient.refetchQueries({ queryKey: ['profile'] });
        router.back();
        ShowSuccessSnackBar(data.message);
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const onUpdateProfile = (data: SignUpFormDataI) => {
    mutateUpdateProfile(data);
  };

  return {
    onSignIn,
    isSigningIn,

    onSignUp,
    isSignUpLoading,

    logoutModalOpen,
    setLogoutModalOpen,
    isSigningOut,
    onSignOut,

    isProfileUpdating,
    onUpdateProfile,
    UseGetProfileData,

    isEmailVerified,
    isVerifyingEmail,
    onVerifyEmail,

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

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};
