'use client';

import { LoggedInUserI } from 'Constants/interfaces';

interface ServiceI extends Storage {
  setToken: (tokenObj: { access_token: string; refresh_token: string }) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  clear: () => void;
  setUser: (data: LoggedInUserI) => void;
  getUser: () => LoggedInUserI | null;
}

/**
 * A service for managing data in the browser's local storage.
 * @returns {Object} - An object with methods for interacting with the local storage.
 */
// eslint-disable-next-line func-names, prefer-arrow/prefer-arrow-functions
const LocalStorageService = (function () {
  /**
   * Declares a variable named 'service' of type 'ServiceI'.
   */
  let service: ServiceI;

  /**
   * Returns the service instance. If the service instance does not exist, it creates a new one and returns it.
   * @returns {ServiceI} The service instance.
   */
  function getService(): ServiceI {
    if (!service) {
      // @ts-ignore
      service = this;
      return service;
    }
    return service;
  }

  /**
   * Sets the access token and refresh token in the local storage.
   * @param {Object} tokenObj - An object containing the access token and refresh token.
   * @param {string} tokenObj.access_token - The access token to be stored.
   * @param {string} tokenObj.refresh_token - The refresh token to be stored.
   * @returns None
   */
  const setToken = (tokenObj: { access_token: string; refresh_token: string }) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('access_token', tokenObj.access_token);
      window.localStorage.setItem('refresh_token', tokenObj.refresh_token);
    }
  };

  const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('access_token');
    }
    return null;
  };

  const getRefreshToken = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('refresh_token');
    }
    return null;
  };

  const clear = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('refresh_token');
      window.localStorage.removeItem('user');
    }
  };

  const setUser = (data: LoggedInUserI) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('user', JSON.stringify(data));
    }
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const userObjectString = window.localStorage.getItem('user');
      if (userObjectString) {
        return JSON.parse(userObjectString) as LoggedInUserI;
      }
    }
    return null;
  };

  return {
    getService,
    setToken,
    getAccessToken,
    getRefreshToken,
    clear,
    getUser,
    setUser,
  };
})();

export default LocalStorageService;
