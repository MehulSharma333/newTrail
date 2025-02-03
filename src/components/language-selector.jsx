"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import india from '../assets/images/flags/india.png'
import usa from '../assets/images/flags/usa.png'
import france from '../assets/images/flags/france.png'
import bangladesh from '../assets/images/flags/bangladesh.png'
import germany from '../assets/images/flags/germany.png'
import italy from '../assets/images/flags/italy.png'
import portugal from '../assets/images/flags/portugal.png'
import russia from '../assets/images/flags/russia.png'
import spain from '../assets/images/flags/spain.png'
import southKorea from '../assets/images/flags/southKorea.webp'
import { useTranslation } from 'react-i18next';
const LanguageSelector = () => {
    const langRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [country, setCountry] = useState(usa)
    const [lang, setLang] = useState('En')

    const { i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (langRef.current && !langRef.current.contains(event.target)) {
            setVisible(false);
          }
        }
    
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          // Unbind the event listener on cleanup
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [langRef]);

    return (
        <div ref={langRef} className='flex px-2 mr-0.5 py-0.5 rounded-full items-center relative'>
            <div className=''>
                <div  id='langbox' onClick={() => setVisible(!visible)} className='font-semibold  flex gap-2 cursor-pointer'>
                    <Image className='img rounded-full w-6' src={country} alt="country" />
                    <span className='dark:text-white'>{lang}</span>
                </div>
            </div>
            {
                visible &&
                <div data-aos="fade-down" className='fixed top-[60px] w-full sm:w-fit bg-white right-0 rounded shadow grid grid-cols-2 sm:grid-cols-3 backdrop-blur-md '>
                    {/* English */}
                    <div onClick={() => { setCountry(usa); setLang('En'); setVisible(false); changeLanguage('en'); }} className={` ${lang === 'En' ? 'bg-white text-black dark:text' : ""} dark:text-white dark:hover:text-gray-800 font-semibold flex hover:bg-white duration-150 px-3 py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={usa} alt="usa" />
                        <span>English</span>
                    </div>

                    {/* Spanish */}
                    <div onClick={() => { setCountry(spain); setLang('Es'); setVisible(false); changeLanguage('es'); }} className={` ${lang === 'Es' ? 'bg-white text-black' : ""} font-semibold dark:text-white dark:hover:text-gray-800 hover:bg-white px-3 duration-150 py-2 flex gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={spain} alt="spain" />
                        <span>Español</span>
                    </div>

                    {/* French */}
                    <div onClick={() => { setCountry(france); setLang('Fr'); setVisible(false); changeLanguage('fr'); }} className={` ${lang === 'Fr' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={france} alt="france" />
                        <span>Français</span>
                    </div>

                    {/* Italian */}
                    <div onClick={() => { setCountry(italy); setLang('It'); setVisible(false); changeLanguage('it'); }} className={` ${lang === 'It' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={italy} alt="italy" />
                        <span>Italiano</span>
                    </div>

                    {/* German */}
                    <div onClick={() => { setCountry(germany); setLang('De'); setVisible(false); changeLanguage('de'); }} className={` ${lang === 'De' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={germany} alt="germany" />
                        <span>Deutsch</span>
                    </div>

                    {/* Bengali */}
                    <div onClick={() => { setCountry(bangladesh); setLang('Bn'); setVisible(false); changeLanguage('bn'); }} className={` ${lang === 'Bn' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={bangladesh} alt="bangladesh" />
                        <span>Bangla</span>
                    </div>

                    {/* Portuguese */}
                    <div onClick={() => { setCountry(portugal); setLang('Pt'); setVisible(false); changeLanguage('pt'); }} className={` ${lang === 'Pt' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={portugal} alt="portugal" />
                        <span>Português</span>
                    </div>

                    {/* South Korean */}
                    <div onClick={() => { setCountry(southKorea); setLang('Ko'); setVisible(false); changeLanguage('ko'); }} className={` ${lang === 'Ko' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={southKorea} alt="southKorea" />
                        <span>한국어</span>
                    </div>

                    {/* Hindi */}
                    <div onClick={() => { setCountry(india); setLang('Hi'); setVisible(false); changeLanguage('hi'); }} className={` ${lang === 'Hi' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={india} alt="india" />
                        <span>Hindi</span>
                    </div>

                    {/* Russian */}
                    <div onClick={() => { setCountry(russia); setLang('Ru'); setVisible(false); changeLanguage('ru'); }} className={` ${lang === 'Ru' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={russia} alt="russia" />
                        <span>Русский</span>
                    </div>

                    {/* Tamil */}
                    <div onClick={() => { setCountry(india); setLang('Ta'); setVisible(false); changeLanguage('ta'); }} className={` ${lang === 'Ta' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={india} alt="india" />
                        <span>தமிழ்</span>
                    </div>

                    {/* Malayalam */}
                    <div onClick={() => { setCountry(india); setLang('Ml'); setVisible(false); changeLanguage('ml'); }} className={` ${lang === 'Ml' ? 'bg-white text-black' : ""} font-semibold px-3 dark:text-white dark:hover:text-gray-800 hover:bg-white duration-150 flex py-2 gap-2 cursor-pointer`}>
                        <Image className='img rounded-full w-6' src={india} alt="india" />
                        <span>മലയാളം</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default LanguageSelector


