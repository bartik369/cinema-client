import { url } from "inspector";

export interface IMedia {
    name: string;
    category: string;
    description: string;
    duration: string;
    year: number;
    rating: number;
}
export interface IMovie {
    _id?: string;
    titleEn: string;
    titleRu: string;
    picture: string;
    trailer?: string;
    genre: string[];
    year: string;
    country: string;
    description: string;
    director: string;
    ageCategory: string;
    time: string;
    actors: string[];
    rating: number | null;
}
export interface IMovieTitles {
    titleRu: string;
    titleEn: string;
}
export interface IActor {
    _id?: string;
    nameEn: string;
    nameRu: string;
    picture: string;
    extInfo: IActorExt;
}
export interface IActorExt {
    birthday: number;
    country: string;
    city: string;
    gender: string;
    height: string;
    genre: string[];
}
export interface IListResponse<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T[];
  }
export interface ISearch {
    search: string;
}
export interface IMovieRating {
    id: string;
    value: number;
}
export interface IMovieAddFavorite {
    userId: string;
    movieId: string;
}
export interface IMovieFavorites {
    userId: string;
    movies: string[];
}
export interface IExistFavorite {
    id: string
}

export interface IFilterMovie {
    genre:  string[];
    country: string[];
    year: string [];
    rating: number [];
}
export interface IFilterCategory {
    id: number;
    value: boolean;
}

export interface IMovieProperties {
    genre: string[];
    country: string[];
    year: string[];
    rating: number[];
}

export interface ISlider {
    _id?: string;
    movieId?: string;
    movieLink: string;
    media: string;
    description: string;
    movieTitle?: string;
}
export interface ISliderFormData {
    _id?: string;
    movieId?: string;
    movieLink: string;
    media: string;
    description: string;
    movieTitle?: string;
    file: string | Blob;
}
export interface ISliderUpdate {
    slideData: ISlider;
    file64: string;
}
export interface IMovieCheckMenu {
    genre: [];
    country: [];
    year: [];
}

