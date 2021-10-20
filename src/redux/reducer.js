import {createSlice} from '@reduxjs/toolkit';
import {fetchAnime} from "../utils/network";


const addTodoReducer = createSlice({
  name: 'anime',
  initialState: {
    anime: [],
    status: null,
    error: null,
  },
  reducers: {
    removeAnime: (state, action) => {
      state.anime = state.anime.filter((item) => item.mal_id !== action.payload);
    },
    likeAnime: (state, action) => {
      state.anime = state.anime.map((item) => {
        if (item.mal_id === action.payload) {
          return {
            ...item,
            like: true,
          }
        }
        return item
      });
    }
  },
  extraReducers: {
    [fetchAnime.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAnime.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.anime = action.payload;
      state.error = null;
    },
    [fetchAnime.rejected]: (state) => {
      state.status = 'rejected';
      state.error = true;
    },
  }
});

export const {removeAnime, likeAnime} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
