'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

type ProductImageSliderProps = {
  images: string[]
  alt: string
  autoPlayInterval?: number
}

const SWIPE_THRESHOLD = 60

const ProductImageSlider = ({ images, alt, autoPlayInterval = 3000 }: ProductImageSliderProps) => {
  const total = images.length
  const hasCarousel = total > 1
  const loopedImages = useMemo(() => {
    if (!hasCarousel) return images
    return [images[total - 1], ...images, images[0]]
  }, [hasCarousel, images, total])

  const [activeIndex, setActiveIndex] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startXRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const transitionLockRef = useRef(false)

  const goNext = useCallback(() => {
    if (!hasCarousel || transitionLockRef.current) return
    transitionLockRef.current = true
    setAnimate(true)
    setIsTransitioning(true)
    setActiveIndex((prev) => {
      if (prev >= total + 1) return 1
      return prev + 1
    })
  }, [hasCarousel, total])

  const goPrev = useCallback(() => {
    if (!hasCarousel || transitionLockRef.current) return
    transitionLockRef.current = true
    setAnimate(true)
    setIsTransitioning(true)
    setActiveIndex((prev) => {
      if (prev <= 0) return total
      return prev - 1
    })
  }, [hasCarousel, total])

  const onTransitionEnd = () => {
    if (!hasCarousel) return
    transitionLockRef.current = false
    setIsTransitioning(false)
    if (activeIndex === 0) {
      setAnimate(false)
      setActiveIndex(total)
    } else if (activeIndex === total + 1) {
      setAnimate(false)
      setActiveIndex(1)
    }
  }

  useEffect(() => {
    if (!hasCarousel || isPaused) return

    const timer = setInterval(() => {
      goNext()
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [hasCarousel, isPaused, autoPlayInterval, goNext])

  useEffect(() => {
    if (!hasCarousel) return
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [animate, hasCarousel])

  if (total === 0) {
    return (
      <div className="relative w-full aspect-6/4 bg-[#eeeeee] flex items-center justify-center text-background/60">
        No image
      </div>
    )
  }

  if (total === 1) {
    return (
      <div className="relative w-full aspect-6/4">
        <Image src={images[0]} alt={alt} fill className="object-contain" sizes="(min-width: 1024px) 40vw, 100vw" />
      </div>
    )
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (transitionLockRef.current) return
    draggingRef.current = true
    startXRef.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
    setAnimate(false)
    setIsPaused(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || startXRef.current === null) return
    setDragOffset(event.clientX - startXRef.current)
  }

  const finishSwipe = (deltaX: number) => {
    draggingRef.current = false
    startXRef.current = null
    setAnimate(true)
    setDragOffset(0)
    setIsPaused(false)

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
    if (deltaX < 0) goNext()
    else goPrev()
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const deltaX = startXRef.current === null ? 0 : event.clientX - startXRef.current
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    finishSwipe(deltaX)
  }

  const handlePointerCancel = () => {
    if (!draggingRef.current) return
    finishSwipe(0)
  }

  return (
    <div 
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}  // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on leave
    >
      <div className="relative w-full aspect-6/4 overflow-hidden" style={{ touchAction: 'pan-y' }}>
        <div
          className="flex h-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
            transition: animate ? 'transform 350ms ease' : 'none',
          }}
        >
          {loopedImages.map((img, idx) => (
            <div key={`${img}-${idx}`} className="relative h-full w-full flex-shrink-0">
              <Image 
                src={img} 
                alt={alt} 
                fill 
                className="object-contain pointer-events-none" 
                sizes="(min-width: 1024px) 40vw, 100vw" 
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous image"
        onClick={goPrev}
        disabled={isTransitioning}
        className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 h-12 w-12 rounded-full border backdrop-blur-sm flex items-center justify-center cursor-pointer bg-background shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaChevronLeft className='text-foreground' />
      </button>

      <button
        type="button"
        aria-label="Next image"
        onClick={goNext}
        disabled={isTransitioning}
        className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 h-12 w-12 rounded-full border backdrop-blur-sm flex bg-background items-center justify-center cursor-pointer shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaChevronLeft className="rotate-180 text-foreground" />
      </button>
    </div>
  )
}

export default ProductImageSlider
