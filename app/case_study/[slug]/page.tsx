import React from 'react';

const page = async ({ params }: { params: Promise<{ slug: string }>}) => {

    const {slug} = await params;
    return (
        <div>
            hello from  {slug}
        </div>
    );
};

export default page;