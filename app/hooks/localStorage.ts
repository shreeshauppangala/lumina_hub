import { SignedInUserI } from '../constants/interfaces';

interface ServiceI {
  clear: () => void;
  setUser: (data: SignedInUserI) => void;
  getUser: () => SignedInUserI | null;
}

/**
 * A service for managing data in the browser's local storage.
 * @returns {Object} - An object with methods for interacting with the local storage.
 */
const LocalStorageService = (() => {
  /**
   * Declares a variable named 'service' of type 'ServiceI'.
   */
  let service: ServiceI;

  const clear = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('user');
  };

  const setUser = (data: SignedInUserI) => {
    window.localStorage.setItem('user', JSON.stringify(data));
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
  /**
   * Returns the service instance. If the service instance does not exist, it creates a new one and returns it.
   * @returns {ServiceI} The service instance.
   */
  const getService = (): ServiceI => {
    if (!service) {
      service = {
        clear,
        setUser,
        getUser,
      };
    }
    return service;
  };

  return {
    getService,
  };
})();

export default LocalStorageService;
