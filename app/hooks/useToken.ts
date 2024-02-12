'use client';

import { useState } from 'react';
import axios from 'axios';
import LocalStorageService from './localStorage';

/**
 * Retrieves the instance of the LocalStorageService and assigns it to the LocalStorage variable.
 * @returns The instance of the LocalStorageService.
 */
const LocalStorage = LocalStorageService.getService();

/**
 * Initializes a state variable with the access token retrieved from the local storage.
 * @returns {Array} - A tuple containing the access token and a function to update it.
 */
const useToken = () => {
  const [token, setToken] = useState(LocalStorage.getAccessToken());

  /**
   * Saves the user token to the local storage.
   * @param {Object} userToken - The user token object containing the access token and refresh token.
   * @param {string} userToken.access_token - The access token.
   * @param {string} userToken.refresh_token - The refresh token.
   * @returns None
   */
  const saveToken = (userToken: { access_token: string; refresh_token: string }) => {
    LocalStorage.setToken(userToken);
  };

  /**
   * Removes the authentication token from local storage, clears the token state,
   * and removes the Authorization header from axios defaults.
   * @returns None
   */
  const removeToken = () => {
    LocalStorage.clearStorage();
    setToken(null);
    axios.defaults.headers.common.Authorization = undefined;
  };

  return {
    setToken: saveToken,
    removeToken,
    token,
  };
};

export default useToken;
