import { searchSounds } from "../../../database/searchSound";
import Searched from "@/components/pages/Searched";

export default async function Page({ params }) {
  const decodedSearch = decodeURIComponent(params.search);

  return (
    <>
      <head>
        <title>Search For Your Favourite Soundboard | SoundEffectButtons</title>
        <meta
          name="description"
          content=" Use our search to instantly access millions of sound effects. Get high-quality audio in seconds for any project type."
        />
      </head>
      <Searched params={params} searchText={decodedSearch} />
    </>
  );
}
