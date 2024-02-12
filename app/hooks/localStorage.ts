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
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
  };

  /**
   * Retrieves the access token from the browser's local storage.
   * @returns {string | null} The access token, or null if it is not found.
   */
  const getAccessToken = () => localStorage.getItem('access_token');

  /**
   * Retrieves the refresh token from the browser's local storage.
   * @returns {string | null} The refresh token, or null if it does not exist.
   */
  const getRefreshToken = () => localStorage.getItem('refresh_token');

  /**
   * Clears the access token, refresh token, and user data from the local storage.
   * @returns None
   */
  const clear = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  };

  /**
   * Sets the logged in user data in the local storage.
   * @param {LoggedInUserI} data - The data of the logged in user.
   * @returns None
   */
  const setUser = (data: LoggedInUserI) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  /**
   * Retrieves the user object from the local storage and returns it as a LoggedInUserI object.
   * @returns {LoggedInUserI | null} The user object if it exists in the local storage, otherwise null.
   */
  const getUser = () => {
    const userObjectString = localStorage.getItem('user');
    if (userObjectString) {
      return JSON.parse(userObjectString) as LoggedInUserI;
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
