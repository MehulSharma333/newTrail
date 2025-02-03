import Landing from "@/components/pages/Landing";
import { getSoundsByCategory } from '../database/getSoundsByCategory';

export default async function Home() {

  const trendingSounds = await getSoundsByCategory('trending');
  const funnySounds = await getSoundsByCategory('funny_sound_effects');
  const discordSounds = await getSoundsByCategory('discord_soundboard');
  const freeSounds = await getSoundsByCategory('free_sound_effects');
  const horrorSounds = await getSoundsByCategory('horror_sound_effects');
  const animalSounds = await getSoundsByCategory('animal_sound_effects');
  const memeSounds = await getSoundsByCategory('meme_soundboard');
  const prankSounds = await getSoundsByCategory('prank_soundboard');
  const youtubeSounds = await getSoundsByCategory('youtube_sound_effects');
  const royalitySounds = await getSoundsByCategory('royalty_free_music');

  return (
    <>
      <head>
        <title>Sound Effect Buttons - Your Biggest Soundboard Online</title>
        <meta
          name="description"
          content="Download sound buttons for free from the largest soundboard available online. Also, rank on our website and get featured along with your social media handles."
        />
      </head>
      <Landing
        trendingSounds={trendingSounds}
        funnySounds={funnySounds}
        discordSounds={discordSounds}
        freeSounds={freeSounds}
        horrorSounds={horrorSounds}
        animalSounds={animalSounds}
        memeSounds={memeSounds}
        prankSounds={prankSounds}
        youtubeSounds={youtubeSounds}
        royalitySounds={royalitySounds}
        title={'SoundEffectButtons'}
        description={"Get the most viral/trending sound effect buttons from the pool of 5000+ sound buttons available in various categories. Wanna appear on our leaderboard? Upload trending sounds to your Soundboard, make it viral, and we will feature you along with your social media handles! So what's the wait for? The competition has already started. Hurry!"}
        mobileDescription={'Sound Effect Buttons - Play and Download Free Sound Effects Online!'}
      />
    </>
  );
}
