import Sound from "@/components/pages/SoundPage";
import { getSoundById } from "../../database/getSounddById";

export default async function Page({ params }) {
  const { sound } = params;
  const [id, ...nameParts] = sound.split('-');
  const soundData = await getSoundById(id)
  const canonicalUrl = `https://www.soundeffectbuttons.com/${id}-${encodeURIComponent(soundData.name && soundData.name.replace(/\s+/g, '-'))}`;

  return (
    <>
      <head>
        <title>{soundData.name || 'Download and Play this sound.'}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="description"
          content={"Download, play and share free " + soundData.name + " sound effect button, viral your soundboard sounds to be featured on world's leaderboard."}

        />
      </head>
      <Sound slug={id} frameUrl={sound} soundObj={soundData} />
    </>
  );
}
