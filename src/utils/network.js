import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchAnime = createAsyncThunk(
  'anime/fetchAnime',
  async function (url) {

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(res.status);
      }
      const data = await res.json();
      return data.top;

    } catch (e) {
      console.error(e.message);
    }
  }
);
