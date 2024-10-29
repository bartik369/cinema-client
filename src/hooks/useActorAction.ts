import { useState, MouseEvent } from "react";
import { IActor } from "../types/media";

// AddActor

const useActorAction = () => {
    const [actor, setActor] = useState<IActor>({
        _id: '',
        nameEn: '',
        nameRu: '',
        picture: '',
        extInfo: {
          birthday: 0,
          country: '',
          city: '',
          height: '',
          gender: '',
          genre: [],
        },
      });

      const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActor({
          ...actor,
          extInfo: {
            ...actor.extInfo,
            genre: [...actor.extInfo.genre, e.target.value],
          },
        });
      };
    
      const deleteGenre = (e: React.MouseEvent, item: string) => {
        e.preventDefault();
        setActor({
          ...actor,
          extInfo: {
            ...actor.extInfo,
            genre: actor.extInfo.genre.filter((elem) => elem !== item),
          },
        });
      };

      const resetFormHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActor({
          ...actor,
          _id: '',
          nameEn: '',
          nameRu: '',
          picture: '',
          extInfo: {
            birthday: 0,
            country: '',
            city: '',
            height: '',
            gender: '',
            genre: [],
          }
        });
      };

    return [actor, setActor, resetFormHandler, addGenre, deleteGenre] as const
}

export {useActorAction}