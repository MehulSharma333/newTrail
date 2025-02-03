'use client';
import '../../app/i18n'
import { NavbarHead } from '../header/NavbarHead';
import { useEffect, useState, useRef, useCallback } from "react";
import Botbar from "@/components/footer/Botbar";
import { useTranslation } from "react-i18next";
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import { addFavoriteSound } from '../../database/addFavouriteSound';
import { removeFavouriteSound } from '../../database/removeFavouriteSound';
import Soundbox from '@/components/Soundbox';
import { updateDownloads } from '../../database/updateDownloads';
import { useSearchParams } from 'next/navigation';
import { getAllFavouriteSounds } from '../../database/getAllFavouriteSounds';
import { searchSounds } from '../../database/searchSound';
import { RWebShare } from 'react-web-share';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function Sound(props) {
  const { t } = useTranslation()
  const audioRef = useRef(null);
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState(false)
  const [soundUrl, setSoundUrl] = useState()
  const [favourited, setFavourited] = useState(false)
  const [visibleSoundsCount, setVisibleSoundsCount] = useState(40);
  const [animate, setAnimate] = useState(false);
  const [similarSounds, setSimilarSounds] = useState();
  const [currentlyPlayingSound, setCurrentlyPlayingSound] = useState(null);
  const [logedIn, setLogedIn] = useState(false)
  const [pageNo, setPageNo] = useState(0)

  useEffect(() => {
    if (favourited) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [favourited]);
  
  const searchParams = useSearchParams()
  const categoryName = searchParams.get('category')
  const categoryRedirect = searchParams.get('direct')

  const id = props.slug

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogedIn(true)
      } else {
        setLogedIn(false)
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleShowMoreSounds() {
    if (props.soundObj.name) {
      const similarSoundsContent = await searchSounds(props.soundObj.name)
      setPageNo(prev => prev + 1)
      const mergedArray = [...similarSounds, ...similarSoundsContent];
      setVisibleSoundsCount(prev => prev + 40)
      setSimilarSounds(mergedArray)
    }
  };

  async function getherFavSounds() {
    if (logedIn) {
      const favs = await getAllFavouriteSounds();
      const sound = favs.sounds && favs.sounds.find(sound => sound.uid === props.soundObj.uid);
      if (sound) {
        setFavourited(true)
      }
      
    }
  }

  useEffect(() => {
    getherFavSounds()
  }, [logedIn])

  async function getherSimilarSounds() {
    if (props.soundObj.name) {
      const similarSoundsContent = await searchSounds(props.soundObj.name)
      setSimilarSounds(similarSoundsContent)
    }
  }

  const handlePlaySound = (soundId) => {
    setCurrentlyPlayingSound(soundId);
  };

  useEffect(() => {
    getherSimilarSounds()
  }, [props.soundObj])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
    } else {
      audioRef.current.play(); // Play the audio
    }
    setIsPlaying(!isPlaying); // Toggle the play state
  };

  useEffect(() => {
    if (props.soundObj) {
      const bytes = CryptoJS.AES.decrypt(props.soundObj.link, 'myencryptiontext');
      const originalUrl = bytes.toString(CryptoJS.enc.Utf8);
      setSoundUrl(originalUrl)
    }
  }, [props.soundObj])

  const downloadSound = async () => {
    try {
      const response = await fetch(soundUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${props.soundObj.name}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      await updateDownloads(id, props.soundObj.author)
    } catch (error) {
      console.error("Error downloading the sound:", error);
    }
  };

  async function addFavourite() {
    if (logedIn) {
      const result = await addFavoriteSound(id)
      if (result.success === true) {
        setFavourited(true)
      } else {
        if (result.message === 'Not logged in') {
          toast.warn('You are not logged in')
        }
      }
    } else {
      router.push('/login')
    }
  }

  function copyIframe() {
    navigator.clipboard.writeText(`${window.location.href}embed`);
  }

  async function handleShowMoreSounds() {
    if (props.soundObj.name) {
      const newPage = await searchSounds(props.soundObj.name, pageNo + 1)
      setPageNo(prev => prev + 1)
      const mergedArray = [...similarSounds, ...newPage];
      setVisibleSoundsCount(prev => prev + 40)
      setSimilarSounds(mergedArray)
    }
  }

  async function removeFavourite() {
    const result = await removeFavouriteSound(id)
    if (result.success === true) {
      setFavourited(false)
    } else {
      if (result.message === 'Not logged in') {
        toast.warn('You are not logged in')
      }
    }
  }

  return (
    <div className={`${theme && 'dark'}`}>
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
        <NavbarHead theme={theme} setTheme={setTheme} />

        {/* backgrounds */}
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute -z-50 top-[60px] transform -scale-x-100 hidden w-full h-[700px] md:block" >
          <defs>
            <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
              <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
              <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]" d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z">
          </path>
        </svg>

        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute -z-50 bottom-[100px] transform -scale-x-100 hidden rotate-180 w-full h-[700px] md:block" >
          <defs>
            <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
              <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
              <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]" d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z">
          </path>
        </svg>


        <div className='flex flex-col items-center w-full'>
          <Breadcrumb first={t('home')} second={categoryName} secondLink={categoryRedirect} third={props.soundObj && props.soundObj.name} />
          <div className=" md:w-[75%] w-full grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-6 py-18 mt-10 px-5">
            <div className='flex flex-col '>
              <div style={{ backgroundColor: props.soundObj && props.soundObj.color }} data-aos="fade-in" className=' pb-4 gap-5 flex flex-col items-center justify-between p-5 mx-auto min-w-[250px] max-w-[350px] rounded-md'>
                <div className="flex flex-col gap-2">
                  <h1 className="text-center text-2xl text-[#E7E7EA] font-semibold">{props.soundObj && props.soundObj.name}</h1>
                  <h6 className="text-center text-sm mb-3 text-[#E7E7EA] font-semibold">{t('downloads')}: {props.soundObj && props.soundObj.downloads}</h6>
                  {isPlaying ?
                    <div className="flex flex-row gap-1 items-center justify-center">
                      <div className="wave rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                      <div className="wave rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                      <div className="wave rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                      <div className="wave rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                      <div className="wave rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                      <div className="wave rounded-full w-2 h-18 bg-gray-100" style={{ "--i": ".4s" }}></div>
                      <div className="wave rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                      <div className="wave rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                      <div className="wave rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                      <div className="wave rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                      <div className="wave rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                    </div> :
                    <div className="flex flex-row gap-1 items-center justify-center">
                      <div className=" rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                      <div className=" rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                      <div className=" rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                      <div className=" rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                      <div className=" rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                      <div className=" rounded-full w-2 h-18 bg-gray-100" style={{ "--i": ".4s" }}></div>
                      <div className=" rounded-full w-2 h-12 bg-white" style={{ "--i": ".3s" }}></div>
                      <div className="rounded-full w-2 h-6 bg-gray-300" style={{ "--i": ".2s" }}></div>
                      <div className=" rounded-full w-2 h-4 bg-gray-200" style={{ "--i": ".4s" }}></div>
                      <div className="rounded-full w-2 h-8 bg-gray-100" style={{ "--i": ".4s" }}></div>
                      <div className=" rounded-full w-2 h-4 bg-white" style={{ "--i": ".4s" }}></div>
                    </div>}
                </div>
                <audio onEnded={() => setIsPlaying(false)} ref={audioRef} src={soundUrl}></audio>
                <button style={{ color: props.soundObj && props.soundObj.color }} onClick={handlePlayPause} className='bg-white font-semibold rounded my-2 mt-5 mx-auto max-w-[400px] flex items-center gap-3 w-full justify-center py-2.5'>
                  {
                    isPlaying ?
                      <div className='flex items-center gap-3'>
                        <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={props.soundObj && props.soundObj.color}><path d="M564-284v-392h139.5v392H564Zm-307 0v-392h139.5v392H257Z" /></svg>
                        {t("pause")}
                      </div>
                      :
                      <div className='flex items-center gap-3'>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill={props.soundObj && props.soundObj.color} viewBox="0 0 384 512">
                          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                        </svg>
                        {t("play")}
                      </div>
                  }
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 mx-auto max-w-[650px]">
                {props.soundObj && props.soundObj.tags.map((tag, index) => (
                  <div key={index} className="bg-blue-100 rounded-sm text-blue-800 px-2 py-1">
                    {tag}
                  </div>
                ))}
              </div>

            </div>
            <div className='z-50 flex flex-col items-center gap-5 justify-center'>
              <div className='border-b-2 text-gray-600 dark:text-gray-300 border-gray-300 w-full'>
                <span className='font-bold text-gray-700 dark:text-gray-100 py-1'>{t('sound_description')}:</span>&nbsp;&nbsp;  {(props.soundObj && props.soundObj.description) || "Download, play and share free " + props.soundObj.name + " sound effect button, viral your soundboard sounds to be featured on world's leaderboard."}
              </div>
              <div className='grid w-full gap-5 grid-cols-1 items-center lg:grid-cols-2'>
                {favourited ?
                  <button onClick={() => removeFavourite()} className='bg-[#5aa9cd] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" className={animate ? 'pop-animation' : ''}
                      height="24px" viewBox="0 -960 960 960" width="24px" fill="#E82850"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                    {t("removefromfavourites")}
                  </button> :
                  <button onClick={() => addFavourite()} className='bg-[#5aa9cd] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                    {t("addtofavourites")}
                  </button>
                }
                <button onClick={() => downloadSound()} className='bg-[#BB2E42] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
                  {t("downloadsoundbutton")}
                </button>
                <RWebShare
                  data={{
                    text: `Download and Share ${props.soundObj.name} sound effect button`,
                    title: 'Sound Effect Buttons',
                    url: `https://www.soundeffectbuttons.com/${props.frameUrl}`,
                  }}
                >
                  <button className='bg-[#159642c1] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>                  Share
                  </button>
                </RWebShare>
                <a href={`mailto:richdreamcreators@gmail.com?subject=Sound%20button%20report&body=Sound%20name:%20${props.soundObj.name},%0A%0APlease%20describe%20your%20issue%20with%20this%20sound%20button%0A%0AThank%20you!`}>
                  <button className='bg-[#d0a91bcb] text-white rounded flex mx-auto max-w-[400px] items-center gap-3 w-full justify-center py-2.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" /></svg>
                    Report
                  </button>
                </a>
              </div>
              <div className='w-full flex justify-center items-center'>
                {props.frameUrl ?
                  <textarea
                    onClick={copyIframe}
                    defaultValue={`<iframe width="170" height="200" src="https://www.soundeffectbuttons.com/${props.frameUrl}/embed" frameborder="0" scrolling="no"></iframe>`}
                    style={{ width: '100%', height: '80px' }}
                  /> : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[75%] w-full px-5 mt-10 gap-5 flex flex-col-reverse lg:flex-row justify-between">
          <div>
            <h4 className='text-2xl dark:text-white font-semibold'>{t("youmightalsolike")}</h4>
          </div>
        </div>

        <div className="md:w-[90%] xl:w-[70%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-8 gap-5">
          {similarSounds && similarSounds.map((sound) => {
            return (
              <Soundbox
                key={sound.id}
                id={sound.id}
                authorId={sound.author}
                name={sound.name}
                link={sound.link}
                tags={sound.tags}
                color={sound.color}
                description={sound.description}
                favorites={sound.favorites}
                downloads={sound.downloads}
                category={categoryName}
                categoryUrl={categoryRedirect}
                isPlaying={currentlyPlayingSound === sound.id}
                handlePlaySound={handlePlaySound}
              />
            );
          })}

        </div>

        {/* show more */}
        {(visibleSoundsCount <= (similarSounds && similarSounds.length)) ? (
          <div className="w-full mb-16 flex justify-center">
            <button
              onClick={handleShowMoreSounds}
              className="relative group inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#F77705] to-[#A00493] group-hover:from-[#A00493] group-hover:to-[#F77705] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative flex items-center gap-3 px-16 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <svg
                  className="w-4 h-4 dark:fill-white group-hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#rgb(107,114,128)"
                >
                  <path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" />
                </svg>
                {t("show_more")}
              </span>
            </button>
          </div>
        ) : null}

        <Botbar />
      </main>
    </div>
  );
}
