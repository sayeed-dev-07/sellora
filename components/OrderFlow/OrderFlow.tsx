import Link from 'next/link';
import React from 'react';
import { BsArrowDown, BsArrowRight } from 'react-icons/bs';

const OrderFlow = () => {
    return (
        <div className='sm:py-[5%] py-3 flex flex-col gap-y-12'>
            {/* title section  */}
            <div className='text-center'>
                <h1 className="font-outfit  text-[#FFF455] text-4xl sm:text-6xl md:text-7xl font-black  uppercase 
                [-webkit-text-stroke:2px_black]  [paint-order:stroke_fill]">
                    how  to  order
                </h1>
                <p className='sm:text-3xl text-xl py-2 font-semibold'>Order flow</p>
            </div>
 
            <div className='grid grid-cols-1 gap-y-6 xl:grid-cols-4  max-w-[1500px] w-full items-start justify-between gap-x-6 px-[5%] text-center mx-auto'>
                <div className='flex mx-auto flex-col xl:flex-row gap-y-4 items-center gap-x-4 max-w-[450px] w-full xl:max-w-none'>
                    <div className='flex flex-1 flex-col gap-y-3'>
                    <h3 className='text-2xl font-semibold'>Quotes and Inquiries</h3>
                    <div className='border bg-secondary rounded-sm px-2 font-semibold w-fit mx-auto py-0.5'>Minimum 1 minute</div>
                    <div className=''>
                        <Link className='font-semibold text-[#959494]' href={'/order'}>Easy quote form</Link> From
                        Select and send product specifications.
                        Specifications not on the site
                        Please feel free to contact us.
                    </div>
                    
                </div>
                <BsArrowRight className='xl:block hidden' size={44}/>
                <BsArrowDown className='xl:hidden block' size={34}/>
                </div>
                
                <div className='flex items-center flex-col xl:flex-row gap-y-4 gap-x-4 mx-auto max-w-[450px] w-full xl:max-w-none'>
                    <div className='flex flex-1 flex-col  gap-y-3'>
                    <h3 className='text-2xl font-semibold'>Reply from the person in charge</h3>
                    <div className='border bg-secondary rounded-sm px-2 font-semibold w-fit mx-auto py-0.5'>Minimum 1 working day</div>
                    <div className=''>
                        We will reply from the person in charge,
                        Follow the instructions to get design data
                        Please send it to us.
                    </div>
                    
                </div>
                <BsArrowRight className='xl:block hidden' size={44}/>
                <BsArrowDown className='xl:hidden block' size={34}/>
                </div>
                
                <div className='flex items-center flex-col xl:flex-row gap-y-4 gap-x-4 mx-auto max-w-[450px] w-full xl:max-w-none'>
                    <div className='flex flex-1  flex-col gap-y-3'>
                    <h3 className='text-2xl font-semibold'>Check the finished image</h3>
                    <div className='border bg-secondary rounded-sm px-2 font-semibold w-fit mx-auto py-0.5'>Minimum 1 working day</div>
                    <div className=''>
                        The finished image and
                        Final quote
                        Please check.
                    </div>
                    
                </div>
                <BsArrowRight className='xl:block hidden' size={44}/>
                <BsArrowDown className='xl:hidden block' size={34}/>
                </div>
                
                <div className='flex flex-1 flex-col gap-y-3 mx-auto max-w-[450px] w-full xl:max-w-none'>
                    <h3 className='text-2xl font-semibold'>Production and delivery</h3>
                    <div className='border bg-secondary rounded-sm px-2 font-semibold w-fit mx-auto py-0.5'>Approximately 2 weeks</div>
                    <div className=''>
                        If there is no problem with the content,
                        Upon notification of the order
                        Enter the production of the product.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFlow;