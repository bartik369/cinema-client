import {useState, useEffect} from 'react';

export default function useCountLastHook() {
    const [slidesCount, setSlidesCount] = useState<number>();

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
        } else if (window.innerWidth < 480) {
            setSlidesCount(3);
        }
       }, [window.innerWidth])
       
       return slidesCount
};

