import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";

import { GameBanner } from "./GameBanner";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

interface SliderProps {
  games: Game[];
}

const ResizePlugin: KeenSliderPlugin = (slider) => {
  const observer = new ResizeObserver(function () {
    slider.update()
  })

  slider.on("created", () => {
    observer.observe(slider.container)
  })
  slider.on("destroyed", () => {
    observer.unobserve(slider.container)
  })
}

export function Slider({ games }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6,
      spacing: 15
    },
    mode: 'free',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  },
    [ResizePlugin]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider mt-16 relative">
        {slider?.current !== null && games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
        {slider?.current !== null && (
          <div className="w-full absolute flex items-center justify-between top-0 bottom-0 left-0 right-0">
            <button
              onClick={(e: any) =>
                e.stopPropagation() || slider.current?.prev()
              }
              disabled={currentSlide === 0}
              className={`"font-bold" ${currentSlide === 0 ? "text-zinc-800/30" : "text-white"}`}
            >
              <CaretLeft size={35} weight="bold" />
            </button>
            <button
              onClick={(e: any) =>
                e.stopPropagation() || slider.current?.next()
              }
              disabled={currentSlide >= games.length - 6}
              className={`"font-bold" ${currentSlide >= games.length - 6 ? "text-zinc-800/30" : "text-white"}`}
            >
              <CaretRight size={35} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}