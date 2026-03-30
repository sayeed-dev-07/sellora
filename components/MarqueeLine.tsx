"use client"; // Required for Next.js App Router when using hooks and GSAP

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP)

const marqueeData = [
  { id: 1, name: 'Premium Jackets', img: '/products/jacket-bg.png' },
  { id: 2, name: 'Durable Gloves', img: '/products/gloves.png' },
  { id: 3, name: 'Stylish Shirts', img: '/products/shirt-bg.png' },
  { id: 4, name: 'Comfortable Shoes', img: '/products/shoe-bg.png' },
];

export default function MarqueeLine() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".marquee-track", {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      force3D: true,
      ease: 'none'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden w-full relative border-y my-[5%]">
      
      <div className="marquee-track flex w-max">
        {[...marqueeData, ...marqueeData].map((item, index) => {
          return (
            
            <div key={`${item.id}-${index}`} className="flex items-center mr-12 shrink-0">
              <div className="sm:w-[100px] w-[50px] relative aspect-square">
                <Image
                  src={item.img}
                  sizes="20vw"
                  fill
                  alt={item.name}
                  className="object-contain"
                />
              </div>
              <h1 className="font-outfit  text-foreground sm:text-4xl font-bold text-xl mt-0.5 sm:ml-4 tracking-wide uppercase 
                [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                  {item.name}
                </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
