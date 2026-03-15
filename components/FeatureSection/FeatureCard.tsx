import { featureData, featureDataType } from '@/public/data/featureData';
import Image from 'next/image';
import React from 'react';

const FeatureCard = ({ id }: { id: 1 | 2 | 3 | 4 }) => {
    const data = featureData.find((item: featureDataType) => item.id === id)
    if (!data) {
        return <div>
            no data found
        </div>
    }
    return (
        <div className={`w-full py-[10%] font-noto flex flex-col items-center sm:px-4  gap-y-12  h-full sm:border-r border-b `}>
            <div className='sm:w-[360px] w-full  sm:max-w-none aspect-square relative'>
                <Image src={data?.imgLink} sizes='100vw' fill alt={data?.title} className='object-cover object-center' />
                <div className='bg-foreground bottom-0 translate-y-1/2 -translate-x-1/2 left-[50%] px-3 py-2 absolute z-10 text-xl font-semibold border'>
                    0{data.id}
                </div>
            </div>
            <div className='flex flex-col gap-y-3 text-center sm:w-[360px] w-full justify-center pb-[2%] sm:max-w-none'>
                <h3 className='sm:text-2xl text-xl font-semibold'>{data.title}</h3>
                <p className='text-start text-sm sm:text-lg'>{data.des}</p>
            </div>
        </div>
    );
};

export default FeatureCard;