import type { Metadata } from "next";
import React from 'react';
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Page Not Found",
    description: "The page you requested could not be found on Sellora.",
    noIndex: true,
});

const page = () => {
    return (
        <div className='h-[90vh] w-full bg-foreground text-background flex items-center justify-center'>
            <p className='text-3xl'>The Page You are looking for is not found</p>
        </div>
    );
};

export default page;
