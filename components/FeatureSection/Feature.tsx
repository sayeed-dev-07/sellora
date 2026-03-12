import Image from 'next/image';
import React from 'react';

const Feature = () => {
    return (
        <div className='relative'>

            <div className='w-[50%] z-60 absolute left-[3%] top-[1%] sm:w-fit '>
                <Image
                    src="/svg/feature.svg"
                    alt="Feature Image"
                    width={500}
                    height={500}
                    className='w-full h-auto'
                />
            </div>

            <div className='-mb-3 relative z-50 md:-mb-2'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={527}
                    height={36}
                    viewBox="0 0 527 36"
                    fill="none"
                    version="1.1"
                    className='w-2/3 max-w-131.75 md:w-full'
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <mask
                        id="mask0_750_110"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={-1}
                        y={0}
                        width={509}
                        height={36}
                    >
                        <path d="M-1 0H508V36H-1V0Z" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_750_110)">
                        <mask id="path-2-inside-1_750_110" fill="white">
                            <path d="M-1 0H496C502.627 0 508 5.37258 508 12V100.941H-1V0Z" />
                        </mask>
                        <path
                            d="M-1 0H496C502.620 0 508 5.37258 508 12V100.941H-1V0Z"
                            fill="#FFF462"
                        />
                        <path
                            d="M-1 0V-1H-2V0H-1ZM508 100.941V101.941H509V100.941H508ZM-1 100.941H-2V101.941H-1V100.941ZM-1 1H496V-1H-1V1ZM507 12V100.941H509V12H507ZM508 99.9412H-1V101.941H508V99.9412ZM0 100.941V0H-2V100.941H0ZM496 1C502.075 1 507 5.92487 507 12H509C509 4.8203 503.18 -1 496 -1V1Z"
                            fill="black"
                            mask="url(#path-2-inside-1_750_110)"
                        />
                    </g>
                    <mask id="path-5-inside-2_750_110" fill="white">
                        <path d="M507 16H527V36H519C512.373 36 507 30.6274 507 24V16Z" />
                    </mask>
                </svg>
            </div>
            
            {/* Added relative positioning here to anchor the absolute mobile text */}
            <div className='min-h-screen w-full bg-secondary border-t relative '>

                {/* top part  */}
                <div className='pt-[10%] md:pt-0 '>
                    {/* Replaced standard div with a responsive absolute/static layout */}
                    <div className='
                        absolute right-0 top-0 h-full w-10 border-l border-black flex justify-center pt-[10%] z-10
                        md:static md:h-auto md:w-full md:border-none md:flex md:items-center md:justify-end  lg:px-12 md:px-6 px-2 md:pt-0
                    '>
                        <h3 className='
                            [writing-mode:vertical-rl] text-sm tracking-widest
                            md:[writing-mode:horizontal-tb] md:text-2xl lg:text-3xl md:tracking-normal
                            font-noto font-bold mt-4 md:mt-4
                        '>
                            Features of Sellora
                        </h3>
                    </div>
                    
                    {/* Hidden horizontal line on mobile, visible on desktop */}
                    <div className='w-full border-b mt-6 hidden md:block'></div>
                </div>

                {/* bottom part  */}
                {/* Added `pr-12 md:pr-4` so the boxes don't slide underneath the vertical text bar on mobile */}
                <div className='flex items-center px-2 pr-12 md:pr-4 py-[5%] border-t md:border-t-0 flex-wrap gap-y-6 justify-center gap-x-12'>
                    <div className="box h-[400px] w-[400px] bg-background border border-black/10"></div>
                    <div className="box h-[400px] w-[400px] bg-background border border-black/10"></div>
                    <div className="box h-[400px] w-[400px] bg-background border border-black/10"></div>
                    <div className="box h-[400px] w-[400px] bg-background border border-black/10"></div>
                </div>
                
            </div>
        </div>
    );
};

export default Feature;