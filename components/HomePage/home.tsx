import React from 'react';
import BgTextAnimation from './bgTextAnimation';
import Slider from './Slider';

const Home = () => {
    return (
        <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
            {/* bg text  */}
            <div className='absolute inset-0'>
                <BgTextAnimation/>
            </div>
            <Slider/>
        </div>
    );
};

export default Home;
