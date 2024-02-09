import React from 'react';

export const LargeGreyCloseIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      viewBox='0 0 24 24'
      fill='#c2c2c2'
      x='0'
      y='0'
      opacity='100%'
    >
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
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
