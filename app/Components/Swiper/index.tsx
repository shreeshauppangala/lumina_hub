import React from 'react';
import { Swiper as SwiperJs, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Avatar, Box, Typography, styled } from '@mui/material';
import { getAmountWithCommas } from '@/app/utils';
import { useRouter } from 'next/navigation';

interface ProductCardI {
  image: string;
  name: string;
  price: number;
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

  const ProductCard = ({ image, name, price }: ProductCardI) => (
    <Box
      onClick={() => router.push(`details/${name}`)}
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
    <>
      <Typography variant='h4' mb={12}>
        {heading}
      </Typography>
      <SwiperJs
        allowTouchMove
        navigation
        freeMode
        pagination
        slidesPerView={4}
        modules={[Navigation, FreeMode, Pagination]}
        className='mySwiper'
        // breakpoints={{
        //   1500: {
        //     slidesPerView: 5,
        //     spaceBetween: 5,
        //   },
        //   1300: {
        //     slidesPerView: 5,
        //     spaceBetween: 5,
        //   },
        //   991: {
        //     slidesPerView: pageWidth === PAGE_WIDTH.FLUID ? 4 : 3,
        //     spaceBetween: 5,
        //   },
        //   600: {
        //     slidesPerView: pageWidth === PAGE_WIDTH.FLUID ? 3 : 2,
        //     spaceBetween: 5,
        //   },
        //   300: {
        //     slidesPerView: 2,
        //     spaceBetween: 5,
        //   },
        // }}
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
    </>
  );
};

export default Swiper;
