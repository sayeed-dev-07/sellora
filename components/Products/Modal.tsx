'use client'

import { productDetails } from '@/public/data/productsDetails';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

type Product = (typeof productDetails)[number];

type ModalProps = {
    product: Product;
    onClose: () => void;
    zIndexClassName?: string;
};

const Modal = ({ product, onClose, zIndexClassName = 'z-50' }: ModalProps) => {
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

    useEffect(() => {
        const onEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, [onClose]);

    const activeType = product.types[selectedTypeIndex] || product.types[0];

    return (
        <div
            className={`fixed z-999 inset-0 ${zIndexClassName} flex items-center justify-center bg-black/60 p-4`}
            onClick={onClose}
        >
            <div
                className='relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-4 text-black sm:p-8'
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-black p-1 text-xl text-[#FFF455] sm:right-4 sm:top-4'
                    aria-label='Close product details modal'
                >
                    <IoClose />
                </button>

                <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
                    <div>
                        <div className='relative mx-auto aspect-square w-full max-w-[420px]'>
                            <Image
                                fill
                                src={activeType?.imgLink || product.types[0].imgLink}
                                alt={activeType?.name || product.name}
                                className='object-contain'
                            />
                        </div>

                        <div className='mt-4'>
                            <p className='text-sm font-semibold uppercase tracking-wide'>
                                Type: <span className='font-normal'>{activeType?.name || product.types[0].name}</span>
                            </p>
                            <div className='mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5'>
                                {product.types.map((type, index) => {
                                    const isActive = selectedTypeIndex === index;

                                    return (
                                        <button
                                            type='button'
                                            key={`${product.id}-${type.name}-${index}`}
                                            onClick={() => setSelectedTypeIndex(index)}
                                            className={`relative aspect-square rounded border p-1 transition ${
                                                isActive
                                                    ? 'border-black ring-2 ring-black/30'
                                                    : 'border-black/20 hover:border-black/60'
                                            }`}
                                            aria-label={`Select ${type.name}`}
                                        >
                                            <Image
                                                fill
                                                src={type.imgLink}
                                                alt={type.name}
                                                className='object-contain'
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='font-noto text-left'>
                        <h2 className='text-3xl font-bold'>{product.name}</h2>
                        <p className='mt-4 text-base leading-7 text-black/80'>{product.des}</p>

                        {product.meterials?.length > 0 && (
                            <p className='mt-5 text-base'>
                                <span className='font-semibold'>Material:</span> {product.meterials.join(', ')}
                            </p>
                        )}

                        {product.size?.length > 0 && (
                            <p className='mt-2 text-base'>
                                <span className='font-semibold'>Sizes:</span> {product.size.join(', ')}
                            </p>
                        )}

                        {product.feat?.length > 0 && (
                            <ul className='mt-5 list-disc pl-5 text-sm leading-7 text-black/80'>
                                {product.feat.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
