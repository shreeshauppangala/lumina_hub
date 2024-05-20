import React from 'react';
import { Swiper as SwiperJs, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Avatar, Box, FormHelperText, Typography, styled } from '@mui/material';
import { getAmountWithCommas } from '@/app/utils';
import { useRouter } from 'next/navigation';
import { ProductI } from '@/app/constants/interfaces';

interface PropsI {
  heading: string;
  productsData: ProductI[] | undefined;
}

const ProductImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(128),
  height: theme.spacing(128),
}));

const Swiper = ({ productsData, heading }: PropsI) => {
  const router = useRouter();

  const ProductCard = ({ data }: { data: ProductI }) => (
    <Box
      onClick={() => router.push(`/${data?._id}`)}
      sx={{ cursor: 'pointer' }}
    >
      <ProductImage variant='square' src={data?.pictures[0]} alt={data?.name} />
      <Box display='flex' gap={20} alignItems='center'>
        <Box>
          <Typography variant='body2' mt={6}>
            {data?.name}
          </Typography>
          <Typography variant='h4' mt={2}>
            {getAmountWithCommas(data?.price)}
          </Typography>
        </Box>
        {data?.quantity_available! <= 0 && (
          <FormHelperText error>Out of stock</FormHelperText>
        )}
      </Box>
    </Box>
  );

  return (
    <Box mt={15}>
      <Typography variant='h4' mb={12}>
        {heading}
      </Typography>
      {!productsData?.length ? (
        <Typography variant='h2' textAlign='center'>
          No Data Found
        </Typography>
      ) : (
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
          {productsData?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </SwiperJs>
      )}
    </Box>
  );
};

export default Swiper;
