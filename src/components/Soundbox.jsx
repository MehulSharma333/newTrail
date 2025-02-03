import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import { updateDownloads } from '../database/updateDownloads';
import { useTranslation } from "react-i18next";
import fb from '../assets/images/social/fb.png'
import twitter from '../assets/images/social/twitter.png'
import whatsapp from '../assets/images/social/whatsapp.png'
import Image from 'next/image';
import { RWebShare } from "react-web-share";
import { addFavoriteSound } from '../database/addFavouriteSound';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFavouriteSound } from '@/database/removeFavouriteSound';

const Soundbox = React.memo((props) => {
  const { t } = useTranslation()
  const audioRef = useRef(null);
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundUrl, setSoundUrl] = useState(null);
  const [shareModal, setShareModal] = useState(false)
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [adding, setAdding] = useState(false);
  const [loggedIn, setLogedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

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

  async function addFavourite() {
    if (loggedIn) {
      setAdding(true)
      const result = await addFavoriteSound(props.id)
      if (result.success === true) {
        setAdding(false)
        toast.success('Added to favourites')
      } else {
        setAdding(false)
        toast.info('Already Favourited')
      }
    } else {
      router.push('/login')
    }
  }

  async function removeFavourite() {
    if (loggedIn) {
      setAdding(true)
      const result = await removeFavouriteSound(props.id)
      if (result.success === true) {
        setAdding(false)
        props.setRefreshKey(prevKey => prevKey + 1);
      }
    }
  }

  const generatedUrl = `/${props.id}-${props.name && props.name.replace(/\s+/g, '-')}?category=${encodeURIComponent(props.category)}&direct=${encodeURIComponent(props.categoryUrl)}`;

  const loadSound = useCallback((encryptedUrl) => {
    if (encryptedUrl) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUrl, 'myencryptiontext');
        const originalUrl = bytes.toString(CryptoJS.enc.Utf8);
        setSoundUrl(originalUrl);
      } catch (error) {
        console.error('Error decrypting URL:', error);
      }
    }
  }, []);

  useEffect(() => {
    loadSound(props.link);
  }, [props.link, loadSound]);

  const handlePlayPause = useCallback(() => {
    const soundId = isPlaying ? null : props.id;
    props.handlePlaySound(soundId);
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  }, [isPlaying, props, audioRef]);

  useEffect(() => {
    if (props.isPlaying) {
      audioRef.current.play();
      setIsPlaying(true)
    } else {
      audioRef.current.pause();
      setIsPlaying(false)
    }
  }, [props.isPlaying]);

  const downloadSound = useCallback(async () => {
    try {
      const response = await fetch(soundUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = props.name;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      await updateDownloads(props.id, props.authorId);
    } catch (error) {
      console.error('Error downloading the MP3:', error);
    }
  }, [soundUrl, props.id, props.name]);

  return (
    <>
      <div
        key={props.id}
        // data-aos="fade-up"
        className="h-[200px] flex flex-col items-center justify-between p-2 mx-auto w-full max-w-[170px] rounded-md"
        style={{ backgroundColor: props.color }}
      >
        <Link
          className='max-w-full'
          href={{
            pathname: `/${props.id}-${props.name && props.name.replace(/\s+/g, '-')}`,
            query: { category: props.category, direct: props.categoryUrl },
          }}
        >
          <div className="flex flex-col justify-between w-full h-[110px] gap-5">
            <h3 className="text-center w-full mt-1 break-words text-sm font-semibold text-[#E7E7EA] truncate-ellipsis">
              {props.name && props.name}
            </h3>
            <div className="flex justify-center w-full items-center">
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
          </div>
        </Link>

        <div className="flex justify-around w-full items-center px-3">
          {!props.visitShow ?
          <div>
            {
              props.profileFav ?
                <div className='cursor-pointer'>
                  {
                    adding ?
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        width="24"
                        height="24"
                        style={{
                          shapeRendering: 'auto',
                          display: 'block',
                          background: 'transparent',
                        }}
                      >
                        <g>
                          <circle
                            strokeDasharray="164.93361431346415 56.97787143782138"
                            r="35"
                            strokeWidth="10"
                            stroke="#fff"
                            fill="none"
                            cy="50"
                            cx="50"
                          >
                            <animateTransform
                              keyTimes="0;1"
                              values="0 50 50;360 50 50"
                              dur="1s"
                              repeatCount="indefinite"
                              type="rotate"
                              attributeName="transform"
                            />
                          </circle>
                        </g>
                      </svg> :
                      <svg onClick={removeFavourite} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E82850"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>

                  }
                </div> :
                <div className='cursor-pointer'>
                  {
                    adding ?
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        width="24"
                        height="24"
                        style={{
                          shapeRendering: 'auto',
                          display: 'block',
                          background: 'transparent',
                        }}
                      >
                        <g>
                          <circle
                            strokeDasharray="164.93361431346415 56.97787143782138"
                            r="35"
                            strokeWidth="10"
                            stroke="#fff"
                            fill="none"
                            cy="50"
                            cx="50"
                          >
                            <animateTransform
                              keyTimes="0;1"
                              values="0 50 50;360 50 50"
                              dur="1s"
                              repeatCount="indefinite"
                              type="rotate"
                              attributeName="transform"
                            />
                          </circle>
                        </g>
                      </svg> :
                      <svg onClick={addFavourite} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                  }
                </div>
              }</div>
            : null}

            <RWebShare
              data={{
                text: `Download and Share ${props.name && props.name} sound effect button`,
                title: 'Sound Effect Buttons',
                url: generatedUrl,
              }}
            >
              <svg
                // onClick={() => { setShareModal(true), setCopied(false) }}
                className='cursor-pointer'
                xmlns="http://www.w3.org/2000/svg"
                height="19px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#e8eaed"
              >
                <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
              </svg>
            </RWebShare>

            <audio onEnded={() => setIsPlaying(false)} ref={audioRef} src={soundUrl}></audio>
            {isPlaying ? (
              <svg
                onClick={handlePlayPause}
                className=" cursor-pointer "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#e8eaed"
                height='32px'
                width='32px'
              >
                <path d="M564-284v-392h139.5v392H564Zm-307 0v-392h139.5v392H257Z" />
              </svg>
            ) : (
              <svg onClick={handlePlayPause}
                className=" cursor-pointer"
                xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z" /></svg>
            )}
            <svg
              onClick={downloadSound}
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              height='24px'
              width='24px'
              viewBox="0 -960 960 960"
              fill="#e8eaed"
            >
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
          </div>
      </div>

      {shareModal &&
        <div class="fixed inset-0 z-[999999] bg-black/25 dark:bg-black/50 ">
          <div class="flex items-center justify-center h-full">
            <div class="relative bg-white dark:bg-[#292929] w-full sm:w-auto mx-5 dark:bg-darkSurface-200 rounded-xl px-16 py-8 text-black dark:text-white">
              <button
                onClick={() => { setIsBoxVisible(false), setShareModal(false) }}
                className="absolute right-3 top-3 cursor-pointer"
                aria-label="close modal"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L16.9993 16.9993"
                    class="stroke-black  dark:stroke-white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M1 16.9993L16.9993 1"
                    class="stroke-black  dark:stroke-white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <div class="capitalize font-semibold text-[22px] text-center">
                <div className='w-full items-center flex flex-col gap-5'>
                  <div>
                    <h4 className="text-2xl">{t("shareonsocialmedia")}</h4>
                  </div>
                  <div className='flex relative gap-3'>
                    <Image className='w-8 img h-8' loading="lazy" src={whatsapp} alt="whatsapp" />
                    <Link target='_blank' href={`https://www.facebook.com/sharer/sharer.php?${currentUrl + generatedUrl}`}>
                      <Image className='w-8 img h-8' loading="lazy" src={fb} alt="facebook" />
                    </Link>
                    <Link target='_blank' href={`http://www.twitter.com/share?url=${currentUrl + generatedUrl}`}>
                      <Image className='w-8 img h-8' loading="lazy" src={twitter} alt="twitter" />
                    </Link>
                    <div>
                      <div onClick={() => setIsBoxVisible(!isBoxVisible)} className='bg-[#607D8B] w-8 cursor-pointer h-8 rounded-full flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
                      </div>
                    </div>
                  </div>
                  {isBoxVisible && (

                    <div className=' bg-white flex flex-col items-center max-w-full'>
                      <p className='text-center mb-4 text-sm break-words overflow-wrap'>
                        {currentUrl && currentUrl + generatedUrl}
                      </p>
                      <div
                        className='bg-blue-500 cursor-pointer text-sm w-[130px] text-white px-8 py-2 rounded '
                      >
                        {
                          copied ? 'Copied' : ' Copy URL'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      }

    </>
  );
});

Soundbox.displayName = 'Soundbox';

export default Soundbox;
