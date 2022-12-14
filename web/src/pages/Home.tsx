import axios from 'axios';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreatedModal } from '../components/CreatedModal';
import { Slider } from '../components/Slider';

import logoImg from '../assets/logo-nlw-esports.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    });
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo ESports" />

      <h1 className="text-4xl md:text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <Slider games={games} />

      <Dialog.Root>
        <CreateAdBanner />

        <CreatedModal />
      </Dialog.Root>
    </div >
  )
}
