import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';

const TopHeadlines = (props) => {

    const [topHeadlines, setTopHeadlines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTopHeadlines = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=07cfe25429e84dc7bca88cb0e91f3bfe');
                if (response && response.data.articles) {
                    setTopHeadlines(response.data.articles);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        getTopHeadlines();
    }, [props.token])


    return (
        <>
            {props.token ? (
                <>
                    {isLoading ? (<LoadingScreen />) : (
                        <>
                            <Grid container spacing={2}>
                                {topHeadlines.map((value, index) => {
                                    return (
                                        <Grid key={index} item xs={12} sm={12} md={6} lg={4} sx={{ display: 'flex' }}>
                                            <Card sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: '20px',
                                                boxSizing: 'border-box',
                                            }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: '100%',
                                                        height: '40vh',
                                                        border: '7px solid white',
                                                        borderRadius: '20px',
                                                        boxSizing: 'border-box',
                                                    }}
                                                    image={value.urlToImage}
                                                    alt="logo"
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5">
                                                            {value.title}
                                                        </Typography>
                                                        <br />
                                                        <Typography variant="title1" color="text.secondary" component="div">
                                                            <ShowMoreText
                                                                lines={3}
                                                                anchorClass=""
                                                                more={<span className='read-more'>Read More</span>}
                                                                less={<span className='read-less'>Read Less</span>}
                                                                expanded={false}
                                                                truncatedEndingComponent={"... "}
                                                            >
                                                                {value.description}
                                                            </ShowMoreText>
                                                        </Typography>
                                                        <br />
                                                        <Typography variant="subtitle2" color="text.secondary" component="div">
                                                            {moment(value.publishedAt).format('DD-MM-YYYY hh:mm:ss a')} {value.author === null ? (null) : (`- ${value.author}`)}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </>
                    )}
                </>
            ) : (null)}
        </>
    )
}

export default TopHeadlines;