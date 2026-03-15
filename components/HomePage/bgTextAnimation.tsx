'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
gsap.registerPlugin(useGSAP);

const BgTextAnimation = () => {
    const bgTextRef = useRef<HTMLDivElement | null>(null)
    return (
        <div className="relative inline-block w-full text-center" ref={bgTextRef}>
            <p className='[-webkit-text-stroke:2px_black] [paint-order:stroke_fill] text-secondary sm:text-[12vw] text-[14vw] tracking-wide leading-tight mx-auto max-w-[90%] w-full md:text-[10vw] xl:text-[8vw] font-extrabold uppercase font-noto'>Quality You Can Trust</p>
        </div>
    );
};

export default BgTextAnimation;
