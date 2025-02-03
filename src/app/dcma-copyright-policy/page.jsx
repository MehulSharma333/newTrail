'use client'
import Botbar from '@/components/footer/Botbar'
import { NavbarHead } from '@/components/header/NavbarHead'
import '../../app/i18n'
import Link from 'next/link'
import { useTranslation } from 'react-i18next';

const DcmaPolicy = () => {

    const { t } = useTranslation();

    return (
        <>
            <head>
                <title> DCMA Copyright Policy | Soundeffectbuttons</title>
                <meta
                    name="description"
                    content="Read our DCMA Copyright Policy to understand your rights and how Soundeffectbuttons handles copyright issues regarding sound effects."
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
                    <div className="mt-[30px] w-full text-gray-600 dark:text-gray-100 flex flex-col items-center gap-6 py-16 px-5">

                        <h1 className="text-4xl font-bold text-center drop-shadow-md text-[#2A2A2A] dark:text-gray-100 mb-6">
                            {t("dmca_copyright_policy")}
                        </h1>

                        <div className="md:w-[75%] z-50 px-5 mx-auto text-lg space-y-6">
                            <p>
                                {t("thank_you_label")}{' '}
                                <Link className="font-semibold text-blue-500 hover:text-blue-700" href={'/'}>
                                    www.soundeffectbuttons.com
                                </Link>{' '}
                            </p>

                            <p className="text-2xl text-blue-500 font-semibold mt-8">{t("use_of_website_label")}</p>
                            <p>{t("use_of_website_content_label")}</p>

                            <p>{t("website_entertainment_label")}</p>
                            <p>{t("copyright_restriction_label")}</p>
                            <p>{t("contact_copyright_issues_label")}</p>

                            <p className="text-2xl text-blue-500 font-semibold mt-8">{t("intellectual_property_label")}</p>
                            <p className="mb-4">{t("intellectual_property_content_label")}</p>
                            <p className="mb-4">{t("third_party_rights_label")}</p>

                            <p className="text-2xl text-blue-500 font-semibold mt-8">{t("warranties_disclaimer_label")}</p>
                            <p className="mb-4">{t("user_responsibility_label")}</p>
                            <p className="mb-4">{t("content_restriction_label")}</p>
                            <p className="mb-4">
                                {t("restoration_guarantee_label")}{' '}
                                <a className="text-blue-500" href="mailto:richdreamcreators@gmail.com">
                                    richdreamcreators@gmail.com
                                </a>.
                            </p>

                            <p className="text-xl font-semibold text-blue-500 mb-4">{t("internal_linking_label")}</p>
                            <p className="mb-4">{t("internal_linking_content_label")}</p>
                            <p className="mb-4">{t("google_ads_label")}</p>
                            <p className="mb-4">{t("no_third_party_data_sharing_label")}</p>

                            <p className="text-xl font-semibold text-blue-500 mb-4">{t("communication_mode_label")}</p>
                            <p className="mb-4">{t("communication_mode_content_label")}</p>

                            <p className="text-xl font-semibold text-blue-500 mb-4">{t("contact_us_label")}</p>
                            <p className="mb-4">
                                {t("contact_us_content_label")}{' '}
                                <a className="text-blue-500" href="mailto:richdreamcreators@gmail.com">
                                    richdreamcreators@gmail.com
                                </a>.
                            </p>
                        </div>
                    </div>
                </main>

                <Botbar />
            </div>
        </>
    )
}

export default DcmaPolicy
