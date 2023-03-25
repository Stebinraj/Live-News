import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import TopHeadlines from '../components/News/TopHeadlines';
import NotFound from '../components/NotFound/NotFound';

const Dashboard = () => {

    const token = sessionStorage.getItem('Token');

    return (
        <>
            {token ? (
                <>
                    {/* Navbar Component */}
                    < Navbar token={token} />

                    <h1>Top Headlines</h1>

                    {/* Top Headlines Component */}
                    <TopHeadlines token={token} />

                    {/* Footer Component */}
                    <Footer token={token} />
                </>
            ) : (<NotFound />)}
        </>
    )
}

export default Dashboard