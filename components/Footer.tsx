'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Products', href: '/#products' },
    { label: 'Order flow', href: '/#order-flow' },
    { label: 'Use cases', href: '/#use-cases' },
    { label: 'Contact us', href: '/contact' },
]

const companyLinks = [
    { label: 'Brand story', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'Studio notes', href: '#' },
]

const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
]

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 220)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <button
                type='button'
                onClick={scrollToTop}
                aria-label='Go to the top of the page'
                className={`fixed cursor-pointer bottom-5 right-4 z-[140] rounded-full border border-black/15 bg-white/95 px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-sm transition duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
            >
                Top
            </button>

            <footer className='mt-auto border-t border-black/10 bg-background text-foreground'>
                <div className='mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
                    <div className='grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]'>
                        <div className='max-w-md'>
                            <Link href='/' className='inline-block font-outfit text-3xl font-black uppercase tracking-[0.24em] text-secondary'>
                                Sellora
                            </Link>
                            <p className='mt-4 text-sm leading-7 text-white/68'>
                                A calm, product-first storefront for brands that want a clean presence with room for bold details.
                            </p>
                            <p className='mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/45'>
                                Minimal. Clear. Memorable.
                            </p>
                        </div>

                        <div>
                            <p className='text-sm font-semibold uppercase tracking-[0.24em] text-white/45'>Quick links</p>
                            <div className='mt-4 flex flex-col gap-y-3 text-sm text-white/78'>
                                {quickLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className='transition-colors duration-150 hover:text-secondary'
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className='text-sm font-semibold uppercase tracking-[0.24em] text-white/45'>Company</p>
                            <div className='mt-4 flex flex-col gap-y-3 text-sm text-white/78'>
                                {companyLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className='transition-colors duration-150 hover:text-secondary'
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className='text-sm font-semibold uppercase tracking-[0.24em] text-white/45'>Social</p>
                            <div className='mt-4 flex flex-col gap-y-3 text-sm text-white/78'>
                                {socialLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className='transition-colors duration-150 hover:text-secondary'
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.22em] text-white/42 sm:flex-row sm:items-center sm:justify-between'>
                        <p>Sellora 2026</p>
                        <p>Placeholder footer links ready for your final content</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
