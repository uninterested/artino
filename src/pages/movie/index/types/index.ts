export interface IMovieModel {
  id: string;
  title: string;
  icon: string;
  cover: string;
  video: string;
  stars: number;
  info: {
    director: string;
    year: string;
    duration: number;
  };
  type: string[];
  describe: string;
  actor: {
    name: string;
    icon: string;
  }[];
}
export interface IPageResultProps {
  data?: IMovieModel[];
}
export interface IPageMethodProps {
  mockData: Noop;
}
