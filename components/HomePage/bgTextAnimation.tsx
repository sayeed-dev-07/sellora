'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
gsap.registerPlugin(useGSAP);

const BgTextAnimation = () => {
    const bgTextRef = useRef<HTMLDivElement | null>(null)
    return (
        <div className="relative inline-block w-full text-center" ref={bgTextRef}>
            <p
                aria-hidden="true"
                className="pointer-events-none tracking-tight leading-tight mx-auto max-w-[90%] w-full absolute inset-0 select-none sm:text-[12vw] text-[14vw] md:text-[10vw] xl:text-[8vw] font-extrabold uppercase font-noto text-transparent [-webkit-text-stroke:3px_black]"
            >
                Quality You Can Trust
            </p>
            <p className="relative md:text-[10vw] xl:text-[8vw] sm:text-[12vw] max-w-[90%] mx-auto text-[14vw] w-full font-extrabold uppercase font-noto text-secondary tracking-tight leading-tight">
                Quality You Can Trust
            </p>
        </div>
    );
};

export default BgTextAnimation;
