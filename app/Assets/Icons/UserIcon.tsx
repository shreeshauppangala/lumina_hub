/* eslint-disable max-len */
import React from 'react';

export const MediumPrimaryUserIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 16'
    width='20'
    height='16'
    fill='none'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16'
      width='16'
      viewBox='0 0 24 24'
      fill='#eb8f1b'
      x='2'
      y='0'
      opacity='100%'
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM10 12h4c1.66 0 3-1.34 3-3 0-.73-.27-1.4-.71-1.92.13-.33.21-.7.21-1.08a3 3 0 0 0-1.86-2.77C14 2.48 13.06 2 12 2s-2 .48-2.64 1.23A3 3 0 0 0 7.5 6c0 .38.08.75.21 1.08C7.27 7.6 7 8.27 7 9c0 1.66 1.34 3 3 3z' />
    </svg>
    <defs>
      <filter
        id='filter_dshadow_10_0_2_0000001a'
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity='0' result='bg-fix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='alpha'
        />
        <feOffset dx='0' dy='2' />
        <feGaussianBlur stdDeviation='5' />
        <feComposite in2='alpha' operator='out' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
        />
        <feBlend
          mode='normal'
          in2='bg-fix'
          result='bg-fix-filter_dshadow_10_0_2_0000001a'
        />
        <feBlend
          in='SourceGraphic'
          in2='bg-fix-filter_dshadow_10_0_2_0000001a'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);
