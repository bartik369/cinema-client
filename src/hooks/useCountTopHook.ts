import {useState, useEffect} from 'react';

export default function useCountTopHook() {
    const [slidesCount, setSlidesCount] = useState<number>();

    useEffect(() => {
        if (window.innerWidth > 1200) {
         setSlidesCount(8);
        } else if (window.innerWidth > 1100) {
         setSlidesCount(6);
        } else if (window.innerWidth > 990) {
         setSlidesCount(5);
        }  else if (window.innerWidth > 750) {
         setSlidesCount(4);
        } else if (window.innerWidth > 550) {
            setSlidesCount(3);
        } else if (window.innerWidth > 450) {
            setSlidesCount(3);
        }
        else if (window.innerWidth > 350) {
            setSlidesCount(2);
        }
       }, [window.innerWidth])
       
       return slidesCount
};

