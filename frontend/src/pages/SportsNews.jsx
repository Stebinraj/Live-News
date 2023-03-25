import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Sports from '../components/News/Sports'
import NotFound from '../components/NotFound/NotFound'

const SportsNews = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    <Navbar token={token} />

                    <h1>Sports</h1>

                    {/* Sports Component */}
                    <Sports token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (<NotFound />)}
            {/* Navbar Component */}
        </>
    )
}

export default SportsNews;