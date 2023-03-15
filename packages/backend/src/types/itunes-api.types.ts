export interface IGetAlbums {
  resultCount: number;
  results: {
    artistName: string;
    collectionName: string;
  }[];
}
