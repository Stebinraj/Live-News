import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const Entertainment = (props) => {

    const [entertainment, setEntertainment] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const getEntertainment = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${process.env.NEWS_API_KEY}`);
                setEntertainment(response.data.articles);
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        getEntertainment();
    }, [])

    return (
        <>
            {props.token ? (
                <>
                    {isLoading ? (<LoadingScreen />) : (
                        <>
                            <Grid container spacing={2}>
                                {entertainment.map((value, index) => {
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

export default Entertainment;