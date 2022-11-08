import { useNavigate } from "react-router-dom";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}
interface GameBannerProps {
  game: Game;
}

export function GameBanner({ game }: GameBannerProps) {
  const history = useNavigate();

  function handleGoToAdList() {
    history("/ad-list", { state: { game } });
  }

  return (
    <a onClick={handleGoToAdList} className="keen-slider__slide rounded-lg cursor-pointer ">
      <img src={game.bannerUrl} alt="" className="w-full"/>
      <div className="w-full pt-16 pb-4 bg-game-gradient absolute bottom-0">
        <div className="flex flex-col items-start ml-3">
          <strong className="font-bold text-white">{game.title}</strong>
          <span className="text-zinc-300 text-sm">{game._count.ads} anúncio(s)</span>
        </div>
      </div>
    </a>
  );
}