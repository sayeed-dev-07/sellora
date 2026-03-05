import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <div className='px-2 flex items-center justify-between sm:px-4  py-3'>
            <div className='p-3 cursor-pointer'>
                <Image src={'/svg/icon.svg'} alt='iconImg' height={140} width={140}/>
            </div>
            <div className='flex items-center justify-center font-medium gap-x-3 text-xl  font-noto'>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Home</a>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Features</a>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Lineup</a>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Printing Method</a>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Order flow</a>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Use cases</a>
                <a className='hover:text-background/50 duration-150 transition-colors ease-in' href="">Contact us</a>
            </div>
        </div>
    );
};

export default Navbar;