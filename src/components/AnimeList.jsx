import React, {useEffect, useState} from 'react';
import {likeAnime, removeAnime, unlikeAnime} from "../redux/reducer";
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
    likeAnime: (id) => dispatch(likeAnime(id)),
    unlikeAnime: (id) => dispatch(unlikeAnime(id)),
  }
};


const AnimeList = (props) => {
  const dispatch = useDispatch();

  console.log(props);

  const [filterLike, setFilterLike] = useState(false);
  const toggleLike = () => setFilterLike(!filterLike);

  useEffect(() => {
    dispatch(fetchAnime(API_ANIME));
  }, [dispatch]);

  return (
    <div className={'main__container'}>
      <p className={'main__title'}>top anime</p>
      <div>
        <button
          className={'main__fav-filter'}
          onClick={toggleLike}
        >
          {
            !filterLike
              ? <span>show favorite</span>
              : <span>show all</span>
          }

        </button>
      </div>
      <ul className={'list__container'}>
        {
          props.anime.length > 0 && !filterLike
            ? props.anime.map(item => {
              return (
                <AnimeItem
                  key={item.mal_id}
                  item={item}
                  removeAnime={props.removeAnime}
                  likeAnime={props.likeAnime}
                  unlikeAnime={props.unlikeAnime}
                />
              )
            })
            : null
        }

        {
          props.anime.length > 0 && filterLike
            ? props.anime.map(item => {
              return (
                !!item.like === true &&
                <AnimeItem
                  key={item.mal_id}
                  item={item}
                  removeAnime={props.removeAnime}
                  likeAnime={props.likeAnime}
                  unlikeAnime={props.unlikeAnime}
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