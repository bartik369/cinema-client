import { useState, useEffect, useRef} from "react";
import { IListRefObj } from "../types/chat";

const useOutsideClick = () => {
  const [messageMenu, setMessageMenu] = useState('');
  const messageMenuRef = useRef<IListRefObj>({});
  
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      messageMenuRef.current  &&
        Object.values(messageMenuRef).forEach((item) => {
          if (item !== e.target) setMessageMenu('');
        });
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [messageMenuRef]);

  return [ messageMenu, setMessageMenu] as const;
};

export { useOutsideClick };
