import React from 'react';
import { Swiper as SwiperJs, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Avatar, Box, Typography, styled } from '@mui/material';
import { getAmountWithCommas } from '@/app/utils';
import { useRouter } from 'next/navigation';

interface ProductCardI {
  image: string;
  name: string;
  price: number;
  _id: string;
}

interface PropsI {
  heading: string;
  productsData: ProductCardI[];
}

const ProductImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(128),
  height: theme.spacing(128),
}));

const Swiper = ({ productsData, heading }: PropsI) => {
  const router = useRouter();

  const ProductCard = ({ image, name, price, _id }: ProductCardI) => (
    <Box
      onClick={() => router.push(`details/${_id}`)}
      sx={{ cursor: 'pointer' }}
    >
      <ProductImage variant='square' src={image} alt={name} />
      <Typography variant='body2' mt={6}>
        {name}
      </Typography>
      <Typography variant='h4' mt={2}>
        {getAmountWithCommas(price)}
      </Typography>
    </Box>
  );

  return (
    <Box mt={15}>
      <Typography variant='h4' mb={12}>
        {heading}
      </Typography>
      <SwiperJs
        allowTouchMove
        navigation
        slidesPerView={4}
        modules={[Navigation]}
        className='mySwiper'
        breakpoints={{
          1200: {
            slidesPerView: 4,
            spaceBetween: 4,
          },
          850: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          1: {
            slidesPerView: 1,
            spaceBetween: 1,
          },
        }}
      >
        {productsData.map((product) => (
          <SwiperSlide key={product.image}>
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
            />
          </SwiperSlide>
        ))}
      </SwiperJs>
    </Box>
  );
};

export default Swiper;
