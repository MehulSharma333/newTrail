import React from 'react';
import { useEffect , useRef } from 'react';

const AdSense = ({adSlot , className}) => {
    const adRef = useRef(null)
    useEffect(() => {
        if (!adRef.current) return; 
        try {
          if (!adRef.current.getAttribute("data-ad-status")) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          console.error("AdSense Error:", e);
        }
      }, []);
  return (
    <div className={className}>
    <ins
    ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3940256099942544 "
      data-ad-slot= "1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
  )
}

export default AdSense