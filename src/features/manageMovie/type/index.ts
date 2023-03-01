export interface MovieType {
  name: string;
  moveDuration: number;
  image: string;
  trailer: string;
  description: string;
  directorId: string;
  cast: string;
  screensId: string[];
  categoryId: string[];
  age: number;
  dateStart: string;
  dateEnd: string;
}

export interface directorType {
  createAt: string;
  _id: string;
  name: string;
  dateOfBirth: string;
  image: string;
  joinDate: string;
  address: string;
  phoneNumber: string;
  email: string;
  introduce: string;
  male: boolean;
}

export interface screenType {
  _id: string;
  name: string;
  weekdayPrice: number;
  weekendPrice: number;
}

export interface MovieItemType {
  _id: string;
  name: string;
  moveDuration: number;
  image: string;
  trailer: string;
  description: string;
  director: directorType;
  cast: string;
  age: number;
  categories: CategoryItem[];
  screens: screenType[];
  dateStart: string;
  dateEnd: string;
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
  limit: number;
}
export interface IMovieCMS {
  movieGroupName: string;
  movies: MovieItemType[];
}

export interface MovieCMSResponse {
  success: boolean;
  message: string;
  values: IMovieCMS[];
}

export interface CategoryItem {
  _id: string;
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
