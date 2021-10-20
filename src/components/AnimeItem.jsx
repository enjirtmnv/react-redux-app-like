import React from 'react';
import {FaHeart} from 'react-icons/fa';
import {FaRegHeart} from 'react-icons/fa';
import {CgClose} from "react-icons/cg";

const AnimeItem = (props) => {

  const {item, removeAnime, likeAnime, unlikeAnime} = props;

  return (
    <li key={item.mal_id} className={'list__item'}>
      <img
        className={'list__img'}
        src={item.image_url}
        alt={item.title}
      />
      <p className={'list__title'}>{item.title}</p>
      <div className={'list__btns'}>
        {
          !!item.like
            ? <button onClick={() => unlikeAnime(item.mal_id)}>
              <FaHeart/>
            </button>
            : <button onClick={() => likeAnime(item.mal_id)}>
              <FaRegHeart/>
            </button>
        }

        <button onClick={() => removeAnime(item.mal_id)}>
          <CgClose/>
        </button>
      </div>
    </li>
  );
};

export default AnimeItem;