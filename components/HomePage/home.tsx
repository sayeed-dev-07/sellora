'use client'
import React, { useRef, useState } from 'react';
import BgTextAnimation from './bgTextAnimation';
import Slider from './Slider';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

let hasHomeIntroPlayed = false

const Home = () => {
    const [shouldAnimateIntro] = useState(() => !hasHomeIntroPlayed)
    const [isHomeDone, setIsHomeDone] = useState(hasHomeIntroPlayed)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    
    useGSAP(()=>{
        if (!textRef.current) return

        if (!shouldAnimateIntro) {
            gsap.set(textRef.current, {
                opacity: 1,
                scale: 1,
            })
            return
        }

        gsap.to(textRef.current, {
            opacity: 1,
            scale: 1,
            duration:0.6,
            ease:'power3.out',
            onComplete:()=> {
                hasHomeIntroPlayed = true
                setIsHomeDone(true)
            }
        })
    }, {scope: containerRef})
    return (
        <div ref={containerRef} className='h-[90vh] w-full relative flex items-center justify-center overflow-hidden'>
            {/* bg text  */}
            <div ref={textRef} className='absolute scale-200 opacity-0 top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full'>
                <BgTextAnimation/>
            </div>
            <Slider homeDone={isHomeDone} skipEntranceAnimation={!shouldAnimateIntro} />
        </div>
    );
};

export default Home;
