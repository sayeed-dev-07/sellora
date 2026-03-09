'use client'
import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

const ImgSwap = ({ link1, link2 }: { link1: string, link2: string }) => {
    const scope = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const imgs = gsap.utils.selector(scope)(".swapImg");


        gsap.set(imgs[1], { opacity: 0 });


        gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .to(imgs[0], { opacity: 0, duration: 0.6, ease: "power2.inOut" })
            .to(imgs[1], { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "<")
            .to(imgs[1], { opacity: 0, duration: 0.6, ease: "power2.inOut", delay: 1 })
            .to(imgs[0], { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "<");

    }, { scope });

    return (
        <div ref={scope} className='relative w-70 aspect-4/5 '>
            <Image src={link1} alt='modelImg' className='object-contain swapImg' sizes='100vw' fill />
            <Image src={link2} alt='modelImg' className='object-contain swapImg' sizes='100vw' fill />
        </div>
    );
};

export default ImgSwap;