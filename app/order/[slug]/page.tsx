
import { productDetails } from '@/public/data/productsDetails';
import { data } from '@/public/data/SliderData';
import Image from 'next/image';
import React from 'react';



const page = async ({params}:{params:Promise<{slug: string}>}) => {
    const {slug} = await params
    const data = productDetails.find(item => item.slug === slug)
    
    if (!data || !data.types[0]?.imgLink) {
        return <div>Product not found</div>;
    }
    
    return (
        <div>
            <Image src={data.types[0].imgLink} alt='img' height={200} width={200}/>
        </div>
    );
};

export default page;

