'use client'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP)

const ContactPage = () => {
    type contactFormProp = {
        firstName: string;
        secondName: string;
        company: string;
        address: string;
        street: string;
        number: string;
        email: string;
        request: string;
        checked: boolean;
    }
    const contactFormData: contactFormProp = {
        firstName: '',
        secondName: '',
        company: '',
        address: '',
        street: '',
        number: '',
        email: '',
        request: '',
        checked: false
    }
    const [contactData, setContactData] = useState(contactFormData)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalOverlayRef = useRef<HTMLDivElement | null>(null)
    const modalCardRef = useRef<HTMLDivElement | null>(null)
    const modalTimelineRef = useRef<gsap.core.Timeline | null>(null)

    function updateCustomerInfo<K extends keyof contactFormProp,>(key: K, value: contactFormProp[K]) {
        setContactData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const inputClassName = 'h-11 w-full rounded-sm border border-black/20 px-3 text-sm outline-none transition focus:border-black'
    const labelClassName = 'block text-sm font-semibold'

    const killModalTimeline = () => {
        modalTimelineRef.current?.kill()
        modalTimelineRef.current = null
    }

    const closeModal = () => {
        if (!modalOverlayRef.current || !modalCardRef.current) {
            setIsModalOpen(false)
            return
        }

        killModalTimeline()

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsModalOpen(false)
                modalTimelineRef.current = null
            }
        })

        modalTimelineRef.current = timeline
        timeline.to(modalCardRef.current, {
            autoAlpha: 0,
            y: 20,
            scale: 0.97,
            duration: 0.22,
            ease: 'power2.in'
        })
        timeline.to(modalOverlayRef.current, {
            autoAlpha: 0,
            duration: 0.18,
            ease: 'power2.out'
        }, 0)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setContactData(contactFormData)
        setIsModalOpen(true)
    }

    useGSAP(() => {
        if (!isModalOpen || !modalOverlayRef.current || !modalCardRef.current) return;

        killModalTimeline()

        gsap.set(modalOverlayRef.current, { autoAlpha: 0 })
        gsap.set(modalCardRef.current, { autoAlpha: 0, y: 28, scale: 0.96 })

        const timeline = gsap.timeline()
        modalTimelineRef.current = timeline

        timeline.to(modalOverlayRef.current, {
            autoAlpha: 1,
            duration: 0.2,
            ease: 'power2.out'
        })
        timeline.to(modalCardRef.current, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power3.out'
        }, '-=0.05')

        return () => {
            timeline.kill()

            if (modalTimelineRef.current === timeline) {
                modalTimelineRef.current = null
            }
        }
    }, [isModalOpen])

    useEffect(() => {
        if (!isModalOpen) return;

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isModalOpen])

    useEffect(() => {
        return () => {
            killModalTimeline()
        }
    }, [])

    return (
        <div className='py-[5%] max-w-[620px] mx-auto px-2 relative'>
            <h2 className='text-start text-4xl font-semibold '>Contact Form</h2>
            <form onSubmit={handleSubmit} className='pt-6'>
                <p className='max-w-[620px] text-xl leading-7'>
                    Please feel free to contact us with any questions or concerns.
                </p>

                <div className='mt-8 flex flex-col gap-y-5'>
                    <div className='flex flex-col gap-y-2'>
                        <label className={labelClassName}>Name</label>
                        <div className='grid gap-3 sm:grid-cols-2'>
                            <input
                                type="text"
                                placeholder='First name'
                                className={inputClassName}
                                value={contactData.firstName}
                                onChange={(e) => updateCustomerInfo('firstName', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder='Last name'
                                className={inputClassName}
                                value={contactData.secondName}
                                onChange={(e) => updateCustomerInfo('secondName', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className={labelClassName}>
                            Company/organization name <span className='ml-2 text-xs font-normal text-black/50'>Optional</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Company or organization'
                            className={inputClassName}
                            value={contactData.company}
                            onChange={(e) => updateCustomerInfo('company', e.target.value)}

                        />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className={labelClassName}>Address</label>
                        <div className='grid gap-3'>
                            <input
                                type="text"
                                inputMode='numeric'
                                placeholder='000-0000'
                                className={inputClassName}
                                value={contactData.address}
                                onChange={(e) => updateCustomerInfo('address', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder='Street address'
                                className={inputClassName}
                                required
                                value={contactData.street}
                                onChange={(e) => updateCustomerInfo('street', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className={labelClassName}>Phone number</label>
                        <input
                            type="tel"
                            inputMode='tel'
                            onChange={(e) => updateCustomerInfo('number', e.target.value)}
                            placeholder='000-0000-0000'
                            className={inputClassName}
                            value={contactData.number}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className={labelClassName}>Email Address</label>
                        <input
                            type="email"
                            placeholder='example@example.com'
                            className={inputClassName}
                            value={contactData.email}
                            onChange={(e) => updateCustomerInfo('email', e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className={labelClassName}>
                            Other requests and questions <span className='ml-2 text-xs font-normal text-black/50'>Optional</span>
                        </label>
                        <textarea
                            placeholder='Please enter the product specifications, color, design, or anything else you would like us to know.'
                            value={contactData.request}
                            onChange={(e) => updateCustomerInfo('request', e.target.value)}
                            className='min-h-[140px] w-full rounded-sm border border-black/20 px-3 py-3 text-sm outline-none transition focus:border-black'

                        />
                    </div>

                    <div className='bg-black/[0.04] px-5 py-6 text-sm leading-7'>
                        <p className='font-semibold'>Regarding the handling of personal information</p>
                        <p>
                            The information you enter will only be used to prepare your quotation and respond to your inquiry.
                            We will properly manage and protect your personal information.
                        </p>
                    </div>

                    <label className='flex items-center gap-x-2 text-sm font-medium'>
                        <input
                            type="checkbox"
                            checked={contactData.checked}
                            onChange={() =>
                                updateCustomerInfo('checked', !contactData.checked)
                            }
                            className='h-4 w-4 accent-black'
                        />
                        <span>I agree with the above</span>
                    </label>

                    <button
                        type="submit"
                        disabled={!contactData.checked}
                        className='mt-2 h-14 w-full max-w-[220px] rounded-sm bg-black cursor-pointer text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40'
                    >
                        Send
                    </button>
                </div>
            </form>

            {isModalOpen && (
                <div
                    ref={modalOverlayRef}
                    className='fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4'
                    onClick={closeModal}
                >
                    <div
                        ref={modalCardRef}
                        className='flex w-full max-w-[450px] flex-col items-center justify-center gap-y-6 rounded-sm border bg-secondary px-4 py-10 text-center'
                        onClick={(event) => event.stopPropagation()}
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='contact-thanks-title'
                    >
                        <p id='contact-thanks-title' className='text-3xl font-semibold capitalize sm:text-4xl'>
                            Thanks for contacting us
                        </p>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='cursor-pointer rounded-sm border bg-foreground px-6 py-1.5 text-xl'
                        >
                            close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactPage;
