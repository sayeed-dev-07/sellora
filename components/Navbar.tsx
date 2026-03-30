'use client'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP)

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Order', href: '/order' },
    { label: 'Products', href: '/#products' },
    { label: 'Order flow', href: '/#order-flow' },
    { label: 'Use cases', href: '/#use-cases' },
    { label: 'Contact us', href: '/contact' },
]

const menuWord = 'menu'.split('')
const closeWord = 'close'.split('')

const Navbar = () => {
    const navRef = useRef<HTMLElement | null>(null)
    const mobilePanelRef = useRef<HTMLDivElement | null>(null)
    const mobileMenuTimelineRef = useRef<gsap.core.Timeline | null>(null)
    const lastScrollYRef = useRef(0)
    const directionTravelRef = useRef(0)
    const lastDirectionRef = useRef<'up' | 'down' | null>(null)
    const isHiddenRef = useRef(false)
    const isMobileMenuOpenRef = useRef(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const showNavbar = () => {
        if (!navRef.current || !isHiddenRef.current) return;

        isHiddenRef.current = false
        gsap.to(navRef.current, {
            yPercent: 0,
            duration: 0.28,
            ease: 'power2.out',
            overwrite: 'auto'
        })
    }

    const hideNavbar = () => {
        if (!navRef.current || isHiddenRef.current || isMobileMenuOpenRef.current) return;

        isHiddenRef.current = true
        gsap.to(navRef.current, {
            yPercent: -100,
            duration: 0.28,
            ease: 'power2.out',
            overwrite: 'auto'
        })
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    useGSAP(() => {
        if (!navRef.current || !mobilePanelRef.current) return;

        gsap.set(navRef.current, { yPercent: 0 })
        gsap.set('.menu-line-top', { y: -7, transformOrigin: '50% 50%' })
        gsap.set('.menu-line-middle', { y: 0, transformOrigin: '50% 50%' })
        gsap.set('.menu-line-bottom', { y: 7, transformOrigin: '50% 50%' })
        gsap.set('.mobile-close-letter', { yPercent: 120, autoAlpha: 0 })
        gsap.set(mobilePanelRef.current, { autoAlpha: 0, y: -18, pointerEvents: 'none' })
        gsap.set('.mobile-nav-link', { y: 18, autoAlpha: 0 })

        const timeline = gsap.timeline({
            paused: true,
            onStart: () => {
                if (mobilePanelRef.current) {
                    mobilePanelRef.current.style.pointerEvents = 'auto'
                }
            },
            onReverseComplete: () => {
                if (mobilePanelRef.current) {
                    mobilePanelRef.current.style.pointerEvents = 'none'
                }
            }
        })

        timeline.to('.menu-line-top', {
            y: 0,
            rotation: 45,
            duration: 0.25,
            ease: 'power2.out'
        }, 0)
        timeline.to('.menu-line-middle', {
            autoAlpha: 0,
            scaleX: 0.25,
            duration: 0.18,
            ease: 'power2.out'
        }, 0)
        timeline.to('.menu-line-bottom', {
            y: 0,
            rotation: -45,
            duration: 0.25,
            ease: 'power2.out'
        }, 0)
        timeline.to('.mobile-menu-letter', {
            yPercent: -120,
            autoAlpha: 0,
            stagger: 0.035,
            duration: 0.2,
            ease: 'power2.inOut'
        }, 0)
        timeline.to('.mobile-close-letter', {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.035,
            duration: 0.24,
            ease: 'power2.out'
        }, 0.08)
        timeline.to(mobilePanelRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: 'power2.out'
        }, 0.06)
        timeline.to('.mobile-nav-link', {
            y: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.24,
            ease: 'power2.out'
        }, 0.12)

        mobileMenuTimelineRef.current = timeline

        return () => {
            timeline.kill()
            mobileMenuTimelineRef.current = null
        }
    }, { scope: navRef })

    useEffect(() => {
        isMobileMenuOpenRef.current = isMobileMenuOpen

        if (isMobileMenuOpen) {
            showNavbar()
            mobileMenuTimelineRef.current?.play()
            return
        }

        mobileMenuTimelineRef.current?.reverse()
    }, [isMobileMenuOpen])

    useEffect(() => {
        if (!navRef.current) return;

        const toggleThreshold = 24
        const hideAfter = 80

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const scrollDelta = currentScrollY - lastScrollYRef.current

            if (isMobileMenuOpenRef.current) {
                lastScrollYRef.current = currentScrollY
                showNavbar()
                return
            }

            if (Math.abs(scrollDelta) < 2) return;

            const direction = scrollDelta > 0 ? 'down' : 'up'

            if (lastDirectionRef.current !== direction) {
                directionTravelRef.current = 0
                lastDirectionRef.current = direction
            }

            directionTravelRef.current += Math.abs(scrollDelta)

            if (currentScrollY <= 12) {
                directionTravelRef.current = 0
                showNavbar()
            } else if (
                direction === 'down' &&
                currentScrollY > hideAfter &&
                directionTravelRef.current >= toggleThreshold
            ) {
                directionTravelRef.current = 0
                hideNavbar()
            } else if (
                direction === 'up' &&
                directionTravelRef.current >= toggleThreshold
            ) {
                directionTravelRef.current = 0
                showNavbar()
            }

            lastScrollYRef.current = currentScrollY
        }

        lastScrollYRef.current = window.scrollY

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)')

        const handleViewportChange = (event: MediaQueryListEvent) => {
            if (!event.matches) return;

            setIsMobileMenuOpen(false)
        }

        mediaQuery.addEventListener('change', handleViewportChange)

        return () => {
            mediaQuery.removeEventListener('change', handleViewportChange)
        }
    }, [])

    return (
        <header
            ref={navRef}
            className='sticky top-0 left-0 z-999 border-b border-black/5 bg-[#ffffff75] backdrop-blur-sm'
        >
            <div className='relative mx-auto flex h-[10vh] items-center justify-between px-2 py-3 sm:px-4'>
                <Link href='/' className='cursor-pointer p-3' onClick={closeMobileMenu}>
                    <Image src='/svg/icon.svg' alt='iconImg' height={140} width={140} className='h-7.5 w-fit sm:h-9 lg:h-12.5' />
                </Link>

                <nav className='hidden items-center justify-center gap-x-7 font-noto text-lg font-medium lg:flex'>
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className='transition-colors duration-150 ease-in hover:text-background/50'
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type='button'
                    aria-expanded={isMobileMenuOpen}
                    aria-controls='mobile-nav-panel'
                    aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={toggleMobileMenu}
                    className='flex cursor-pointer flex-col items-center gap-y-1.5 lg:hidden'
                >
                    <span className='relative flex h-[18px] w-7 items-center justify-center'>
                        <span className='menu-line-top absolute h-[2px] w-7 rounded-full bg-black' />
                        <span className='menu-line-middle absolute h-[2px] w-7 rounded-full bg-black' />
                        <span className='menu-line-bottom absolute h-[2px] w-7 rounded-full bg-black' />
                    </span>

                    <span className='relative flex h-4 min-w-[4.8rem] items-center justify-center overflow-hidden text-[0.65rem] font-semibold tracking-[0.28em] lowercase'>
                        <span className='absolute inset-0 flex items-center justify-center gap-[0.18em]'>
                            {menuWord.map((letter, index) => (
                                <span key={`menu-${letter}-${index}`} className='mobile-menu-letter inline-block'>
                                    {letter}
                                </span>
                            ))}
                        </span>
                        <span className='absolute inset-0 flex items-center justify-center gap-[0.18em]'>
                            {closeWord.map((letter, index) => (
                                <span key={`close-${letter}-${index}`} className='mobile-close-letter inline-block'>
                                    {letter}
                                </span>
                            ))}
                        </span>
                    </span>
                </button>

                <div
                    id='mobile-nav-panel'
                    ref={mobilePanelRef}
                    className='mobile-menu-panel absolute inset-x-0 top-full border-t border-black/10 bg-white/95 px-4 pb-6 pt-4 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden'
                >
                    <nav className='flex flex-col gap-y-2'>
                        {navItems.map((item) => (
                            <Link
                                key={`mobile-${item.label}`}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className='mobile-nav-link rounded-sm border border-black/10 px-4 py-3 font-noto text-base font-medium transition-colors duration-150 ease-in hover:bg-secondary'
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
