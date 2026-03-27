import React from 'react';
import { productData } from '@/public/data/productData';
import Image from 'next/image';
import { data } from '@/public/data/SliderData';
import Link from 'next/link';
const CaseCard = ({id}:{id: number}) => {
    const galleryData = productData[id - 1]
    const handUrl = data.find(item => item.slug === galleryData.slug)?.handUrl || ''
    if (!galleryData) {
        return <div>No data found</div>
    }
    return (
        <Link href={`/case_study/${galleryData.slug}`} className='w-full group bg-foreground border rounded-md'>
            <div className='w-full overflow-hidden aspect-video relative'>
                <Image alt={galleryData.name} src={galleryData.bgUrl} fill className='object-cover group-hover:scale-105 transition-all duration-300 rounded-t-md object-center'/>
            </div>
            <div className='p-3 relative flex flex-col gap-y-1.5'>
                <p className='text-xl font-semibold'>{galleryData.title}</p>
                <span className='text-lg'>{galleryData.name}</span>
                <div className='px-3 py-1 border w-fit rounded-sm bg-secondary'>{galleryData.tag[0]}</div>


                {/* floating img  */}
                <div className='absolute right-0 -bottom-8 sm:-bottom-12 z-100'>
                    <Image height={150} width={150} alt='productImg' className='group-hover:rotate-5 duration-200 group-hover:scale-105 transition-all w-30 sm:w-37.5' src={handUrl}/>
                </div>
            </div>
            
        </Link>
    );
};

export default CaseCard;