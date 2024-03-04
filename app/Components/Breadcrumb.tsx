'use client';

import { Breadcrumbs, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface BreadCrumbsPropsI {
  item: {
    name: string | undefined;
    link?: string;
    onClick?: () => void;
  }[];
}

const Breadcrumb = (props: BreadCrumbsPropsI) => {
  const { item } = props;
  const router = useRouter();

  /**
   * Handles navigation to the specified path.
   * @param {To | undefined} path - The path to navigate to.
   * @returns None
   */
  const handleNavigation = (path: string | undefined) => {
    if (path) router.push(path);
  };

  return (
    <Breadcrumbs separator='/'>
      {item.map((data, index) => (
        <Typography
          key={`breadCrumbs-${index + 1}`}
          sx={(theme) => ({
            cursor: data.link || data.onClick ? 'pointer' : 'default',
            color:
              data.link || data.onClick
                ? theme.palette.primary.main
                : theme.palette.grey[500],
          })}
          variant='caption'
          onClick={data.onClick || (() => handleNavigation(data.link))}
        >
          {data.name}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
