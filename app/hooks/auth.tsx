"use client"

import { ReactNode, createContext, useContext, useState } from 'react';

interface ProvideAuthI {
  children: ReactNode;
}

interface AuthI {
  openSignIn: boolean; setOpenSignIn: (open: boolean) => void;
  openSignUp: boolean; setOpenSignUp: (open: boolean) => void;
  openForgotPassword: boolean; setOpenForgotPassword: (openForgotPassword: boolean) => void;
}

const AuthContext = createContext<any>(null);

export const useAuth = (): AuthI => useContext(AuthContext);

const useAuthFunc = () => {
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openForgotPassword, setOpenForgotPassword] = useState(false)

  return {
    openSignIn, setOpenSignIn,
    openSignUp, setOpenSignUp,
    openForgotPassword, setOpenForgotPassword,
  }
};

export const ProvideAuth = ({ children }: ProvideAuthI) => {
  const AuthValue = useAuthFunc();

  return <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>;
};