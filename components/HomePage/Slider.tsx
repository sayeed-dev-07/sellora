'use client'

import { useRef, useState, type MouseEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/all"
import InertiaPlugin from "gsap/InertiaPlugin"
import Image from "next/image"
import { data } from "@/public/data/SliderData"
import Link from "next/link"
import { useRouter } from "next/navigation"
gsap.registerPlugin(Draggable, InertiaPlugin)

const AUTOPLAY_DELAY = 4000
const MOBILE_AUTOPLAY_DELAY = 2600
const MOBILE_BREAKPOINT = 768

const getMotionConfig = (viewportWidth: number) => {
  const isSmallScreen = viewportWidth < MOBILE_BREAKPOINT

  return {
    isSmallScreen,
    autoplayDelay: isSmallScreen ? MOBILE_AUTOPLAY_DELAY : AUTOPLAY_DELAY,
    slideDuration: isSmallScreen ? 0.6 : 1,
    entranceTrackDuration: isSmallScreen ? 0.55 : 0.8,
    entranceHandDuration: isSmallScreen ? 0.45 : 0.75,
  }
}

const Slider = ({
  homeDone,
  skipEntranceAnimation = false,
}: {
  homeDone: boolean
  skipEntranceAnimation?: boolean
}) => {
  const router = useRouter()
  const container = useRef<HTMLDivElement | null>(null)
  const track = useRef<HTMLDivElement | null>(null)
  const handSection = useRef<HTMLDivElement | null>(null)
  const handViewport = useRef<HTMLDivElement | null>(null)
  const handTrack = useRef<HTMLDivElement | null>(null)
  const dotsRef = useRef<HTMLDivElement | null>(null)
  const draggableRef = useRef<Draggable | null>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const centerCardRef = useRef<(index: number, animate?: boolean) => void>(() => { })
  const resetAutoplayRef = useRef<() => void>(() => { })
  const entrancePlayedRef = useRef(false)
  const isNavigatingRef = useRef(false)
  const trackTweenRef = useRef<gsap.core.Tween | null>(null)



  const indexRef = useRef(Math.floor(data.length / 2))
  const [activeIndex, setActiveIndex] = useState(indexRef.current)

  useGSAP(() => {
    const cards = gsap.utils.toArray(".main-card") as HTMLElement[]
    const handCards = gsap.utils.toArray(".hand-card") as HTMLElement[]
    const handInners = gsap.utils.toArray(".hand-inner") as HTMLElement[]
    const handOverlaps = gsap.utils.toArray(".hand-overlap") as HTMLElement[]
    const trackEl = track.current

    if (!trackEl || cards.length < 2 || handCards.length < 2) return

    let cardWidth = 0
    let spacing = 0
    let viewportCenter = 0
    let minX = 0
    let maxX = 0

    let handWidth = 0
    let handSpacing = 0
    let handViewportCenter = 0
    let handMinX = 0
    let handMaxX = 0
    let motion = getMotionConfig(window.innerWidth)
    let resizeFrame = 0
    const setHandTrackX = handTrack.current ? gsap.quickSetter(handTrack.current, "x", "px") : null
    const setHandCardY = handCards.map((card) => gsap.quickSetter(card, "y", "px"))
    const setHandOverlapOpacity = handOverlaps.map((overlap) => gsap.quickSetter(overlap, "opacity"))
    const setHandOverlapY = handOverlaps.map((overlap) => gsap.quickSetter(overlap, "y", "px"))
    const setHandOverlapScaleX = handOverlaps.map((overlap) => gsap.quickSetter(overlap, "scaleX"))
    const setHandOverlapScaleY = handOverlaps.map((overlap) => gsap.quickSetter(overlap, "scaleY"))

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

    function getFloatIndexFromMainX(mainX: number) {
      const range = maxX - minX
      const progress = range === 0 ? 0 : (mainX - minX) / range
      return (1 - progress) * (cards.length - 1)
    }

    function applyVisualState(mainX: number) {
      if (!handTrack.current || !setHandTrackX) return

      const range = maxX - minX
      const progress = clamp01(range === 0 ? 0 : (mainX - minX) / range)
      const handX = handMinX + progress * (handMaxX - handMinX)
      const floatIndex = getFloatIndexFromMainX(mainX)
      const rotationFactor = motion.isSmallScreen ? 10 : 14

      setHandTrackX(handX)

      handCards.forEach((card, i) => {
        const dist = i - floatIndex
        const absDist = Math.abs(dist)
        const proximity = clamp01(1 - absDist)

        const rotate = dist * rotationFactor
        const scale = 0.72 + proximity * 1.5
        const y = -2 - proximity * -30
        const overlapOpacity = proximity
        const overlapY = (1 - proximity) * 8
        const overlapScale = 0.72 + proximity * 0.38

        setHandCardY[i]?.(y)
        card.style.zIndex = String(100 - Math.round(absDist * 10))

        if (handInners[i]) {
          gsap.set(handInners[i], {
            rotate,
            scale
          })
        }

        if (handOverlaps[i]) {
          setHandOverlapOpacity[i]?.(overlapOpacity)
          setHandOverlapY[i]?.(overlapY)
          setHandOverlapScaleX[i]?.(overlapScale)
          setHandOverlapScaleY[i]?.(overlapScale)
        }
      })
    }

    function calculateLayout() {
      const containerWidth = container.current?.clientWidth ?? window.innerWidth
      cardWidth = cards[0].offsetWidth
      spacing = cards[1].offsetLeft - cards[0].offsetLeft
      viewportCenter = containerWidth / 2
      minX = viewportCenter - ((cards.length - 1) * spacing + cardWidth / 2)
      maxX = viewportCenter - cardWidth / 2

      const handViewportWidth = handViewport.current?.clientWidth ?? containerWidth
      handWidth = handCards[0].offsetWidth
      handSpacing = handCards[1].offsetLeft - handCards[0].offsetLeft
      handViewportCenter = handViewportWidth / 2
      handMinX = handViewportCenter - ((handCards.length - 1) * handSpacing + handWidth / 2)
      handMaxX = handViewportCenter - handWidth / 2
    }

    function centerCard(index: number, animate = true) {
      indexRef.current = index
      setActiveIndex(index)

      const x = viewportCenter - (index * spacing + cardWidth / 2)

      if (!animate) {
        trackTweenRef.current?.kill()
        trackTweenRef.current = null
        gsap.set(trackEl, { x })
        applyVisualState(x)
        return
      }

      trackTweenRef.current?.kill()
      trackTweenRef.current = gsap.to(trackEl, {
        x,
        duration: motion.slideDuration,
        ease: "power3.out",
        onUpdate: () => {
          const currentX = Number(gsap.getProperty(trackEl, "x"))
          applyVisualState(currentX)
        },
        onComplete: () => {
          trackTweenRef.current = null
          applyVisualState(x)
        }
      })
    }

    function nextCard() {
      let next = indexRef.current + 1
      if (next > cards.length - 1) next = 0
      centerCard(next)
    }

    function resetAutoplay() {
      clearInterval(autoplayRef.current ?? undefined)
      autoplayRef.current = setInterval(() => {
        nextCard()
      }, motion.autoplayDelay)
    }

    centerCardRef.current = centerCard
    resetAutoplayRef.current = resetAutoplay

    calculateLayout()
    gsap.set([trackEl, handTrack.current, ...handCards, ...handInners], { force3D: true })
    gsap.set(handInners, { transformOrigin: "50% 100%", backfaceVisibility: "hidden" })

    const startX = viewportCenter - (indexRef.current * spacing + cardWidth / 2)
    gsap.set(trackEl, { x: startX })
    applyVisualState(startX)

    if (draggableRef.current) draggableRef.current.kill()

    draggableRef.current = Draggable.create(trackEl, {
      type: "x",
      inertia: true,
      edgeResistance: 0.9,
      dragResistance: 0.1,
      bounds: { minX, maxX },

      onPress() {
        resetAutoplay()
      },
      onDrag() {
        applyVisualState(this.x)
      },
      onThrowUpdate() {
        applyVisualState(this.x)
      },

      snap: () => {
        const velocity = InertiaPlugin.getVelocity(trackEl, "x")

        let move = 1
        if (Math.abs(velocity) > 20000) move = 3
        else if (Math.abs(velocity) > 10000) move = 2

        const direction = velocity < 0 ? 1 : -1
        let next = indexRef.current + move * direction
        next = Math.max(0, Math.min(cards.length - 1, next))

        centerCard(next)
        return viewportCenter - (next * spacing + cardWidth / 2)
      }
    })[0]

    resetAutoplay()

    function handleResize() {
      motion = getMotionConfig(window.innerWidth)
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame)

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0
        calculateLayout()
        centerCard(indexRef.current, false)
        draggableRef.current?.applyBounds({ minX, maxX })
        resetAutoplay()
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      trackTweenRef.current?.kill()
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame)
      window.removeEventListener("resize", handleResize)
      draggableRef.current?.kill()
      clearInterval(autoplayRef.current ?? undefined)
    }
  }, { scope: container })

  useGSAP(() => {
    if (!track.current || !handSection.current || !dotsRef.current) return

    if (skipEntranceAnimation) {
      gsap.set(dotsRef.current, { autoAlpha: 1, y: 0 })
      gsap.set(track.current, { autoAlpha: 1, y: 0 })
      gsap.set(handSection.current, { autoAlpha: 1, x: 0 })
      entrancePlayedRef.current = true
      return
    }

    if (!homeDone) {
      gsap.set(dotsRef.current, { autoAlpha: 0, y: 8, force3D: true })
      gsap.set(track.current, { autoAlpha: 0, y: 72, force3D: true })
      gsap.set(handSection.current, { autoAlpha: 0, x: -120, force3D: true })
      return
    }

    if (entrancePlayedRef.current) return
    entrancePlayedRef.current = true

    const tl = gsap.timeline({ defaults: { ease: 'power3.in' } })

    tl.to(dotsRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.35,

    })
      .to(track.current, {
        autoAlpha: 1,
        y: 0,
        duration: getMotionConfig(window.innerWidth).entranceTrackDuration,

      }, "+=0.05")
      .to(handSection.current, {
        autoAlpha: 1,
        x: 0,
        duration: getMotionConfig(window.innerWidth).entranceHandDuration,

      }, "-=0.2")
  }, { scope: container, dependencies: [homeDone, skipEntranceAnimation] })

  const goTo = (index: number) => {
    centerCardRef.current(index)
    resetAutoplayRef.current()
  }

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    if (isNavigatingRef.current) return
    isNavigatingRef.current = true

    const trackEl = track.current
    if (trackEl) {
      trackTweenRef.current?.kill()
      trackTweenRef.current = null

      const dragInstance = draggableRef.current as (Draggable & { tween?: gsap.core.Tween }) | null
      dragInstance?.tween?.kill()

      gsap.killTweensOf(trackEl)
      const currentX = Number(gsap.getProperty(trackEl, "x")) || 0
      gsap.set(trackEl, { x: currentX })
    }

    const cardEl = event.currentTarget

    gsap.killTweensOf(cardEl)

    router.push(`/case_study/${slug}`)
  }

  return (
    <div ref={container} className="w-full pb-6 py-[5%] relative z-10"> {/* FIX: added overflow-x-hidden just in case the track spills over the page width */}
      {/* MAIN SLIDER */}
      {/* FIX: Added arbitrary classes to hide the scrollbar if this track is natively scrollable */}
      <div
        ref={track}
        className="flex gap-12 xl:gap-0 opacity-0 translate-y-[72px] will-change-transform"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="main-card shrink-0 flex items-center justify-center w-[70vw] lg:w-[50vw] overflow-visible h-[45vh] sm:h-[60vh]"
          >
            {/* Important: overflow-visible here allows the text to pop out the top */}
            <Link
              href={`/case_study/${item.slug}`}
              onClick={(event) => handleCardClick(event, item.slug)}
              className="relative h-full w-full max-w-112.5 md:max-w-none group md:w-137.5"
            >

              {/* floating text  */}
              <div className="absolute inset-0 top-3 text-sm sm:text-xl z-20">

                {/* Active text (right side) */}
                <div
                  className={`${item.id - 1 === activeIndex ? "opacity-100" : "opacity-0"} duration-600 transition-opacity delay-300 absolute right-2 [writing-mode:vertical-rl] ${item.textColor === "white" ? "text-white" : "text-black"
                    }`}
                >
                  <p>{item.sideText}</p>
                </div>

                {/* Inactive text (left side) */}
                <div className={`absolute -left-7 [writing-mode:vertical-lr] text-black ${item.id - 1 !== activeIndex ? "opacity-100" : "opacity-0"} duration-400 transition-opacity delay-100`}>
                  <p>{item.sideText}</p>
                </div>

              </div>

              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.bgUrl}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 550px, 70vw"
                />
              </div>

              <svg
                className={`absolute inset-0 w-full z-50 h-full pointer-events-none overflow-visible ${item.id - 1 === activeIndex ? "opacity-100" : "opacity-0"} duration-600 transition-opacity delay-300`}
                viewBox="0 0 540 540"
                preserveAspectRatio="xMinYMin slice"
              >
                {/* Card Border Path */}
                <path
                  d="M0 542 V36 A36 36 0 0 1 36 0 H540"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Adjusted Text Path: Moves the horizontal line to y=0 */}
                <path
                  id={`text-path-${item.id}`}
                  d="M3 540 V52 A52 52 0 0 1 55 0 H540"
                  fill="none"
                />

                <text
                  className="fill-secondary text-xl font-semibold"
                  letterSpacing="2"
                  /* This 'middle' value ensures the 50/50 vertical split on the path */
                  dominantBaseline="middle"
                  stroke="rgba(0, 0, 0, 0.8)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  paintOrder="stroke fill"
                >
                  <textPath href={`#text-path-${item.id}`} startOffset="270">
                    {item.name}
                  </textPath>
                </text>
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* HAND TRACK */}
      <div ref={handSection} className="opacity-0 -translate-x-[120px]">
        <div
          ref={handViewport}
          className="relative -mt-10 md:-mt-14 w-full pointer-events-none"
        >
          <div ref={handTrack} className="flex will-change-transform">
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="hand-card shrink-0 w-1/3 h-[145px] flex items-end justify-center"
                >
                  <div className="relative">
                    <div className="hand-inner relative h-25 w-[100px] sm:h-32.5 sm:w-[130px] md:h-[152px] md:w-38 will-change-transform">
                      <Image
                        src={item.handUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="(min-width: 768px) 130px, 100px"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* DOTS */}
      <div
        ref={dotsRef}
        className="flex relative z-50 justify-center gap-3 mt-4 opacity-0 translate-y-2"
      >
        {data.map((_, i) => {
          const active = i === activeIndex

          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={` h-2 rounded-full transition-all cursor-pointer duration-300 ${active
                ? "sm:w-10 w-7 bg-black"
                : "sm:w-5 w-3 bg-secondary border border-background"
                }`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Slider
