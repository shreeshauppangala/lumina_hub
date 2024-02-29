import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import jwt from 'jsonwebtoken';
import { GoogleDataI } from '../constants/interfaces';

dayjs.extend(timezone);
dayjs.extend(utc);

/**
 * Takes in a date value and returns a string of the date in the format specified.
 * @param {string | Date} dateValue - the date value to format
 * @param {string} [format='MMM D, YYYY'] - the format to use for the date
 * @returns {string} - the formatted date
 */
export const formatDate = (
  dateValue: string | Date | Dayjs | undefined | null,
  format: string = 'MMM D, YYYY',
) => (dateValue ? dayjs(dateValue).format(format) : dateValue);

/**
 * Truncates a given string to a specified length and appends an optional last part.
 * @param {string} string - The string to truncate.
 * @param {number} [visibleStringLength] - The length of the truncated string. Default is 10.
 * @param {string} [lastPart] - The optional last part to append to the truncated string.
 * @returns {string} - The truncated string with the optional last part.
 */
export const truncateString = (
  string: string,
  visibleStringLength: number = 10,
  lastPart?: string,
): string => {
  const extension = string.slice(string.lastIndexOf(lastPart || ''));
  const filenameWithoutExt = string.slice(0, string.lastIndexOf(lastPart || ''));
  const truncatedFilename = `${filenameWithoutExt.slice(0, visibleStringLength)}.....${extension}`;

  return string.length > visibleStringLength ? truncatedFilename : string;
};

/**
 * Takes in a string of code and adds the correct amount of spaces to the beginning of each line.
 * @param {string} code - the code to format
 * @param {number} [spaces=0] - the number of spaces to indent the code
 * @returns None
 */
export const getQueryParams = (queryKey: string, objKey: string, array: any[] | null) => {
  let result = '';

  array?.forEach((item) => {
    result += `&${queryKey}=${item[objKey]}`;
  });

  return result;
};

/**
 * Takes in a number and returns a string with commas in the thousands place.
 * @param {string|number} num - the number to format
 * @returns {string} - the formatted number
 */
export const getNumberWithCommas = (number?: string | number, showZero?: boolean) => {
  if (!number) {
    return showZero ? '0' : '-';
  }
  return number?.toLocaleString('en-IN');
};

/**
 * Takes in a number and returns a string with the correct currency symbol.
 * @param {string | number} number - the number to format
 * @param {'symbol' | 'word'} [symbolType='symbol'] - the type of symbol to use
 * @returns {string} the formatted number
 */
export const getAmountWithCommas = (number?: string | number, showZero?: string) => {
  if (!number) {
    return showZero ? '₹ 0' : '-';
  }

  return `₹ ${number.toLocaleString('en-IN')}`;
};

export const getQuantityOptions = () => {
  const generatedArray = [];

  for (let i = 0; i <= 10; i += 1) {
    generatedArray.push({ label: i === 0 ? `${i.toString()} (delete)` : i.toString(), value: i });
  }

  return generatedArray;
};

export const getDecodedJWT = (token: string | undefined) => jwt.decode(token!) as GoogleDataI;
