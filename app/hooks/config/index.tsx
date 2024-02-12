import axios from 'axios';
import { BASE_SERVER_URL } from '@/app/constants';
import LocalStorageService from '../localStorage';

/**
 * Creates an instance of the LocalStorageService and returns it.
 * @returns An instance of the LocalStorageService.
 */
const LocalStorage = LocalStorageService.getService();

/**
 * Sets the Authorization header for all Axios requests to include the access token
 * retrieved from local storage.
 * @returns None
 */
axios.defaults.headers.common.Authorization = `Bearer ${LocalStorage.getAccessToken()}`;
/**
 * Gets the API data from the server.
 * @param {string} url - the url to get the data from.
 * @returns {Promise} - the data from the server.
 */
export const getApi = (url: string) => axios.get(BASE_SERVER_URL + url);

/**
 * Posts data to the API server.
 * @param {string} url - the url to post to.
 * @param {any} data - the data to send.
 * @returns {Promise} - the promise of the post.
 */
export const postApi = (url: string, data: any) => axios.post(BASE_SERVER_URL + url, data);

/**
 * Posts data to the API server.
 * @param {string} url - the url to post to.
 * @param {any} data - the data to send.
 * @returns {Promise} - the promise of the post.
 */
export const patchApi = (url: string, data: any) => axios.patch(BASE_SERVER_URL + url, data);

/**
 * Sends a PUT request to the API server.
 * @param {string} url - the url to send the request to.
 * @param {any} [data] - the data to send with the request.
 * @returns {Promise} - the promise of the request.
 */
export const putApi = (url: string, data: any) => axios.put(BASE_SERVER_URL + url, data);

/**
 * Deletes the given url from the API server.
 * @param {string} url - the url to delete from the API server.
 * @param {any} [data] - the data to send with the request.
 * @returns {Promise} - the promise of the request.
 */
export const deleteApi = (url: string, data?: any) => axios.delete(BASE_SERVER_URL + url, data);
