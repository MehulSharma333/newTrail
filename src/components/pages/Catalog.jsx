'use client';
import '../../app/i18n';
import { useState, useMemo } from 'react';
import Botbar from '@/components/footer/Botbar';
import { useTranslation } from 'react-i18next';
import Soundbox from '@/components/Soundbox';
import { useContext } from 'react';
import { ThemeContext } from '@/components/context/theme-context';
import { NavbarHead } from '../header/NavbarHead';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { getSoundsByCategory } from '../../database/getSoundsByCategory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Ads from '../adsbygoogle/Ads';

const Catalog = (props) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleSoundsCount, setVisibleSoundsCount] = useState(40);
  const { theme } = useContext(ThemeContext);
  const [categorySounds, setCategorySounds] = useState(props.categorySounds);
  const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const { t } = useTranslation();

  const displayedSounds = useMemo(
    () => (categorySounds || [])
      .slice() // Create a shallow copy to avoid mutating the original array
      .sort((a, b) => b.downloads - a.downloads) // Sort by downloads in decreasing order
      .slice(0, visibleSoundsCount), // Limit to the number of visible sounds
    [categorySounds, visibleSoundsCount]
  );

  const handleSearchChange = (e) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/search/${searchQuery}`)
    }
  }

  const handlePlaySound = (soundId) => {
    setCurrentlyPlayingSound(soundId);
  };

  async function handleShowMoreSounds() {
    const newPage = await getSoundsByCategory(props.catValue, pageNo + 1)
    setPageNo(prev => prev + 1)
    const mergedArray = [...categorySounds, ...newPage];
    setVisibleSoundsCount(prev => prev + 40)
    setCategorySounds(mergedArray)
  }


  return (
    <div className={theme}>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <main className="hidebar w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
      <div className='fixed bottom-0 w-2/4 h-[80px] '><Ads adSlot="5995266007" className="w-full h-full" /></div>
        <div className='fixed right-0 top-1/2 -translate-y-1/2 w-[100px] h-3/4 '>
        <Ads adSlot="6454431005" className="w-full h-full" /></div>
        <div className='fixed left-0 top-1/2 -translate-y-1/2 w-[100px] h-3/4 '>
        <Ads adSlot="6454431005" className="w-full h-full" />
        </div>
        <NavbarHead active={props.catUrl === 'trending' ? 'trending' : 'categories'} />

        <Breadcrumb first={t("home")} second={t(props.catValue)} secondLink={props.catUrl} />

        {/* Title and Description */}
        <div className="mt-[40px] md:mt-[100px] w-full flex flex-col items-center gap-3 md:gap-6 px-5">
          <h1
            className="gradtext font-semibold text-center h-[50px] drop-shadow-lg text-2xl md:text-4xl">
            {t(props.title)}
          </h1>
          <p className="md:w-2/3 text-center hidden md:block text-[#2A2A2A] dark:text-gray-100">
            {t(props.description)}
          </p>
          <p className="md:w-2/3 text-center md:hidden text-[#2A2A2A] dark:text-gray-100">
            {t(props.mobileDescription)}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="md:px-[5%] mt-[40px] w-full xl:w-[70%] pr-3 bg-white dark:bg-[#212D3D] dark:text-white sticky z-50 top-[56px] py-2 gap-5 flex flex-col-reverse lg:flex-row items-center justify-between">
          <h2 className="text-2xl dark:text-white text-bold">{t(props.catValue)}</h2>
          <div>
            <form onSubmit={(e) => handleSearchChange(e)} className="flex items-center w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="shadow border md:w-[350px] border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder={t('search_sound')}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sounds */}
        <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
          {displayedSounds.map((sound) => (
            <div key={sound.id}>
              <Soundbox
                authorId={sound.author}
                id={sound.id}
                name={sound.name}
                link={sound.link}
                tags={sound.tags}
                color={sound.color}
                description={sound.description}
                favorites={sound.favorites}
                downloads={sound.downloads}
                category={props.catAlias}
                categoryUrl={props.catUrl}
                isPlaying={currentlyPlayingSound === sound.id}
                handlePlaySound={handlePlaySound}
              />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleSoundsCount <= categorySounds.length && (
          <div className="w-full mb-16 flex justify-center">
            <button
              onClick={handleShowMoreSounds}
              className="group inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-[#00549F] via-[#0071FF] to-[#00A4FF]"
            >
              <span className="relative px-5 py-2.5 bg-white dark:text-white hover:text-white dark:bg-[#171F2D] rounded-md group-hover:bg-opacity-0">
                {t('show_more')}
              </span>
            </button>
          </div>
        )}

        {props.catUrl === 'meme-soundboard' &&
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold drop-shadow-md mb-6 bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text">
              {t('meme_title')}
            </h2>

            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t('meme_page_description1')}
            </p>

            <h3 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md mb-6">
              {t('meme_page_heading2')}
            </h3>
            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t('meme_page_description2')}
            </p>
            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t('meme_page_description2.1')}
            </p>
            <h3 className="text-2xl bg-gradient-to-r from-[#F77705] to-[#A00493] inline-block text-transparent bg-clip-text font-bold drop-shadow-md mb-6">
              {t('meme_page_heading3')}
            </h3>
            <p className=" text-gray-700 dark:text-gray-300 mb-6">
              {t('meme_page_description3.1')} <Link className='text-blue-500 font-semibold' href={'/anime-soundboard'}>{t('anime_soundboard')}</Link>, <Link className='text-blue-500 font-semibold' href={'/discord-soundboard'}>{t('discord_soundboard')}</Link>, <Link className='text-blue-500 font-semibold' href={'/funny-sound-effects'}>{t('funny_sound_effects')}</Link> {t('meme_page_description3.2')} <Link className='text-blue-500 font-semibold' href={'/trending'}>{t('trending_sounds')}</Link> {t('meme_page_description3.3')}
            </p>

            <ul className="space-y-6">
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description4.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description4.2')}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description5.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description5.2')}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description6.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description6.2')}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description7.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description7.2')}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description8.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description8.2')}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description9.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description9.2')}
                  <Link className='text-blue-500 font-semibold' href={'/'}>SoundEffectButtons </Link>
                  {t('meme_page_description9.3')}
                </p>
              </li>
              <li>
                <h4 className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                  {t('meme_page_description10.1')}
                </h4>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description10.2')} <Link className='text-blue-500 font-semibold' href={'/leaderboard'}>{t('leaderboard')}</Link> {t('meme_page_description10.3')}
                </p>
              </li>
              <li>
                <p className=" text-gray-700 dark:text-gray-300">
                  {t('meme_page_description11.1')} <b>{t('meme_soundboard')}</b>
                  {t('meme_page_description11.2')}
                </p>
                <li>
                  <Link className='text-blue-500 font-semibold' href={'/youtube-sound-effects'}>{t('youtube_sound_effects')}</Link>
                </li>
                <li>
                  <Link className='text-blue-500 font-semibold' href={'/tiktok-sound-effects'}>{t('tiktok_sound_effects')}</Link>
                </li>
                <li>
                  <Link className='text-blue-500 font-semibold' href={'/horror-sound-effects'}>{t('horror_title')}</Link>
                </li>
                <li>
                  <Link className='text-blue-500 font-semibold' href={'/animal-sound-effects'}>{t('animal_sound_effects')}</Link>
                </li>
                <li>
                  <Link className='text-blue-500 font-semibold' href={'/prank-soundboard'}>{t('prank_soundboard')}</Link>
                </li>
                <li>
                  <Link className='text-blue-500 font-semibold' href={'/human-sound-effects'}>{t('human_sound_effects')}</Link>
                </li>

              </li>

            </ul>

          </div>
        }

        <Botbar />
      </main>
    </div>
  );
};

export default Catalog;
