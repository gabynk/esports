import axios from 'axios';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useLocation } from "react-router-dom";
import { Clipboard } from "phosphor-react";

interface Ad {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface AdLocationProps {
  game: {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    }
  }
}

export function AdList() {
  const history = useLocation();

  const [ads, setAds] = useState<Ad[]>([]);

  const params = history?.state as AdLocationProps;

  function isOnlineToday(ad: Ad) {
    const today = new Date().getDay();

    const isOnline = ad.weekDays.filter(day => Number(day) === today);

    if (isOnline.length > 0) {
      return true;
    }

    return false;
  }

  async function clipboardDiscord(id: string) {
    const response = await axios(`http://localhost:3333/ads/${id}/discord`);

    await navigator.clipboard.writeText(response.data.discord);

    alert('O código do discord foi copiado para a área de transferência');
  }

  useEffect(() => {
    axios(`http://localhost:3333/games/${params.game.id}/ads`).then(response => {
      setAds(response.data);
    });
  }, [params.game.id])

  return (
    <div className="max-w-[900px] mx-auto flex flex-col items-center my-20">
      <div className="w-full flex">
        <img src={params?.game.bannerUrl} alt="" className="rounded-md" />

        <div className="ml-3 mt-20 mx-auto">
          <h1 className="text-4xl md:text-6xl text-white font-black">
            {params.game.title}
          </h1>
          <span className="p-2 text-md text-white">
            {params.game._count.ads} anúncios
          </span>
        </div>
      </div>

      <table className="w-full mt-16 border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="p-4 text-center text-zinc-200 bg-[#2A2634] rounded-l-md">Nickname</th>
            <th className="p-4 text-center text-zinc-200 bg-[#2A2634]">Horário disponível</th>
            <th className="p-4 text-center text-zinc-200 bg-[#2A2634]">Experiência</th>
            <th className="p-4 text-center text-zinc-200 bg-[#2A2634]">Discord</th>
            <th className="p-4 text-center text-zinc-200 bg-[#2A2634]">Online hoje</th>
            <th className="p-4 text-center text-zinc-200 bg-[#2A2634] rounded-r-md">Copiar discord</th>
          </tr>
        </thead>
        <tbody>
          {ads.length > 0 && ads.map(ad => {
            const isOline = isOnlineToday(ad);

            return (
              <tr key={ad.id}>
                <td className="p-4 text-center text-zinc-300 bg-[#2A2634] rounded-l-md">{ad.name}</td>
                <td className="p-4 text-center text-zinc-300 bg-[#2A2634]">{ad.hourStart} até {ad.hourEnd}</td>
                <td className="p-4 text-center text-zinc-300 bg-[#2A2634]">{ad.yearsPlaying} anos</td>
                <td className="p-4 text-center text-zinc-300 bg-[#2A2634]">{ad.useVoiceChannel ? 'Sim' : 'Não'}</td>
                <td
                  className={clsx(
                    "p-4 text-center bg-[#2A2634]",
                    isOline && 'text-green-600',
                    !isOline && 'text-red-600'
                  )}
                >
                  {isOline ? 'Sim' : 'Não'}
                </td>
                <td className="p-4 text-center text-zinc-300 bg-[#2A2634] rounded-r-md">
                  <button onClick={() => clipboardDiscord(ad.id)}>
                    <Clipboard className="w-5 h-5" weight="bold" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {ads.length <= 0 && (
        <div className="flex justify-center items-center mt-20">
          <p className="text-zinc-300">Não há anúncios ainda!</p>
        </div>
      )}
    </div>
  )
}