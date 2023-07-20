export interface MovieType {
  name: string;
  time: number;
  image: string;
  trailler: string;
  description: string;
  director_id: number;
  producer_id: number;
  screens: number[];
  categories: number[];
  casts: number[];
  age: number;
  price: number;
  movie_start: string;
  movie_end: string;
}

export interface directorType {
  id: number;
  name: string;
}

export interface screenType {
  id: number;
  name: string;
}

export interface castType {
  id: number;
  name: string;
}
export interface MovieItemType {
  id: string;
  name: string;
  time: number;
  image: string;
  trailler: string;
  description: string;
  director_id: number;
  director_name: string;
  producer_id: number;
  producer_name: string;
  casts: castType[];
  age: number;
  price: number;
  categories: CategoryItem[];
  screens: screenType[];
  movie_start: string;
  movie_end: string;
}

export interface MovieRespon {
  success: boolean;
  message: string;
  values: MovieType[];
  errors: MovieType;
}
export interface MoviesResponse {
  success: boolean;
  message: string;
  values: MovieItemType[];
}

export interface filterProps {
  page: number;
}
export interface IMovieCMS {
  movie_group_name: string;
  movies: MovieItemType[];
}

export interface MovieCMSResponse {
  success: boolean;
  message: string;
  values: IMovieCMS[];
}

export interface CategoryItem {
  id: number;
  name: string;
}

export interface CategoryRespon {
  success: boolean;
  message: string;
  values: CategoryItem[];
}

export interface DirectorRespon {
  success: boolean;
  message: string;
  values: directorType[];
}

export interface ScreenRespon {
  success: boolean;
  message: string;
  values: screenType[];
}
export interface CastRespon {
  success: boolean;
  message: string;
  values: castType[];
}

export interface producerType {
  id: number;
  name: string;
}
export interface producerRespon {
  success: boolean;
  message: string;
  values: producerType[];
}

export interface getMovieRespon {
  success: boolean;
  message: string;
  values: MovieItemType;
}
