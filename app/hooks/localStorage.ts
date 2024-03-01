import { SignedInUserI } from '../constants/interfaces';

interface ServiceI extends Storage {
  clear: () => void;
  setUser: (data: SignedInUserI) => void;
  getUser: () => SignedInUserI | null;
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

  const clear = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('refresh_token');
      window.localStorage.removeItem('user');
    }
  };

  const setUser = (data: SignedInUserI) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('user', JSON.stringify(data));
    }
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const userObjectString = window.localStorage.getItem('user');
      if (userObjectString) {
        return JSON.parse(userObjectString) as SignedInUserI;
      }
    }
    return null;
  };

  return {
    getService,
    clear,
    getUser,
    setUser,
  };
})();

export default LocalStorageService;
