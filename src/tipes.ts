export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}
export interface ImageData {
  total_pages: number;
  results: Image[];
}
