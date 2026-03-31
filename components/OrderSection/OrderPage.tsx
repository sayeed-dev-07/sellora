'use client'
import { dataType } from '@/app/order/[slug]/page';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

type CustomerInfo = {
    firstName: string;
    lastName: string;
    companyName: string;
    postalCode: string;
    address: string;
    phoneNumber: string;
    email: string;
    requests: string;
    agreedToPrivacy: boolean;
}

type OrderSelection = {
    product: string;
    type: string;
    size: string;
    quantity: number;
    color: string;
}

type SubmittedOrder = {
    order: OrderSelection;
    customer: CustomerInfo;
}

const getInitialCustomerInfo = (): CustomerInfo => ({
    firstName: '',
    lastName: '',
    companyName: '',
    postalCode: '',
    address: '',
    phoneNumber: '',
    email: '',
    requests: '',
    agreedToPrivacy: false,
})

const getInitialFormData = (data: dataType): OrderSelection => ({
    product: data.name,
    type: data.types[0].name,
    size: data.size[0],
    quantity: 1,
    color: 'default',
})

const OrderPage = ({ data }: { data: dataType }) => {
    const [formData, setFormData] = useState<OrderSelection>(() => getInitialFormData(data))
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => getInitialCustomerInfo())
    const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupOverlayRef = useRef<HTMLDivElement>(null)
    const popupCardRef = useRef<HTMLDivElement>(null)
    const ColorArr = [
        { id: 1, name: "White", code: "#FFFFFF" },
        { id: 2, name: "Black", code: "#000000" },
        { id: 3, name: "Red", code: "#E41E1E" },
        { id: 4, name: "Green", code: "#118C4F" },
        { id: 5, name: "Blue", code: "#165C9C" },
        { id: 6, name: "Yellow", code: "#F2E55C" },
        { id: 7, name: "Pink", code: "#D97BA3" },
        { id: 8, name: "Orange", code: "#F2992E" },
        { id: 9, name: "Purple", code: "#6A3D9A" },
        { id: 10, name: "Gray", code: "#8A8A8A" },
        { id: 11, name: "default", code: "transparent" }
    ];

    const updateCustomerInfo = <K extends keyof CustomerInfo,>(key: K, value: CustomerInfo[K]) => {
        setCustomerInfo(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const inputClassName = 'h-11 w-full rounded-sm border border-black/20 px-3 text-sm outline-none transition focus:border-black'
    const labelClassName = 'block text-sm font-semibold'

    useGSAP(() => {
        if (!isPopupOpen || !popupOverlayRef.current || !popupCardRef.current) return;

        const overlay = popupOverlayRef.current
        const card = popupCardRef.current

        gsap.set(overlay, { autoAlpha: 0 })
        gsap.set(card, { autoAlpha: 0, y: 28, scale: 0.96 })

        const timeline = gsap.timeline()
        timeline.to(overlay, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
        timeline.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }, '-=0.05')

        return () => {
            timeline.kill()
        }
    }, [isPopupOpen])

    useEffect(() => {
        if (!isPopupOpen) return;

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isPopupOpen])

    const closePopup = () => {
        if (!popupOverlayRef.current || !popupCardRef.current) {
            setIsPopupOpen(false)
            setSubmittedOrder(null)
            return
        }

        const overlay = popupOverlayRef.current
        const card = popupCardRef.current

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsPopupOpen(false)
                setSubmittedOrder(null)
            }
        })

        timeline.to(card, { autoAlpha: 0, y: 20, scale: 0.97, duration: 0.22, ease: 'power2.in' })
        timeline.to(overlay, { autoAlpha: 0, duration: 0.18, ease: 'power2.out' }, 0)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setSubmittedOrder({
            order: { ...formData },
            customer: { ...customerInfo },
        })
        setIsPopupOpen(true)
        setFormData(getInitialFormData(data))
        setCustomerInfo(getInitialCustomerInfo())
    }

    return (
        <>
            <div className='px-2 py-[5%] max-w-[1200px] mx-auto font-noto flex flex-col sm:gap-10 lg:flex-row lg:items-start lg:justify-between'>
                <div className='flex flex-col gap-y-3 flex-1'>
                <h2 className='text-4xl font-bold'>Order Form</h2>
                <p>Select the specifications of the product you want and request a quote in as little as one minute.
                    Specifications that are not on the site, or questions or consultations <Link href="/contact" className='text-[#757575] underline font-bold'>Contact Form</Link>. Please feel free to contact us more.</p>

                {/* from  */}
                <div className='sm:py-12 py-5 flex flex-col gap-y-6 sm:gap-y-12'>
                    {/* step 1 */}
                    <div>
                        <div className='flex flex-col items-start gap-y-3 sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-0'>
                            <div className='px-3 py-1 font-semibold border rounded-sm w-fit h-auto bg-secondary text-nowrap'>STEP 1</div>
                            <p className='text-2xl font-semibold '>Choose your product, type, and size</p>
                        </div>
                        <div className='text-lg capitalize flex flex-col gap-y-2'>
                            <h2 className='mt-3'><span className='font-semibold'>Product</span> : {formData.product}</h2>
                            <div>
                                <p className=''><span className='font-semibold'>type:</span> {formData.type}</p>
                            </div>

                            {/* type  */}
                            <div className='flex gap-x-2 mt-5'>
                                {
                                    data.types.map((item, indx) => {
                                        return <div key={indx} className={`relative w-[100px] h-[100px] ${formData.type === item.name ? 'border-2 border-primary' : 'border'} rounded-lg p-1 cursor-pointer`} onClick={() => setFormData({ ...formData, type: item.name })}>
                                            <Image src={item.imgLink} sizes='100vw' fill alt={data.name} className='rounded-lg object-contain' />
                                        </div>
                                    })
                                }
                            </div>

                            {/* sizee  */}
                            <div className='flex flex-col gap-y-3 mt-4'>
                                <p className=''>
                                    <span className='font-semibold '>Size: </span>
                                    {formData.size} size
                                </p>
                                <div className='flex gap-x-2'>
                                    {
                                        data.size.map((item, index) => {
                                            return <div onClick={() => setFormData({ ...formData, size: item })} className={`px-6 ${formData.size === item ? 'border-2' : 'border'} max-w-[140px] w-full text-center cursor-pointer`} key={index}>
                                                {item}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* step 2  */}
                    <div>
                        <div className='flex flex-col items-start gap-y-3 sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-0'>
                            <div className='px-3 py-1 font-semibold border rounded-sm w-fit bg-secondary text-nowrap '>STEP 2</div>
                            <p className='text-2xl font-semibold'>Choose a print color</p>
                        </div>
                        <div className='py-6 flex gap-3 flex-wrap'>
                            {
                                ColorArr.map(item => {
                                    return <div key={item.id} className='w-fit'>
                                        <div
                                            onClick={() => setFormData({ ...formData, color: item.name })}
                                            style={{ backgroundColor: item.code }}
                                            className={`relative w-[135px] ${formData.color === item.name ? 'border-3 border-black' : 'border border-slate-400'} cursor-pointer h-[40px] overflow-hidden`}
                                        >
                                            {item.name === 'default' && (
                                                <svg
                                                    viewBox="0 0 135 40"
                                                    className='absolute inset-0 h-full w-full'
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                >
                                                    <line x1="0" y1="0" x2="135" y2="40" stroke="#6B7280" strokeWidth="1.5" />
                                                    <line x1="0" y1="40" x2="135" y2="0" stroke="#6B7280" strokeWidth="1.5" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className='capitalize text-center'>{item.name}</p>
                                    </div>
                                })
                            }

                        </div>

                    </div>

                    {/* step 3 */}
                    <div>
                        <div className='flex flex-col items-start gap-y-3 sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-0'>
                            <div className='px-3 py-1 font-semibold border rounded-sm w-fit bg-secondary text-nowrap'>STEP 3</div>
                            <p className='text-2xl font-semibold'>Enter quantity</p>
                        </div>
                        <div className='pt-6 text-xl flex items-center  gap-3 flex-wrap'>
                            <input onChange={(e) => {
                                let val = Number(e.target.value);

                                if (val > 100) val = 100;
                                if (val < 1) val = 1;

                                setFormData({
                                    ...formData,
                                    quantity: val
                                });
                            }} max={100} min={1} className='outline-none max-w-[250px] py-0.5  w-full border rounded-sm  text-end
                            ' type="number" value={formData.quantity} />
                            <p>pcs</p>
                        </div>
                        <p className='text-xs'><span className='font-semibold'>Note:</span> max 100 pcs and min 1 to order</p>

                    </div>

                    {/* step 4  */}
                    <div>
                        <div className='flex flex-col items-start gap-y-3 sm:flex-row sm:items-center sm:gap-x-6 sm:gap-y-0'>
                            <div className='px-3 py-1 font-semibold border rounded-sm w-fit bg-secondary text-nowrap'>STEP 4</div>
                            <p className='text-2xl font-semibold'>Enter your customer information</p>
                        </div>

                        <form className='pt-6 max-w-[620px]' onSubmit={handleSubmit}>
                            <p className='max-w-[620px] text-[15px] leading-7'>
                                Please check the specifications you have selected and enter your customer information below.
                                After sending, we will provide a more detailed quote and information about the next step within one business day.
                            </p>

                            <div className='mt-8 flex flex-col gap-y-5'>
                                <div className='flex flex-col gap-y-2'>
                                    <label className={labelClassName}>Name</label>
                                    <div className='grid gap-3 sm:grid-cols-2'>
                                        <input
                                            type="text"
                                            placeholder='First name'
                                            className={inputClassName}
                                            value={customerInfo.firstName}
                                            onChange={(event) => updateCustomerInfo('firstName', event.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder='Last name'
                                            className={inputClassName}
                                            value={customerInfo.lastName}
                                            onChange={(event) => updateCustomerInfo('lastName', event.target.value)}
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
                                        value={customerInfo.companyName}
                                        onChange={(event) => updateCustomerInfo('companyName', event.target.value)}
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
                                            value={customerInfo.postalCode}
                                            onChange={(event) => updateCustomerInfo('postalCode', event.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder='Street address'
                                            className={inputClassName}
                                            value={customerInfo.address}
                                            onChange={(event) => updateCustomerInfo('address', event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-y-2'>
                                    <label className={labelClassName}>Phone number</label>
                                    <input
                                        type="tel"
                                        inputMode='tel'
                                        placeholder='000-0000-0000'
                                        className={inputClassName}
                                        value={customerInfo.phoneNumber}
                                        onChange={(event) => updateCustomerInfo('phoneNumber', event.target.value)}
                                        required
                                    />
                                </div>

                                <div className='flex flex-col gap-y-2'>
                                    <label className={labelClassName}>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder='example@example.com'
                                        className={inputClassName}
                                        value={customerInfo.email}
                                        onChange={(event) => updateCustomerInfo('email', event.target.value)}
                                        required
                                    />
                                </div>

                                <div className='flex flex-col gap-y-2'>
                                    <label className={labelClassName}>
                                        Other requests and questions <span className='ml-2 text-xs font-normal text-black/50'>Optional</span>
                                    </label>
                                    <textarea
                                        placeholder='Please enter the product specifications, color, design, or anything else you would like us to know.'
                                        className='min-h-[140px] w-full rounded-sm border border-black/20 px-3 py-3 text-sm outline-none transition focus:border-black'
                                        value={customerInfo.requests}
                                        onChange={(event) => updateCustomerInfo('requests', event.target.value)}
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
                                        checked={customerInfo.agreedToPrivacy}
                                        onChange={(event) => updateCustomerInfo('agreedToPrivacy', event.target.checked)}
                                        className='h-4 w-4 accent-black'
                                    />
                                    <span>I agree with the above</span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!customerInfo.agreedToPrivacy}
                                    className='mt-2 h-14 w-full max-w-[220px] rounded-sm bg-black cursor-pointer text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40'
                                >
                                    Send
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className='w-full lg:max-w-[250px] lg:sticky lg:top-8'>
                <p className='text-xl font-semibold'>Specification under selection</p>
                <div className='w-full border rounded-lg p-4 mt-4'>
                    {
                        Object.entries(formData).map(([key, value]) => (
                            <div key={key} className='border-b  py-2 last:border-0'>
                                <p className='text-sm font-bold uppercase'>{key}</p>
                                <p className='py-2 text-lg'>{value}</p>
                            </div>
                        ))

                    }
                </div>
            </div>
            </div>

            {isPopupOpen && submittedOrder && (
                <div
                    ref={popupOverlayRef}
                    className='fixed  inset-0 z-999 flex items-center justify-center bg-black/55 p-4'
                    onClick={closePopup}
                >
                    <div
                        ref={popupCardRef}
                        className='w-full max-w-3xl rounded-2xl max-h-[90vh] overflow-y-auto bg-white p-6 text-black shadow-2xl sm:p-8'
                        onClick={(event) => event.stopPropagation()}
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='order-confirmation-title'
                    >
                        <div className='flex items-start justify-between gap-4'>
                            <div>
                                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-black/45'>Order submitted</p>
                                <h3 id='order-confirmation-title' className='mt-2 text-3xl font-bold'>
                                    Your order info has been saved
                                </h3>
                                <p className='mt-3 max-w-2xl text-sm leading-6 text-black/70'>
                                    Here is a snapshot of the details you submitted. The form behind this popup has already been reset so you can start a new order right away.
                                </p>
                            </div>

                            <button
                                type='button'
                                onClick={closePopup}
                                className='rounded-full cursor-pointer border border-black/15 p-2 text-xl transition hover:bg-black hover:text-white'
                                aria-label='Close confirmation popup'
                            >
                                <IoClose />
                            </button>
                        </div>

                        <div className='mt-8 grid gap-6 lg:grid-cols-2'>
                            <div className='rounded-2xl bg-black/[0.03] p-5'>
                                <p className='text-sm font-semibold uppercase tracking-[0.18em] text-black/45'>Ordered info</p>
                                <div className='mt-4 space-y-3 text-sm'>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Product</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.order.product}</p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Type</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.order.type}</p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Size</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.order.size}</p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Color</p>
                                        <p className='mt-1 text-black/70 capitalize'>{submittedOrder.order.color}</p>
                                    </div>
                                    <div>
                                        <p className='font-semibold'>Quantity</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.order.quantity} pcs</p>
                                    </div>
                                </div>
                            </div>

                            <div className='rounded-2xl bg-black/[0.03] p-5'>
                                <p className='text-sm font-semibold uppercase tracking-[0.18em] text-black/45'>Customer info</p>
                                <div className='mt-4 space-y-3 text-sm'>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Name</p>
                                        <p className='mt-1 text-black/70'>
                                            {[submittedOrder.customer.firstName, submittedOrder.customer.lastName].filter(Boolean).join(' ')}
                                        </p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Company</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.customer.companyName || 'Not provided'}</p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Address</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.customer.postalCode}</p>
                                        <p className='text-black/70'>{submittedOrder.customer.address}</p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Phone number</p>
                                        <p className='mt-1 text-black/70'>{submittedOrder.customer.phoneNumber}</p>
                                    </div>
                                    <div className='border-b border-black/10 pb-3'>
                                        <p className='font-semibold'>Email</p>
                                        <p className='mt-1 text-black/70 break-all'>{submittedOrder.customer.email}</p>
                                    </div>
                                    <div>
                                        <p className='font-semibold'>Requests</p>
                                        <p className='mt-1 text-black/70 whitespace-pre-line'>{submittedOrder.customer.requests || 'No additional requests'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8 flex flex-wrap gap-3'>
                            <button
                                type='button'
                                onClick={closePopup}
                                className='min-w-[180px] rounded-sm bg-black px-6 py-3 text-sm font-semibold cursor-pointer text-white transition hover:bg-black/85'
                            >
                                Close popup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderPage;
