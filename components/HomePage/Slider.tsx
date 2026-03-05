'use client'

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import InertiaPlugin from "gsap/InertiaPlugin"

gsap.registerPlugin(Draggable, InertiaPlugin)

const Slider = () => {

  const container = useRef(null)
  const track = useRef(null)

  const data = [1,2,3,4,5,6]

  useGSAP(() => {

    const cards = gsap.utils.toArray(".card")
    const cardWidth = cards[0].offsetWidth
    const spacing = cardWidth

    const viewportCenter = window.innerWidth / 2

    let currentIndex = Math.floor(cards.length / 2)

    // center middle card initially
    const startX = viewportCenter - (currentIndex * spacing + cardWidth/2)
    gsap.set(track.current, { x: startX })

    const maxX = viewportCenter - (0 * spacing + cardWidth/2)
    const minX = viewportCenter - ((cards.length - 1) * spacing + cardWidth/2)

    Draggable.create(track.current, {

      type: "x",
      inertia: true,
      edgeResistance: 0.9,
      dragResistance: 0.1,

      bounds:{
        minX,
        maxX
      },

      snap:(value)=>{

        const velocity = InertiaPlugin.getVelocity(track.current,"x")

        let move = 1

        if(Math.abs(velocity) > 4800) move = 3
        else if(Math.abs(velocity) > 2800) move = 2
        else move = 1

        const direction = velocity < 0 ? 1 : -1

        currentIndex += move * direction

        currentIndex = Math.max(0, Math.min(cards.length - 1, currentIndex))

        return viewportCenter - (currentIndex * spacing + cardWidth/2)
      }

    })

  }, { scope: container })

  return (
    <div ref={container} className="overflow-hidden w-screen">

      <div ref={track} className="flex">

        {data.map(num => (
          <div
            key={num}
            className="card shrink-0 flex items-center justify-center w-[50vw] h-[400px]"
          >
            <div className="bg-secondary border-2 border-background h-[400px] w-[400px]" />
          </div>
        ))}

      </div>

    </div>
  )
}

export default Slider