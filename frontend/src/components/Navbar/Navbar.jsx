import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

    const pages = [
        { title: "Home", path: '/dashboard' },
        { title: "Business", path: '/business' },
        { title: "Entertainment", path: '/entertainment' },
        { title: "Health", path: '/health' },
        { title: "Science", path: '/science' },
        { title: "Sports", path: '/sports' },
        { title: "Technology", path: '/technology' },
        { title: 'Logout', path: '/' }
    ]

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setIsMenuOpen(true);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setIsMenuOpen(false);
    };

    const logout = () => {
        handleCloseNavMenu();
        sessionStorage.clear();
    }

    return (
        <>
            {props.token ? (
                <>
                    <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                {/* Large Navbar Start */}
                                <NewspaperRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    NEWS
                                </Typography>

                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                                    {pages.map((value, index) => {
                                        return (
                                            <NavLink key={index} to={value.path} replace={true} style={{ textDecoration: 'none' }} >
                                                <Button onClick={value.title === "Logout" ? (logout) : (handleCloseNavMenu)} sx={{ my: 2, color: 'white', display: 'block' }}>{value.title}</Button>
                                            </NavLink>
                                        )
                                    })}
                                </Box>
                                {/* Large Navbar End */}

                                {/* Small Navbar Start */}
                                <NewspaperRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href=""
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'none' },
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    NEWS
                                </Typography>

                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        {isMenuOpen ? (<CloseIcon />) : (<MenuIcon />)}
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                        }}
                                    >
                                        {pages.map((value, index) => {
                                            return (
                                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                                    <NavLink key={index} to={value.path} replace={true} style={{ textDecoration: 'none' }} >
                                                        <Button onClick={value.title === "Logout" ? (logout) : (handleCloseNavMenu)} sx={{ color: 'black' }}>{value.title}</Button>
                                                    </NavLink>
                                                </MenuItem>
                                            )
                                        })}
                                    </Menu>
                                </Box>
                                {/* Small Navbar End */}
                            </Toolbar>
                        </Container>
                    </AppBar>
                </>
            ) : (null)}
        </>
    )
}

export default Navbar