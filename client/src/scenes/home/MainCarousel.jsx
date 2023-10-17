import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { shades } from '../../theme';


//imports all image from assets folder
//takes from a specific folder and stores them in an object
//function 'r' is typically provided by webpacks require.context
const importAll = (r) =>
    r.keys().reduce((acc, item) => {
        acc[item.replace('./', '')] = r(item);
        return acc;
    }, {});

const heroTextureImports = importAll(
    require.context('../../assets', false, /\.(png|jpg|svg)$/)
);
///**** *////


//main function that uses useMediaQuery to determine whether the screen width +=
//600px and stores result in 'isNonMobile' 
const MainCarousel = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)')
    return (
        <div>
            <Carousel
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                renderArrowPrev={
                    (onClickHandler, hasPrev, label) => (
                        <IconButton
                            onClick={onClickHandler}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '0',
                                color: 'white',
                                padding: '5px',
                                zIndex: '10',
                            }}
                        >
                            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    )}
                renderArrowNext={
                    (onClickHandler, hasNext, label) => (
                        <IconButton
                            onClick={onClickHandler}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '0',
                                color: 'white',
                                padding: '5px',
                                zIndex: '10',
                            }}
                        >
                            <NavigateNextIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    )
                }
            >
                {/* texture represents the current image being processed and the index represents the position
                of that image in the array of images
                together they allow you to dynamically render wach image and customize the rendering of each carousel item based 
                on it's position in the carousel  */}
                {Object.values(heroTextureImports).map((texture, index) => (
                    <Box key={`carousel-image-${index}`}>
                        <img
                            src={texture}
                            alt={`carousel-${index}`}
                            style={{
                                width: '100%',
                                height: '700px',
                                objectFit: 'cover',
                                backgroundAttachment: 'fixed'
                            }}
                        />
                        <Box
                            color='white'
                            padding='20px'
                            borderRadius='1px'
                            textAlign='left'
                            backgroundColor='rgb(0, 0, 0, 0.4)'
                            position='absolute'
                            top='46%'
                            left={isNonMobile ? '10%' : '0'}
                            right={isNonMobile ? undefined : '0'}
                            margin={isNonMobile ? undefined : '0 auto'}
                            maxWidth={isNonMobile ? undefined : '240px'}
                        >
                            <Typography color={shades.secondary[200]}>New Item</Typography>
                            <Typography variant='h1'>Summer Sale</Typography>
                            <Typography
                                fontWeight='bold'
                                color={shades.secondary[300]}
                                sx={{ textDecoration: 'underline' }}
                            >
                                Discover More</Typography>
                        </Box>
                    </Box>
                ))}
            </Carousel>
        </div>
    )
}

export default MainCarousel; 
