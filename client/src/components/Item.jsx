import { useState } from "react";
import { useDispatch } from 'react-redux';
import React from 'react';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import { addToCart } from '../state';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const { palette: { neutral } } = useTheme();

    const { category, price, name, image } = item.attributes;
    const {
        data: {
            attributes: {
                formats: {
                    medium: { url },
                }
            }
        }
    } = image;

    return (
        <div>
            <Box width={width}>
                <Box position='relative'
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                >
                    <img
                        alt={item.name}
                        width='300px'
                        height='400px'
                        src={`http://localhost:1337${url}`}
                        onClick={() => navigate(`/item/${item.id}`)}
                        style={{ cursor: 'pointer' }}
                    />
                    <Box
                        display={isHovered ? 'block' : 'none'}
                        position='absolute'
                        bottom='10%'
                        left='0'
                        width='100%'
                        padding='0 5%'
                    >
                        <Box
                            display='flex'
                            justifyContent='space-between'
                        >
                            {/* Amount */}
                            <Box
                                display='flex'
                                alignItems='center'
                                backgroundColor={shades.neutral[100]}
                                borderRadius='3px'
                            >
                                <IconButton
                                    onClick={() => setCount(Math.max(count - 1, 1))}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography color={shades.primary[300]}>{count}</Typography>
                                <IconButton
                                    onClick={() => setCount(count + 1)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            {/* BUTTON */}
                            <Button
                                onClick={() => {
                                    dispatch(addToCart({ item: { ...item, count } }))
                                }}
                                sx={{ backgroundcolor: shades.primary[300], color: 'white' }}
                            >
                                Add To Cart
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box
                    mt='3px'>
                    <Typography variant='subtitle2' color={neutral.dark}>
                        {category ? (category.replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())
                        ) : ('category Not Available')
                        }
                    </Typography>
                    <Typography>{name}</Typography>
                    <Typography fontWeight='bold'>${price}</Typography>
                </Box>
            </Box>
        </div>
    )
}

export default Item
