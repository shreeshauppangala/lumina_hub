/* eslint-disable max-len */
import React from 'react'

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 24 24" fill="#c1c0c8" x="0" y="0" opacity="100%">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
      <defs>
        <filter id="filter_dshadow_10_0_2_0000001a" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="bg-fix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="alpha" />
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="alpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="bg-fix" result="bg-fix-filter_dshadow_10_0_2_0000001a" />
          <feBlend in="SourceGraphic" in2="bg-fix-filter_dshadow_10_0_2_0000001a" result="shape" />
        </filter>
      </defs>
    </svg>
  )

export default SearchIcon