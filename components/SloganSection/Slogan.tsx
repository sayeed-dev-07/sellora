import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Slogan = () => {
    return (
        <>
        <div className='aspect-video max-h-[60vh] w-full  border-y relative flex items-center justify-center flex-col'>
            <Image src={'/products/sloganBg.jpg'} alt='sloganImg' className='bg-cover' fill/>
            <div className='relative px-2 z-10 mx-auto w-fit py-[5%]'>
                <h1 className="font-outfit  text-foreground md:text-8xl text-5xl sm:text-6xl font-black  uppercase 
                [-webkit-text-stroke:2px_black]  [paint-order:stroke_fill]">
                    Sellora 
                </h1>
                <h1 className="font-outfit  text-secondary md:text-7xl text-3xl sm:text-5xl font-black  uppercase 
                [-webkit-text-stroke:2px_black]  [paint-order:stroke_fill]">
                     Wear the Difference 
                </h1>
                <div className='flex items-center justify-center py-3 sm:py-[5%]'>
                    <Link href={'/#products'} className='px-3 cursor-pointer bg-secondary py-1  border uppercase font-semibold text-lg sm:text-2xl rounded-sm '>Order Now</Link>

                </div>
            </div>
        </div>
        <div className='text-xl py-6 flex text-center items-center justify-center gap-x-4 border-b flex-wrap gap-y-2'>
            <p>For questions or consultations, please click here</p>
           <Link href={'contact'} className='px-3 cursor-pointer bg-secondary py-1  border uppercase font-semibold text-lg sm:text-2xl rounded-sm '>contact us</Link>
        </div>
        </>
    );
};

export default Slogan;