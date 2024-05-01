import { IFilterMovie,} from '../types/media';
import { createSlice, PayloadAction, AnyAction} from '@reduxjs/toolkit';

type MovieState = {
  loading: boolean;
  error: null | string;
  filter: IFilterMovie;
  existTrailer: boolean;
  movieTitle: string;
};

const initialState: MovieState = {
  filter: {
    genre: [],
    country: [],
    year: [],
    rating: [],
  },
  existTrailer: false,
  movieTitle: '',
  loading: false,
  error: null,
};


const movieSlice = createSlice({
  name: 'movieOptions',
  initialState,
  reducers: {
    resetFilter: (state, action) => {
      state.filter.genre = action.payload;
      state.filter.country = [];
      state.filter.year = [];
    },
    setMovieCategory: (state, action) => {
      state.filter.genre.includes(action.payload)
        ? (state.filter.genre = state.filter.genre.filter(
            (el) => el !== action.payload
          ))
        : state.filter.genre.push(action.payload);
    },
    setMovieCountry: (state, action) => {
      state.filter.country.includes(action.payload)
        ? (state.filter.country = state.filter.country.filter(
            (el) => el !== action.payload
          ))
        : state.filter.country.push(action.payload);
    },
    setMovieYear: (state, action) => {
      state.filter.year.includes(action.payload)
        ? (state.filter.year = state.filter.year.filter(
            (el) => el !== action.payload
          ))
        : state.filter.year.push(action.payload);
    },
    setMovieRating: (state, action) => {
      state.filter.rating.includes(action.payload)
        ? (state.filter.rating = state.filter.rating.filter(
            (el) => el !== action.payload
          ))
        : state.filter.rating.push(action.payload);
    },
    setExistTrailer: (state, action) => {
      state.existTrailer = action.payload;
    },
    setMovieTitle:(state, action) => {
      state.movieTitle = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default movieSlice.reducer;
export const {
  setMovieCategory,
  setMovieCountry,
  setMovieYear,
  setMovieRating,
  resetFilter,
  setExistTrailer,
  setMovieTitle,
} = movieSlice.actions;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
