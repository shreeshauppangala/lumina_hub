'use client'

import { Box, Typography, styled } from "@mui/material";
import Img from './Assets/Images/HomeHeaderBG.png'
import { CarouselCard, SearchBar } from "./Components";

const Categories = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 10),
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
}))

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
  }
}));
const data = [
  {
    image: "https://example.com/image1.jpg",
    name: "Product A",
    price: 25
  },
  {
    image: "https://example.com/image2.jpg",
    name: "Product B",
    price: 30
  },
  {
    image: "https://example.com/image3.jpg",
    name: "Product C",
    price: 15
  },
  {
    image: "https://example.com/image4.jpg",
    name: "Product D",
    price: 40
  },
  {
    image: "https://example.com/image5.jpg",
    name: "Product E",
    price: 20
  },
  {
    image: "https://example.com/image6.jpg",
    name: "Product F",
    price: 35
  },
  {
    image: "https://example.com/image7.jpg",
    name: "Product G",
    price: 28
  },
  {
    image: "https://example.com/image8.jpg",
    name: "Product H",
    price: 18
  },
  {
    image: "https://example.com/image9.jpg",
    name: "Product I",
    price: 22
  },
  {
    image: "https://example.com/image10.jpg",
    name: "Product J",
    price: 33
  },
  {
    image: "https://example.com/image11.jpg",
    name: "Product K",
    price: 27
  },
  {
    image: "https://example.com/image12.jpg",
    name: "Product L",
    price: 14
  },
  {
    image: "https://example.com/image13.jpg",
    name: "Product M",
    price: 38
  },
  {
    image: "https://example.com/image14.jpg",
    name: "Product N",
    price: 21
  },
  {
    image: "https://example.com/image15.jpg",
    name: "Product O",
    price: 32
  },
  {
    image: "https://example.com/image16.jpg",
    name: "Product P",
    price: 24
  },
  {
    image: "https://example.com/image17.jpg",
    name: "Product Q",
    price: 29
  },
  {
    image: "https://example.com/image18.jpg",
    name: "Product R",
    price: 36
  },
  {
    image: "https://example.com/image19.jpg",
    name: "Product S",
    price: 17
  },
  {
    image: "https://example.com/image20.jpg",
    name: "Product T",
    price: 31
  }
]

const Home = () => (
  <Box>
    <Categories>
      dc
    </Categories>
    <Box padding='0 20px'>
      <HeaderImageBox>
        <Box className='bg_color' />
        <Box className='content'>
          <Box>
            <Typography variant="h2" mb={20}>Upgrade to LED Bulbs. Illuminate your space.</Typography>
            <SearchBar placeholder="What LED bulb are you looking for?" />
          </Box>
        </Box>
      </HeaderImageBox>
      <Box mt={16}>
        <Box mb={16}>
        <CarouselCard heading="New Arrivals" productsData={data} />
        </Box>
        <CarouselCard heading="You might like" productsData={data} />
      </Box>
    </Box>
  </Box>
);

export default Home