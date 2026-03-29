
import OrderPage from '@/components/OrderSection/OrderPage';
import { productData } from '@/public/data/productData';
import { productDetails } from '@/public/data/productsDetails';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface dataType {
    id: number,
    name: string,  
    types: {name: string, imgLink: string}[],
    size: string[],
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params
    const data = [...productDetails, ...productData].find(item => item.slug === slug)

    

    if (!data) {
        return <div>Product not found</div>;
    }

    return (
        <OrderPage data={data} />
    );
};

export default Page;

