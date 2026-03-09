'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import ImgSwap from './imgSwap';

gsap.registerPlugin(ScrollTrigger, useGSAP)


const News = () => {
    const modelImgRef = useRef<HTMLDivElement | null>(null)
    const newsContainer = useRef<HTMLDivElement | null>(null)

    useGSAP(()=>{
        gsap.to(modelImgRef.current, {
            scale: 1,
            duration:0.4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: modelImgRef.current,
                start: 'clamp(top, 95%)'
            }
        })
    }, {scope: newsContainer})

    return (
        <div ref={newsContainer} className='max-w-7xl min-h-screen px-1 sm:px-2 md:px-6 mx-auto my-24'>

            {/* news notice  */}
            <div className='flex items-center justify-center lg:flex-row flex-col bg-[#eeeeee]'>
                <div className='border rounded-t-md lg:rounded-t-none  lg:rounded-l-md flex items-center justify-center p-[26.5px] w-full lg:w-fit'>
                    <Image src={'/svg/news.svg'} alt='newsSvg' className='w-20' height={40} width={100} />
                </div>
                <div className='border border-t-0 lg:border-t lg:border-l-0 sm:p-6 p-2 lg:flex-1 w-full flex items-center justify-between gap-y-2 flex-col lg:flex-row text-center rounded-b-md  lg:rounded-r-md lg:rounded-bl-none'>
                    <p className='text-lg'>
                        <span className="font-bold mr-3 ">February 1, 2026</span> Order 3 items together and get 【✨30% OFF✨】
                    </p>
                    <div className='flex '>
                        <div className='min-h-[95%] lg:block hidden min-w-0.5 bg-background'></div> <a className='capitalize mx-6 flex items-center justify-center text-xl gap-x-2 font-semibold' href="">order now <BsArrowRight /></a>
                    </div>
                </div>
            </div>

            {/* news text div  */}


            <div className=' h-full flex md:flex-row flex-col mt-[10%] font-noto '>
                <div className='flex gap-y-8 md:gap-y-12 flex-col'>
                    <p className='capitalize text-3xl font-bold'>Buy  the best </p>
                    <p className='sm:max-w-[80%] md:max-w-[70%] flex flex-col items-start justify-between text-[17px] gap-y-6 font-medium tracking-wide leading-relaxed'>

                        <span>Discover premium products crafted for quality, style, and everyday excellence. From unique accessories to standout essentials, Sellora brings together carefully selected items designed to elevate your lifestyle.</span>

                        <span>
                            With a wide range of high-quality products and attention to detail in every design, Sellora helps you find pieces that stand out and express your individuality.
                        </span>

                        <span>

                            With a wide range of high-quality products and attention to detail in every design, Sellora helps you find pieces that stand out and express your individuality.
                        </span>

                        <span>
                            At Sellora, great products don’t just meet expectations—they create experiences.
                        </span>
                    </p>
                </div>
                <div ref={modelImgRef} className='flex items-center justify-center scale-0'>
                    <ImgSwap link1='/img/my-image.png' link2='/img/my-image (1).png'/>
                </div>
            </div>


        </div>
    );
};

export default News;