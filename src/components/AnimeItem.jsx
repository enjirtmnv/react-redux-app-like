import React from 'react';

const AnimeItem = (props) => {

  const {item, removeAnime, likeAnime} = props;

  return (
    <li key={item.mal_id} className={'list__item'}>
      <img
        className={'anime__img'}
        src={item.image_url}
        alt={item.title}
      />
      <p>{item.title}</p>
      <button onClick={() => likeAnime(item.mal_id)}>Like</button>
      <button onClick={() => removeAnime(item.mal_id)}>Delete</button>
    </li>
  );
};

export default AnimeItem;