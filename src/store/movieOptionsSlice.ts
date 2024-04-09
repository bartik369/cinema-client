import { IFilterMovie,} from '../types/media';
import { createSlice, PayloadAction, AnyAction} from '@reduxjs/toolkit';

type MovieState = {
  loading: boolean;
  error: null | string;
  filter: IFilterMovie;
};

const initialState: MovieState = {
  filter: {
    category: [],
    country: [],
    year: [],
    rating: [],
  },
  loading: false,
  error: null,
};


const movieSlice = createSlice({
  name: 'movieOptions',
  initialState,
  reducers: {
    setMovieCategory: (state, action) => {
      state.filter.category.includes(action.payload)
        ? (state.filter.category = state.filter.category.filter(
            (el) => el !== action.payload
          ))
        : state.filter.category.push(action.payload);
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
} = movieSlice.actions;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
