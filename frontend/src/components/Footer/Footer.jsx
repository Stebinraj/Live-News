import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Copyright = () => (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color="text.primary">
            {`Copyright © ${new Date().getFullYear()}`}
        </Typography>
    </Container>
);

const Footer = (props) => {
    return (
        <>
            {props.token ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto',
                            marginTop: '50px'
                        }}
                    >
                        <Box
                            component="footer"
                            sx={{
                                py: 0.5,
                                px: 2,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[200]
                                        : theme.palette.grey[800],
                                position: 'fixed',
                                bottom: 0,
                                right: 0,
                                left: 0
                            }}
                        >
                            <Copyright />
                        </Box>
                    </Box>
                </>
            ) : (null)}
        </>
    )
};

export default Footer;