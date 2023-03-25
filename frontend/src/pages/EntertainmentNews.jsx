import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Entertainment from '../components/News/Entertainment'
import NotFound from '../components/NotFound/NotFound'

const EntertainmentNews = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    {/* Navbar Component */}
                    <Navbar token={token} />

                    <h1>Entertainment</h1>

                    {/* Entertainment Component */}
                    <Entertainment token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default EntertainmentNews;