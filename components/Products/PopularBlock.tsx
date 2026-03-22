'use client'

import Modal from '@/components/Products/Modal';
import { productDetails } from '@/public/data/productsDetails';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

gsap.registerPlugin(useGSAP);

const PopularBlock = () => {
    const popularProducts = productDetails.filter((item) => item.hot);
    type Product = (typeof popularProducts)[number];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const totalSlides = popularProducts.length;

    useGSAP(() => {
        gsap.to(trackRef.current, {
            xPercent: -100 * currentIndex,
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className='w-full h-full relative'>
            {/* Viewport (Hides the overflow of the slider track) */}
            <div className='w-full h-full overflow-hidden border rounded-xl'>
                {/* The Track (This is what GSAP actually moves) */}
                <div ref={trackRef} className='w-full h-full flex'>
                    {popularProducts.map((item) => {
                        return <button
                            type='button'
                            onClick={() => openModal(item)}
                            className='text-background h-full w-full flex flex-col shrink-0 rounded-xl items-center gap-y-6 py-[5%] cursor-pointer'
                            key={item.id}
                        >
                            <div className='relative w-[60%] aspect-square'>
                                <Image fill src={item.types[0].imgLink} className='object-contain' alt={item.name} />
                            </div>
                            <div className='md:w-[80%] w-[90%] font-noto xl:w-[50%] mx-auto'>
                                <h3 className='font-bold text-2xl'>{item.name}</h3>

                            </div>
                            <p className='w-[80%] mx-auto'>{item.des}</p>
                        </button>;
                    })}
                </div>
            </div>

            {/* Left Button */}
            <div
                onClick={handlePrev}
                className={`absolute z-10 text-foreground top-[50%] -left-5 -translate-y-1/2 bg-background rounded-full  text-2xl p-2 shadow-md transition-opacity ${currentIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-100 hover:scale-105 cursor-pointer'}`}
            >
                <FaChevronLeft />
            </div>

            {/* Right Button */}
            <div
                onClick={handleNext}
                className={`absolute z-10 text-foreground top-[50%] -right-5 -translate-y-1/2 bg-background rounded-full  text-2xl p-2 shadow-md transition-opacity ${currentIndex === totalSlides - 1 ? 'opacity-0 cursor-default' : 'opacity-100 hover:scale-105 cursor-pointer'}`}
            >
                <FaChevronRight />
            </div>

            {selectedProduct && (
                <Modal key={selectedProduct.id} product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
};

export default PopularBlock;
