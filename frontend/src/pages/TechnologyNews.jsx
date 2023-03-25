import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Technology from '../components/News/Technology'
import NotFound from '../components/NotFound/NotFound'

const TechnologyNews = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    {/* Navbar Component */}
                    <Navbar token={token} />

                    <h1>Technology</h1>

                    {/* Technology Component */}
                    <Technology token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default TechnologyNews;