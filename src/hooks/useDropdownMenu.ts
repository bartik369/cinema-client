import { useState, useEffect} from "react";

const useDropdownMenu = (myRef:React.RefObject<HTMLButtonElement>) => {
    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    
    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {

          if (myRef.current && !myRef.current.contains(e.target as Node)) {
            setDropdownDisplay(false);
          }
        };

        document.addEventListener('click', checkIfClickedOutside);
        return () => {
          document.removeEventListener('click', checkIfClickedOutside);
        };
      }, [myRef]);

    return [dropdownDisplay, setDropdownDisplay] as const;
}
export {useDropdownMenu}