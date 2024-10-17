import { useState, useEffect } from "react";

const useOutsideClick = (messageMenuRef: any) => {

  const [messageMenu, setMessageMenu] = useState(messageMenuRef);
  
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent): void => {
      messageMenuRef.current &&
        Object.values(messageMenuRef).map((item) => {
          if (item !== e.target) setMessageMenu("");
        });
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [messageMenuRef]);

  return [ messageMenu, setMessageMenu];
};

export { useOutsideClick };
