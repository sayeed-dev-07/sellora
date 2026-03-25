'use client'

import React, { useState } from 'react';
import PopularBlock from './PopularBlock';
import ProductSection from './ProductSection';

const productTabs = [
    { id: 'shirt', label: 'Shirt' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'jacket', label: 'Jacket' }
];

const Products = () => {
    const [activeIndx, setActiveIndx] = useState(0);
    const activeTab = productTabs[activeIndx];

    return (
        <div className='py-[5%] px-4 text-center '>

            <div>
                <h1 className="font-outfit  text-[#FFF455] text-4xl sm:text-6xl font-black tracking-wide uppercase 
                [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                    PRODUCTS
                </h1>
                <p className='text-background text-3xl font-semibold'>Lineup</p>
            </div>

            {/* product showcase  */}
            <div className='flex w-full h-auto px-2 sm:px-4 my-[5%] xl:flex-row items-center gap-y-12 xl:items-start flex-col'>

                {/* popular section  */}
                <div className='max-w-[450px] w-full'>
                    <PopularBlock/>
                </div>
                
                {/* change here in this div  */}
                <div className='flex-1 xl:px-12 w-full'>
                    {/* upper buttons  */}
                    <div className='flex w-full items-end gap-3 border-b border-black text-lg font-semibold sm:text-2xl'>
                        {productTabs.map((tab, index) => {
                            const isActive = activeIndx === index;

                            return (
                                <button
                                    key={tab.id}
                                    type='button'
                                    onClick={() => setActiveIndx(index)}
                                    className={`relative -mb-px flex-1 cursor-pointer rounded-t-md  border-black py-[15px] capitalize transition-colors duration-200 ${
                                        isActive
                                            ? 'z-10  border bg-white  border-b-0'
                                            : ' bg-[#eeeeee] border-b'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    
                    <div className='pt-[5%] w-full'>
                        <ProductSection name={activeTab.id}/>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Products;
