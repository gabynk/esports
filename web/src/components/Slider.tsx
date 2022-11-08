import { useMemo, useState } from "react";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useBreakpoint } from "../hooks/useBreakpoints";

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
    observer.unobserve(slider.container);
  })
}

export function Slider({ games }: SliderProps) {
  const breakpoint = useBreakpoint();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(6);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 6, spacing: 15 },
      },
    },
    slides: { perView: 1, spacing: 15 },
    mode: 'free',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  },
    [ResizePlugin]
  );

  useMemo(() => {
    setSlidesPerView(6)
  }, [])

  return (
    <div className="max-w-[1344px] mt-16 flex justify-center items-center">
      {slider?.current !== null && breakpoint > 768 && (
        <button
          onClick={(e: any) =>
            e.stopPropagation() || slider.current?.prev()
          }
          disabled={currentSlide === 0}
          className={`"font-bold" ${currentSlide === 0 ? "text-zinc-800/30" : "text-white"}`}
        >
          <CaretLeft className="w-9 h-9" weight="bold" />
        </button>
      )}
      <div ref={sliderRef} className="keen-slider">
        {slider?.current !== null && games.map(game => {
          return (
            <GameBanner
              key={game.id}
              game={game}
            />
          )
        })}
      </div>
      {slider?.current !== null && breakpoint > 768 && (
        <button
          onClick={(e: any) =>
            e.stopPropagation() || slider.current?.next()
          }
          disabled={currentSlide >= games.length - slidesPerView}
          className={`"font-bold" ${currentSlide >= games.length - slidesPerView ? "text-zinc-800/30" : "text-white"}`}
        >
          <CaretRight className="w-9 h-9" weight="bold" />
        </button>
      )}
    </div>
  )
}