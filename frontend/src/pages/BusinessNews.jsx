import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Business from '../components/News/Business'
import NotFound from '../components/NotFound/NotFound'

const BusinessNews = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    {/* Navbar Component */}
                    <Navbar token={token} />

                    <h1>Business</h1>

                    {/* Business Component */}
                    <Business token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default BusinessNews