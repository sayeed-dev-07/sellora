/* eslint-disable react-hooks/refs */
'use client'

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/all"
import InertiaPlugin from "gsap/InertiaPlugin"
import Image from "next/image"

gsap.registerPlugin(Draggable, InertiaPlugin)

const AUTOPLAY_DELAY = 4000

const Slider = () => {

  const container = useRef<HTMLDivElement | null>(null)
  const track = useRef<HTMLDivElement | null>(null)
  const handViewport = useRef<HTMLDivElement | null>(null)
  const handTrack = useRef<HTMLDivElement | null>(null)
  const draggableRef = useRef<Draggable | null>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const centerCardRef = useRef<(index: number, animate?: boolean) => void>(() => { })
  const resetAutoplayRef = useRef<() => void>(() => { })

  const data = [
    { id: 1, name: "Item 1", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide05-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide05-hand@2x.png" },
    { id: 2, name: "Item 2", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide06-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide06-hand@2x.png" },
    { id: 3, name: "Item 3", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide07-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide07-hand@2x.png" },
    { id: 4, name: "Item 4", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide01-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide01-hand@2x.png" },
    { id: 5, name: "Item 5", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide02-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide02-hand@2x.png" },
    { id: 6, name: "Item 6", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide03-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide03-hand@2x.png" },
    { id: 7, name: "Item 7", bgUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide04-photo@2x.jpg", handUrl: "https://gunte-lab.kachiboshi.co.jp/img/home/hero-slide04-hand@2x.png" }
  ]

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

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

    function getFloatIndexFromMainX(mainX: number) {
      const range = maxX - minX
      const progress = range === 0 ? 0 : (mainX - minX) / range
      return (1 - progress) * (cards.length - 1)
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

    function syncHandTrack(mainX: number, animate = false) {
      if (!handTrack.current) return
      const range = maxX - minX
      const progress = clamp01(range === 0 ? 0 : (mainX - minX) / range)
      const handX = handMinX + progress * (handMaxX - handMinX)

      if (animate) {
        gsap.to(handTrack.current, {
          x: handX,
          duration: 1,
          ease: "power3.out"
        })
      } else {
        gsap.set(handTrack.current, { x: handX })
      }
    }

    function updateHandTransforms(mainX: number) {
      const floatIndex = getFloatIndexFromMainX(mainX)

      handCards.forEach((card, i) => {
        const dist = i - floatIndex
        const absDist = Math.abs(dist)
        const proximity = clamp01(1 - absDist)
        const sideFade = clamp01(1 - absDist * 0.55)

        const rotate = dist * 14
        const scale = 0.72 + proximity * 1.5
        const y = -2 - proximity * 32
        const overlapOpacity = proximity
        const overlapY = (1 - proximity) * 8
        const overlapScale = 0.72 + proximity * 0.38

        gsap.set(card, {
          y,
          opacity: Math.max(0.25, sideFade),
          zIndex: 100 - Math.round(absDist * 10)
        })

        if (handInners[i]) {
          gsap.set(handInners[i], {
            rotate,
            scale,
            transformOrigin: "50% 100%"
          })
        }

        if (handOverlaps[i]) {
          gsap.set(handOverlaps[i], {
            opacity: overlapOpacity,
            y: overlapY,
            scaleX: overlapScale,
            scaleY: overlapScale
          })
        }
      })
    }

    function centerCard(index: number, animate = true) {
      indexRef.current = index
      setActiveIndex(index)

      const x = viewportCenter - (index * spacing + cardWidth / 2)

      if (!animate) {
        gsap.set(trackEl, { x })
        syncHandTrack(x, false)
        updateHandTransforms(x)
        return
      }

      gsap.to(trackEl, {
        x,
        duration: 1,
        ease: "power3.out",
        onUpdate: () => {
          const currentX = Number(gsap.getProperty(trackEl, "x"))
          syncHandTrack(currentX, false)
          updateHandTransforms(currentX)
        },
        onComplete: () => {
          syncHandTrack(x, false)
          updateHandTransforms(x)
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
      }, AUTOPLAY_DELAY)
    }

    centerCardRef.current = centerCard
    resetAutoplayRef.current = resetAutoplay

    calculateLayout()

    const startX = viewportCenter - (indexRef.current * spacing + cardWidth / 2)
    gsap.set(trackEl, { x: startX })
    syncHandTrack(startX, false)
    updateHandTransforms(startX)

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
        syncHandTrack(this.x, false)
        updateHandTransforms(this.x)
      },
      onThrowUpdate() {
        syncHandTrack(this.x, false)
        updateHandTransforms(this.x)
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
      calculateLayout()
      centerCard(indexRef.current, false)
      draggableRef.current?.applyBounds({ minX, maxX })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      draggableRef.current?.kill()
      clearInterval(autoplayRef.current ?? undefined)
    }
  }, { scope: container })

  const goTo = (index: number) => {
    centerCardRef.current(index)
    resetAutoplayRef.current()
  }

  return (

    <div ref={container} className="overflow-hidden w-full pb-6">

      {/* MAIN SLIDER */}

      <div ref={track} className="flex gap-8 lg:gap-0">

        {data.map((item) => (

          <div
            key={item.id}
            className="main-card shrink-0 flex items-center justify-center w-[70vw] lg:w-[50vw] h-[60vh]"
          >
            <div className="relative h-full overflow-hidden border-2 border-background w-full max-w-[450px] md:max-w-none md:w-[550px]">
              <Image
                src={item.bgUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 550px, 100vw"
              />
            </div>
          </div>

        ))}

      </div>

      {/* HAND TRACK (SYNCHRONIZED ONLY) */}

      <div ref={handViewport} className="relative -mt-10 md:-mt-14 w-full  pointer-events-none">
        <div ref={handTrack} className="flex">

          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="hand-card shrink-0 w-1/3 h-[145px] flex items-end justify-center"
              >
                <div className="relative">
                  <div
                    className="hand-inner relative  h-[92px] w-[92px]"
                  >
                    <Image
                      src={item.handUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="108px"
                    />
                  </div>


                </div>
              </div>
            )
          })}

        </div>
      </div>

      {/* DOTS */}

      <div className="flex relative z-50 justify-center gap-3 mt-4">

        {data.map((_, i) => {

          const active = i === activeIndex

          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-3 rounded-full transition-all duration-300 ${active
                ? "w-10 bg-black"
                : "w-5 bg-secondary border border-background"
                }`}
            />
          )

        })}

      </div>

    </div>

  )

}

export default Slider
