'use client'
import Botbar from '@/components/footer/Botbar'
import { NavbarHead } from '@/components/header/NavbarHead'
import '../../app/i18n'
import { useTranslation } from 'react-i18next';

const Policy = () => {

  const { t } = useTranslation();

  return (
    <>
      <head>
        <title> Privacy Policy | Soundeffectbuttons</title>
        <meta
          name="description"
          content=" Learn how Soundeffectbuttons protect your privacy and personal data. Learn about our data collection and usage practices."
        />
      </head>
      <div>
        <main className="hidebar text-gray-300 w-full dark:bg-[#212D3D] relative flex min-h-screen flex-col items-center">
          <NavbarHead />

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

          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute -z-50 bottom-[0px] transform -scale-x-100 hidden rotate-180 w-full h-[700px] md:block" >
            <defs>
              <linearGradient id="sw-gradient-0" x1="1" x2="0" y1="1" y2="0">
                <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
                <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path className="fill-[url(#sw-gradient-0)] dark:fill-[#171F2D]" d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z">
            </path>
          </svg>

          {/* title,description */}
          <div className="mt-[30px]  w-full text-gray-600 dark:text-gray-100 flex flex-col items-center gap-6 py-16 px-5">

            <h1 className="text-4xl font-bold text-center drop-shadow-md text-[#2A2A2A] dark:text-gray-100 mb-6">
              {t("privacy_policy")}
            </h1>

            <div className='md:w-[75%] z-50 px-5 mx-auto text-lg space-y-6'>
              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("privacy_policy_welcome")}
              </p>
              <p className='mb-4'>
                {t("privacy_policy_description")}
              </p>

              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("what_information_do_we_collect")}
              </p>

              <h3 className='text-lg font-semibold text-blue-400 mb-2'>
                {t("personal_information")}
              </h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>{t("email_address")}</li>
                <li>{t("user_content")}</li>
              </ul>

              <h3 className='text-lg font-semibold text-blue-400 mb-2'>
                {t("usage_data")}
              </h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>{t("log_data")}</li>
              </ul>

              <h3 className='text-lg font-semibold text-blue-400 mb-2'>
                {t("cookies")}
              </h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>{t("cookies_description")}</li>
              </ul>

              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("why_do_we_use_your_information")}
              </p>
              <ul className='list-disc pl-6 mb-4'>
                <li>{t("to_provide_our_service")}</li>
                <li>{t("to_improve_our_service")}</li>
                <li>{t("to_protect")}</li>
              </ul>

              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("sharing_your_information")}
              </p>
              <p className='mb-4'>
                {t("we_do_not_sell_your_information")}
              </p>

              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("security")}
              </p>
              <p className='mb-4'>
                {t("we_work_hard_to_keep_your_information_safe")}
              </p>

              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("your_rights")}
              </p>
              <ul className='list-disc pl-6 mb-4'>
                <li>{t("access_your_data")}</li>
                <li>{t("correct_your_data")}</li>
                <li>{t("data_recovery")}</li>
              </ul>

              <p className='text-xl font-semibold text-blue-500 mb-4'>
                {t("contact_us")}
              </p>
              <p className='mb-4'>
                {t("contact_info")} <a className='text-blue-500' href="mailto:richdreamcreators@gmail.com">richdreamcreators@gmail.com</a>
              </p>

            </div>

          </div>
        </main>

        <Botbar />
      </div>
    </>
  )
}

export default Policy
