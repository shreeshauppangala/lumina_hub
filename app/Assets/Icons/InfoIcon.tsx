/* eslint-disable max-len */
import React from 'react';

export const GreyLargeInfoIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    fill='none'
  >
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
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
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
