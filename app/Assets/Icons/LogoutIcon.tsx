/* eslint-disable max-len */
import React from 'react';

export const MediumPrimaryLogoutIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 16' width='20' height='16' fill='none'>
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
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z' />
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
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
        <feBlend mode='normal' in2='bg-fix' result='bg-fix-filter_dshadow_10_0_2_0000001a' />
        <feBlend in='SourceGraphic' in2='bg-fix-filter_dshadow_10_0_2_0000001a' result='shape' />
      </filter>
    </defs>
  </svg>
);
