import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/context/theme-context";
import ClientLanguageProvider from "@/components/ClientLanguageProvider";
import ThemeBodyClass from "@/components/ThemeBodyClass";
import Script from "next/script";
import { MyProvider } from "@/utils/context/visitContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <ThemeProvider>
      <ClientLanguageProvider>
        <html lang="en" className={inter.className}>
          <head>
            <meta name="google-site-verification" content="RqF_xPRVJOa3DlnSzBkCbOeQvfPBEBhUvn2ZaKZRFbA" />
            <meta name="google-adsense-account" content="ca-pub-9988190119065685" />
            <meta property="og:image" content="/bee.webp" />
            <meta property="og:url" content="https://www.soundeffectbuttons.com/" />
            <meta property="og:type" content="website" />
            <meta name="trustpilot-one-time-domain-verification-id" content="a3fc677b-7176-492d-9ede-f9bc97edb59d" />
            <meta property="og:site_name" content="Sound Effect Buttons" />
            <meta property="og:description" content="Get the most viral/trending sound effect buttons from the pool of 5000+ sound buttons available in various categories" />
            <title>Sound Effect Buttons - Your Biggest Soundboard Online</title>

            {/* ads sense */}

            <Script  async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9988190119065685"
              crossorigin="anonymous" />

            {/* clarity tracking code */}
            <Script
              id="clarity-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                (function(c,l,a,r,i,t,y){
                  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ozjtt4wrc8");
              `,
              }}
            />

            {/* schema */}

            <Script
              id="ld-json-schema"
              type="application/ld+json"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "WebPage",
                      "@id": "https://www.soundeffectbuttons.com/",
                      "url": "https://www.soundeffectbuttons.com/",
                      "name": "Sound Effect Buttons - Free Sound Library",
                      "isPartOf": {
                        "@id": "https://www.soundeffectbuttons.com/#website"
                      },
                      "about": {
                        "@id": "https://www.soundeffectbuttons.com/#organization"
                      },
                      "description": "Discover a vast collection of free sound effects buttons at SoundEffectButtons.com! Perfect for pranks, gaming, or spicing up your videos and streams.",
                      "breadcrumb": {
                        "@id": "https://www.soundeffectbuttons.com/#breadcrumb"
                      },
                      "inLanguage": "en-US",
                      "potentialAction": {
                        "@type": "ReadAction",
                        "target": "https://www.soundeffectbuttons.com/"
                      }
                    },
                    {
                      "@type": "BreadcrumbList",
                      "@id": "https://www.soundeffectbuttons.com/#breadcrumb",
                      "itemListElement": [
                        {
                          "@type": "ListItem",
                          "position": 1,
                          "name": "Home"
                        }
                      ]
                    },
                    {
                      "@type": "WebSite",
                      "@id": "https://www.soundeffectbuttons.com/#website",
                      "url": "https://www.soundeffectbuttons.com/",
                      "name": "Sound Effect Buttons",
                      "description": "Free sound effects library for all purposes.",
                      "publisher": {
                        "@id": "https://www.soundeffectbuttons.com/#organization"
                      },
                      "alternateName": "SEB",
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://www.soundeffectbuttons.com/?s={search_term_string}",
                        "query-input": "required name=search_term_string"
                      },
                      "inLanguage": "en-US"
                    },
                    {
                      "@type": "Organization",
                      "@id": "https://www.soundeffectbuttons.com/#organization",
                      "name": "Sound Effect Buttons",
                      "url": "https://www.soundeffectbuttons.com/",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.soundeffectbuttons.com/_next/static/media/logo.fcd721cd.png",
                        "width": 225,
                        "height": 225,
                        "caption": "Sound Effect Buttons Logo"
                      }
                    },
                    {
                      "@type": "Product",
                      "@id": "https://www.soundeffectbuttons.com/#product",
                      "name": "Sound Effect Buttons",
                      "description": "Free sound effects library for various uses, including gaming, streaming, and entertainment.",
                      "brand": {
                        "@type": "Brand",
                        "name": "Sound Effect Buttons"
                      },
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.5",
                        "reviewCount": "50"
                      }
                    }
                  ]
                }),
              }}
            />
            {/* end schema */}


            {/* Google Tag Manager */}
            <Script
              id="google-tag-manager"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-WHVXGHV9');
                `,
              }}
            />
            {/* End Google Tag Manager */}

            {/* Google Analytics - gtag.js */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-3M5D9FVSM8"
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-3M5D9FVSM8');
                `,
              }}
            />
            {/* End Google Analytics */}

            {/* Theme Script */}
            <Script
              id="theme-script"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    const theme = localStorage.getItem('theme') || 'light';
                    document.documentElement.className = theme;
                  })();
                `,
              }}
            />
          </head>
          <body>
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-WHVXGHV9"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
            <ThemeBodyClass />
            <MyProvider>
              {children}
            </MyProvider>
          </body>
        </html>
      </ClientLanguageProvider>
    </ThemeProvider>
  );
}
