import React, { FC } from 'react';
import * as contentConst from '../../utils/constants/content';
import style from './Pagination.module.scss';

interface IPaginationProps {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
  setPage: (item: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  onNextPageClick,
  onPrevPageClick,
  disable,
  nav,
  setPage,
}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= nav?.total!; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
      <button
        onClick={onPrevPageClick}
        className={style.prev}
        disabled={disable.left}
      >
        <span className={style["prev-arrow"]}></span>
        {contentConst.prev}
      </button>
      {paginationNumbers &&
        paginationNumbers.map((item, index) => (
          <button key={index} className={item === nav?.current 
            ? style.active 
            : style.notactive}
            onClick={() => setPage(item)}
          > {item}
          </button>
        ))}
      <button
        onClick={onNextPageClick}
        className={style.next}
        disabled={disable.right}
      >
        {contentConst.next}
        <span className={style["next-arrow"]}/>
      </button>
    </div>
  );
};

export default React.memo(Pagination);
