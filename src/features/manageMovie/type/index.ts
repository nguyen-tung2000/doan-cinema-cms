export interface MovieType {
  name: string;
  move_duration: number;
  image: string;
  trailer: string;
  description: string;
  director_id: string;
  cast: string;
  screens_id: string[];
  categories_id: string[];
  age: number;
  date_start: string;
  date_end: string;
}

export interface directorType {
  create_at: string;
  id: string;
  name: string;
  date_of_birth: string;
  image: string;
  join_date: string;
  address: string;
  phone_number: string;
  email: string;
  introduce: string;
  male: boolean;
}

export interface screenType {
  id: string;
  name: string;
  weekday_price: number;
  weekend_price: number;
}

export interface MovieItemType {
  id: string;
  name: string;
  move_duration: number;
  image: string;
  trailer: string;
  description: string;
  director: directorType;
  cast: string;
  age: number;
  categories: CategoryItem[];
  screens: screenType[];
  date_start: string;
  date_end: string;
}

export interface MovieRespon {
  success: boolean;
  message: string;
  value: {
    movie: MovieType[];
  };
  errors: MovieType;
}
export interface MoviesResponse {
  success: boolean;
  message: string;
  values: {
    movies: MovieItemType[];
    hasMore: boolean;
    pageNumber: number;
  };
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
  id: string;
  name: string;
  image: string;
}

export interface CategoryRespon {
  success: boolean;
  message: string;
  values: {
    categories: CategoryItem[];
  };
}

export interface DirectorRespon {
  success: boolean;
  message: string;
  values: {
    directors: directorType[];
  };
}

export interface ScreenRespon {
  success: boolean;
  message: string;
  values: {
    screens: screenType[];
  };
}

export interface getMovieRespon {
  success: boolean;
  message: string;
  values: {
    movie: MovieItemType;
  };
}
