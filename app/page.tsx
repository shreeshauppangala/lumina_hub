'use client';

import { Box, Typography, styled } from '@mui/material';
import Img from './Assets/Images/HomeHeaderBG.png';
import { Loader, SearchBar, Swiper } from './Components';
import { hooks } from './hooks';

const Categories = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 10),
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
}));

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
  const { UseGetProductsList } = hooks.useProducts();

  const { data, isLoading } = UseGetProductsList();

  return (
    <Box>
      <Categories>dc</Categories>
      <Box padding='0 20px'>
        <HeaderImageBox>
          <Box className='bg_color' />
          <Box className='content'>
            <Box>
              <Typography variant='h2' mb={20}>
                Upgrade to LED Bulbs. Illuminate your space.
              </Typography>
              <SearchBar placeholder='What LED bulb are you looking for?' />
            </Box>
          </Box>
        </HeaderImageBox>
        {isLoading ? (
          <Loader type='section' />
        ) : (
          <Box m='32px 0'>
            <Swiper heading='New Arrivals' productsData={data} />
            <Swiper heading='You might like' productsData={data} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
