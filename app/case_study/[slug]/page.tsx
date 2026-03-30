import type { Metadata } from "next";
import { productData } from '@/public/data/productData';
import ProductImageSlider from '@/components/CaseStudy/ProductImageSlider';
import Image from 'next/image';
import Line from '@/components/CaseStudy/line';
import { MdShoppingCart } from 'react-icons/md';
import Link from 'next/link';
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { notFound } from "next/navigation";

function getCaseStudy(slug: string) {
    return productData.find((item) => item.slug === slug);
}

function formatList(items: string[], limit = 3) {
    const uniqueItems = [...new Set(items.filter(Boolean))];

    if (uniqueItems.length <= limit) {
        return uniqueItems.join(", ");
    }

    return `${uniqueItems.slice(0, limit).join(", ")}, and more`;
}

function getCaseStudyDescription(data: (typeof productData)[number]) {
    return `Explore how ${data.name} used Sellora for ${formatList(data.type).toLowerCase()} in ${formatList(data.color)} with ${data.print.toLowerCase()} customization.`;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const data = getCaseStudy(slug);

    if (!data) {
        return createPageMetadata({
            title: "Case Study Not Found",
            description: "The case study you requested could not be found on Sellora.",
            path: `/case_study/${slug}`,
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: `${data.name} Case Study`,
        description: getCaseStudyDescription(data),
        path: `/case_study/${data.slug}`,
        image: data.productImg[0] ?? data.bgUrl ?? siteConfig.defaultImage,
        keywords: [data.name, ...data.tag, ...data.type, ...data.color, ...data.size],
        type: "article",
    });
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;
    const data = getCaseStudy(slug)

    if (!data) {
        notFound();
    }
    return (
        <div className='mt-12 '>

            <div className={`min-h-screen border-t relative w-full bg-secondary text-background`}>

                {/* top block  */}
                <div className='absolute -top-6.5 md:-top-9 left-0'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={527}
                        height={36}
                        viewBox="0 0 527 36"
                        fill="none"
                        version="1.1"
                        className='w-2/3 max-w-131.75 md:w-full'
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <mask
                            id="mask0_750_110"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x={-1}
                            y={0}
                            width={509}
                            height={36}
                        >
                            <path d="M-1 0H508V36H-1V0Z" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_750_110)">
                            <mask id="path-2-inside-1_750_110" fill="white">
                                <path d="M-1 0H496C502.627 0 508 5.37258 508 12V100.941H-1V0Z" />
                            </mask>
                            <path
                                d="M-1 0H496C502.620 0 508 5.37258 508 12V100.941H-1V0Z"
                                fill="#FFF462"
                            />
                            <path
                                d="M-1 0V-1H-2V0H-1ZM508 100.941V101.941H509V100.941H508ZM-1 100.941H-2V101.941H-1V100.941ZM-1 1H496V-1H-1V1ZM507 12V100.941H509V12H507ZM508 99.9412H-1V101.941H508V99.9412ZM0 100.941V0H-2V100.941H0ZM496 1C502.075 1 507 5.92487 507 12H509C509 4.8203 503.18 -1 496 -1V1Z"
                                fill="black"
                                mask="url(#path-2-inside-1_750_110)"
                            />
                        </g>
                        <mask id="path-5-inside-2_750_110" fill="white">
                            <path d="M507 16H527V36H519C512.373 36 507 30.6274 507 24V16Z" />
                        </mask>
                    </svg>


                </div>

                {/* title goes here  */}

                <div className='w-full flex items-center justify-between flex-col border-b sm:flex-row sm:px-4 md:px-12 px-2 py-4'>
                    <div className='w-full -mt-6 sm:w-fit'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={405}
                            height={54}
                            viewBox="0 0 405 54"
                            fill="none"
                            className='md:h-[50px] w-fit relative z-60 h-[24px] sm:h-[36px]'
                        >
                            <g clipPath="url(#clip0_432_329)">
                                <path
                                    d="M42.0017 47.9931C42.2251 48.5091 41.9247 49.0251 41.3394 49.3254C37.0499 51.99 31.2818 53.6149 25.814 53.6149C10.589 53.6149 0.385071 42.9643 0.385071 27C0.385071 11.0356 10.589 0.38501 25.814 0.38501C31.2818 0.38501 37.0499 2.00994 41.3394 4.67451C41.9324 4.96715 42.2251 5.49083 42.0017 6.0068L37.1192 16.28C36.8266 16.9423 36.3029 17.1657 35.7176 16.873C32.9838 15.3174 30.3192 14.8014 27.1386 14.8014C20.4849 14.8014 16.0491 19.6839 16.0491 27C16.0491 34.316 20.4849 39.1985 27.1386 39.1985C30.3192 39.1985 32.9761 38.6825 35.7176 37.1269C36.3106 36.8342 36.8266 37.0499 37.1192 37.7199L42.0017 47.9931Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M95.0082 51.5432C95.2316 51.9899 94.9312 52.5059 94.346 52.5059H79.7062C79.0439 52.5059 78.4509 52.1362 78.1506 51.5432L75.9327 43.7805H62.0322L59.8143 51.5432C59.5217 52.1362 58.9287 52.5059 58.2587 52.5059H43.6189C43.0259 52.5059 42.7333 51.9899 42.9566 51.5432L59.6757 2.45653C59.899 2.00987 60.7076 1.4939 61.4469 1.4939H76.5256C77.265 1.4939 78.0813 2.00987 78.2969 2.45653L95.0005 51.5432H95.0082ZM68.9863 19.1679L64.9971 33.2147H72.9831L68.994 19.1679H68.9863Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M100.738 36.9806C100.961 36.2413 101.477 36.0179 102.07 36.3876C105.474 38.3128 109.54 39.7144 112.343 39.9378C114.708 39.9378 116.263 38.8288 116.263 37.1269C116.263 32.7681 95.4934 32.9837 95.4934 16.873C95.4934 6.96944 102.963 0.38501 114.199 0.38501C119.451 0.38501 126.105 2.52591 130.757 5.70646C131.35 6.07611 131.573 6.66909 131.35 7.03875L126.69 17.466C126.467 18.2053 125.951 18.4286 125.358 18.059C121.739 15.9874 117.519 14.4395 114.931 14.2162C112.636 14.2162 111.157 15.2481 111.157 16.8807C111.157 21.2395 132.081 20.9469 132.081 37.2116C132.081 47.0459 124.465 53.6226 113.083 53.6226C106.876 53.6226 100.368 51.6973 96.6717 48.7401C96.0787 48.2935 95.8554 47.7775 96.0787 47.4078L100.738 36.9806Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M172.296 39.1984C172.889 39.1984 173.405 39.6451 173.405 40.161V51.4739C173.405 51.9899 172.889 52.5059 172.296 52.5059H137.919C137.403 52.5059 136.887 51.9129 136.733 51.3969V2.52584C136.733 1.86355 137.102 1.4939 137.765 1.4939H171.403C172.065 1.4939 172.589 2.00987 172.589 2.52584V13.6847C172.589 14.347 172.073 14.7937 171.403 14.7937H152.112V20.6311H167.783C168.446 20.6311 168.815 21.1471 168.746 21.5937L167.714 31.944C167.637 32.3906 167.121 32.9066 166.459 32.9066H152.119V39.1907H172.304L172.296 39.1984Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M191.226 36.9806C191.449 36.2413 191.965 36.0179 192.558 36.3876C195.962 38.3128 200.028 39.7144 202.831 39.9378C205.195 39.9378 206.751 38.8288 206.751 37.1269C206.751 32.7681 185.981 32.9837 185.981 16.873C185.981 6.96944 193.451 0.38501 204.687 0.38501C209.939 0.38501 216.593 2.52591 221.244 5.70646C221.837 6.07611 222.061 6.66909 221.837 7.03875L217.178 17.466C216.955 18.2053 216.439 18.4286 215.846 18.059C212.226 15.9874 208.006 14.4395 205.419 14.2162C203.124 14.2162 201.645 15.2481 201.645 16.8807C201.645 21.2395 222.569 20.9469 222.569 37.2116C222.569 47.0459 214.953 53.6226 203.57 53.6226C197.363 53.6226 190.856 51.6973 187.159 48.7401C186.566 48.2935 186.343 47.7775 186.566 47.4078L191.226 36.9806Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M264.671 1.4939C265.333 1.4939 265.78 2.00987 265.703 2.52584L264.594 13.7617C264.517 14.3547 263.932 14.7937 263.408 14.7937H252.395V51.4585C252.395 51.9745 251.949 52.4905 251.363 52.4905H238.279C237.686 52.4905 237.17 51.9745 237.17 51.4585V14.8014H224.895C224.379 14.8014 223.863 14.3547 223.863 13.7694V2.60285C223.863 2.00987 224.379 1.4939 224.895 1.4939H264.663H264.671Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M307.289 1.4939C308.028 1.4939 308.544 2.08688 308.544 2.74917V33.5766C308.544 46.6608 301.521 53.5378 288.144 53.5378C274.767 53.5378 267.89 46.6608 267.744 33.5766V2.74917C267.744 2.08688 268.337 1.4939 268.999 1.4939H281.713C282.453 1.4939 282.969 2.08688 282.969 2.74917V34.9089C282.969 38.3128 284.894 40.3074 288.144 40.3074C291.394 40.3074 293.319 38.3128 293.319 34.9859V2.74917C293.319 2.08688 293.912 1.4939 294.574 1.4939H307.289Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M333.003 1.4939C348.674 1.4939 359.102 11.6208 359.102 26.9999C359.102 42.3789 348.674 52.5059 333.003 52.5059H315.852C315.336 52.5059 314.82 51.9899 314.82 51.3969V2.60285C314.82 2.00987 315.336 1.4939 315.852 1.4939H333.003ZM333.888 39.1984C339.579 39.1984 343.422 34.3159 343.422 26.9999C343.422 19.6839 339.579 14.8014 333.888 14.8014H330.045V39.1984H333.888Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M402.951 1.4939C403.614 1.4939 404.137 2.00987 403.768 2.67986L387.434 32.1057V51.4739C387.434 51.9899 386.918 52.5059 386.325 52.5059H373.31C372.717 52.5059 372.201 51.9899 372.201 51.4739V32.1057L355.867 2.67986C355.497 2.01757 356.013 1.4939 356.683 1.4939H372.062C372.802 1.4939 373.464 2.00987 373.764 2.67986L379.825 15.9873L385.886 2.67986C386.179 2.01757 386.849 1.4939 387.588 1.4939H402.967H402.951Z"
                                    fill="white"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_432_329">
                                    <rect width="404.276" height={54} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <p className='w-full text-xl font-semibold sm:text-2xl sm:w-fit text-end'>Use cases</p>
                </div>


                {/* main card div  */}

                <div className='max-w-7xl px-1 sm:px-2 md:px-6 mx-auto mt-24 flex-col lg:flex-row w-full flex items-start pb-24'>
                    {/* left side div  */}
                    <div className='flex-2   overflow-hidden bg-foreground lg:border lg:rounded-br-xl
                     lg:rounded-l-xl border-t border-l border-r rounded-t-xl lg:rounded-t-none h-auto'>
                        <div className='relative w-full aspect-6/4'>
                            <Image src={data?.bgUrl} alt={data?.name} fill sizes='100vw' />
                        </div>

                        {/* text section  */}

                        <div className='px-[5%]'>

                            <div className='flex items-start justify-between my-6 gap-x-12'>
                                {/* title section  */}
                                <p className='text-2xl sm:text-3xl font-semibold font-noto'>{data.title}</p>
                                <div className='border py-1 px-1.5 bg-secondary rounded-sm text-sm sm:text-lg w-fit'>{data.tag}</div>
                            </div>

                            <div className='flex flex-col sm:gap-y-6 gap-y-3 text-lg sm:text-xl mb-12'>
                                <p>{data.description[0]}</p>
                                <p>{data.description[1]}</p>
                            </div>


                            {/* contact box  */}

                            <div className='bg-[#eeeeee] text-background p-4 sm:p-6 mb-12 flex flex-col gap-y-2.5 sm:gap-y-4 rounded-lg'>
                                <p className='text-xl font-semibold'>{data.name}</p>
                                <p>{data.linkText}</p>
                                <a className='w-fit font-semibold   break-all text-[#757575]' href={data.link} target="_blank" rel="noopener noreferrer">
                                    @{data.link}
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* right side div  */}
                    <div className='lg:border-t lg:border-r lg:border-b lg:rounded-r-xl border-r border-b border-l lg:border-l-0 rounded-br-xl flex-1  h-auto bg-foreground rounded-bl-xl lg:rounded-bl-none  w-full'>

                        {/* img slider  */}
                        <div className='p-8'>
                            <ProductImageSlider images={data.productImg} alt={data.name} autoPlayInterval={5000} />
                        </div>


                        {/* product details section  */}
                        <div>
                            <div className='grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] items-start gap-x-4 px-8 mt-6 mb-4'>
                                <span className='font-semibold text-lg'>Product</span>
                                <div className='text-left'>
                                    {data.type.map((item, i) => (
                                        <p key={i}>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <Line />
                            <div className='grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] items-start gap-x-4 px-8 mt-6 mb-4'>
                                <span className='font-semibold text-lg'>Color</span>
                                <div className='text-left'>
                                    {data.color.map((item, i) => (
                                        <p key={i}>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <Line />
                            <div className='grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] items-start gap-x-4 px-8 mt-6 mb-4'>
                                <span className='font-semibold text-lg'>Size</span>
                                <span className='text-left'>{data.size.join(', ')}</span>
                            </div>
                            <Line />
                            <div className='grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] items-start gap-x-4 px-8 mt-6 mb-4'>
                                <span className='font-semibold text-lg'>Printing Method</span>
                                <span className='text-left '>{data.print}</span>
                            </div>


                        </div>
                        <div className='flex items-center text-lg sm:text-xl justify-center sm:mt-8 mt-3 mb-4'>
                            <Link href={`/order/${data.slug}`} className='sm:px-5 px-4 py-1.5 sm:py-4 rounded-lg bg-secondary  border  mt-6 mb-4   uppercase text-background flex items-center gap-x-2 font-semibold cursor-pointer  w-fit'>
                                <MdShoppingCart/> get the item
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default page;
