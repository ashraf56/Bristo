import React from 'react';
import Banner from './Banner/Banner';
import Categoryslide from './Categoryslide';
import Populer from '../Populer';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bristo | Home</title>
            </Helmet>
            <Banner></Banner>
            <Categoryslide></Categoryslide>
            <Populer></Populer>
        </div>
    );
};

export default Home;