import React, {useEffect, useState} from 'react';

import {likeAnime, removeAnime} from "../redux/reducer";
import {connect, useDispatch} from "react-redux";
import AnimeItem from "./AnimeItem";
import {fetchAnime} from "../utils/network";
import {API_ANIME} from "../constants/api";

const mapStateToProps = (state) => {
  return {
    anime: state.anime,
    all: state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAnime: (id) => dispatch(removeAnime(id)),
    likeAnime: (id) => dispatch(likeAnime(id))
  }
};


const AnimeList = (props) => {
  const dispatch = useDispatch();

  console.log(props);

  const [filterLike, setFilterLike] = useState(false);
  const toggleLike = () => setFilterLike(!filterLike);

  useEffect(() => {
    dispatch(fetchAnime(API_ANIME));
  }, []);

  return (
    <div>
      <div>
        <button onClick={toggleLike}>Filter</button>
      </div>
      <ul className={'list__container'}>
        {
          props.anime.length > 0 && !filterLike
            ? props.anime.map(item => {
              return(
                  <AnimeItem
                    key={item.mal_id}
                    item={item}
                    removeAnime={props.removeAnime}
                    likeAnime={props.likeAnime}
                  />
              )
            })
            : null
        }

        {
          props.anime.length > 0 && filterLike
            ? props.anime.map(item => {
              return(
                !!item.like === true &&
                <AnimeItem
                  key={item.mal_id}
                  item={item}
                  removeAnime={props.removeAnime}
                  likeAnime={props.likeAnime}
                />
              )
            })
            : null
        }


      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeList);