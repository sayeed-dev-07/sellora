import { productDetails } from '@/public/data/productsDetails';
import Image from 'next/image';
import React from 'react';

type ProductSectionProps = {
    name: string;
};

const ProductSection = ({ name }: ProductSectionProps) => {
    const categoryProducts = productDetails.filter((item) => item.category === name);

    return (
        <div className='w-full'>
            <div className='grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {categoryProducts.map((item, index) => (
                    <div key={item.id} className='relative flex flex-col items-center gap-4 px-3'>
                        {index > 0 && (
                            <span className='absolute left-0 top-10 hidden h-7 w-px bg-black/70 xl:block' />
                        )}
                        <div className='relative h-24 w-24 sm:h-28 sm:w-28'>
                            <Image
                                fill
                                src={item.types[0]?.imgLink || '/showCase/polloShirt.jpg'}
                                alt={item.name}
                                className='object-contain'
                            />
                        </div>
                        <p className='max-w-[180px] text-center text-xl font-semibold leading-tight text-background'>
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
