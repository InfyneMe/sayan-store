"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  {
    src: "/land1.jpg?height=800&width=1600",
    alt: "Construction site with workers and equipment",
  },
  {
    src: "/land2.jpg?height=800&width=1600",
    alt: "Stacks of bricks and cement bags at a warehouse",
  },
  {
    src: "/land3.jpg?height=800&width=1600",
    alt: "Close-up of construction materials including rods and cement",
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 Rs {
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full Rs {index === currentIndex ? "bg-white" : "bg-white/50"} transition-colors`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide Rs {index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
