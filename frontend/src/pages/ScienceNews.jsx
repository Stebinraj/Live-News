import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Science from '../components/News/Science'
import NotFound from '../components/NotFound/NotFound'

const ScienceNews = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    {/* Navbar Component */}
                    <Navbar token={token} />

                    <h1>Science</h1>

                    {/* Science Component */}
                    <Science token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default ScienceNews;