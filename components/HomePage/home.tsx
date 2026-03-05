import React from 'react';
import BgTextAnimation from './bgTextAnimation';
import Slider from './Slider';

const Home = () => {
    return (
        <div className='h-screen overflow-x-hidden'>
            {/* bg text  */}
            <BgTextAnimation/>
            <Slider/>
        </div>
    );
};

export default Home;
