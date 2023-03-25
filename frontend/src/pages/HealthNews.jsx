import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Health from '../components/News/Health'
import NotFound from '../components/NotFound/NotFound'

const HealthNews = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    {/* Navbar Component */}
                    <Navbar token={token} />

                    <h1>Health</h1>

                    {/* Health Component */}
                    <Health token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default HealthNews;