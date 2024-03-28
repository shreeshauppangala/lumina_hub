'use client';

import { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import Img from './Assets/Images/HomeHeaderBG.png';
import { Loader, SearchBar, Swiper } from './Components';
import { hooks } from './hooks';

// const Categories = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(5, 10),
//   borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
// }));

const HeaderImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(15),
  height: '422px',
  backgroundImage: `url(${Img.src})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: theme.spacing(15),

  '.bg_color': {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.6,
    backgroundColor: theme.palette.common.white,
  },
  '.content': {
    zIndex: 1,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}));

const Home = () => {
  const [productSearch, setProductSearch] = useState('');
  const { UseGetProductsList } = hooks.useProducts();

  const { data, isLoading } = UseGetProductsList();

  const { data: SearchedData, isLoading: isSearching } =
    UseGetProductsList(productSearch);

  return (
    <Box>
      {/* <Categories>dc</Categories> */}
      <Box padding='0 20px' pt={1}>
        <HeaderImageBox>
          <Box className='bg_color' />
          <Box className='content'>
            <Box>
              <Typography variant='h2' mb={20}>
                Upgrade to Bulbs. Illuminate your space.
              </Typography>
              <SearchBar
                placeholder='What bulb are you looking for?'
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </Box>
          </Box>
        </HeaderImageBox>
        {isLoading ? (
          <Loader type='section' />
        ) : (
          <Box m='32px 0'>
            {productSearch.length ? (
              isSearching ? (
                <Loader type='section' />
              ) : (
                <Swiper
                  heading='Searched Products'
                  productsData={SearchedData}
                />
              )
            ) : null}
            <Swiper heading='Products' productsData={data} />
            {/* <Swiper heading='You might like' productsData={data} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
