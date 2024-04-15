import React, {useState, useEffect} from 'react';

export default function useWindowSizeHook() {
    const [slidesCount, setSlidesCount] = useState<any>();

    useEffect(() => {
        if (window.innerWidth > 1200) {
         setSlidesCount(8);
        } else if (window.innerWidth > 1100) {
         setSlidesCount(7);
        } else if (window.innerWidth > 990) {
         setSlidesCount(6);
        }  else if (window.innerWidth > 650) {
         setSlidesCount(5);
        } else if (window.innerWidth > 480) {
            setSlidesCount(4);
           }
       }, [window.innerWidth])
       
       return slidesCount
};

