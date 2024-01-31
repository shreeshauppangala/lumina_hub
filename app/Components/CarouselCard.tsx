'use client'

import React from 'react'
import { Avatar, Box, Typography, styled } from '@mui/material';
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductCardI { image: string; name: string; price: number }

interface PropsI {
  heading: string;
  productsData: ProductCardI[]
};


const ProductImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(128),
  height: theme.spacing(128),
  borderRadius: theme.spacing(12),
}))

const CarouselCardContainer = styled(Box)(({ theme }) => ({
  '.slick-slider': {
    '.slick-next': {
      top: 0,
      right: 0,
      ':before': {
        backgroundColor: theme.palette.common.black,
      }
    },
    '.slick-prev': {
      top: 0,
      right: 40,
      left:'unset',
      ':before': {
        backgroundColor: theme.palette.common.black,
      }
    }
  }
}))

const CarouselCard = (props: PropsI) => {
  const { heading, productsData } = props;

  const ProductCard = ({ image, name, price }: ProductCardI) => (
    <Box mt={12}>
      <ProductImage variant='square' src={image} alt={name} />
      <Typography variant='body2' mt={6}>{name}</Typography>
      <Typography variant='h4' mt={2}>{price}</Typography>
    </Box>
  )

  const settings: Settings = {
    arrows: true,
    infinite: false,
    draggable: true,
    swipe: true,
    touchMove: true,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <CarouselCardContainer>
      <Typography variant='h4'>{heading}</Typography>
      <Slider {...settings}>
        {productsData.map((product) =>
          <ProductCard image={product.image} name={product.name} price={product.price} key={product.image} />
        )}
      </Slider>

    </CarouselCardContainer>
  )
}

export default CarouselCard