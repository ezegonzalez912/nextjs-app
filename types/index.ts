export interface Video {
  name: string,
  key: string
}

export interface Movie {
    backdrop_path: string,
    id: number,
    original_language: string,
    original_title?: string,
    original_name?: string,
    overview: string,
    title: string,
    video: Boolean,
    vote_average: number,
  }