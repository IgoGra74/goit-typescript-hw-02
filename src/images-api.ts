import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ImageData } from "./tipes";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const fetchImagesWithTopic = async (
  topic: string = "",
  page: number | null
): Promise<ImageData> => {
  const ACCESS_KEY: string = "ePieEpooHVSDfaLGZpFPpKrHAmfSzEKF9sh9R4gAZaU";

  const option = {
    params: {
      client_id: ACCESS_KEY,
      query: topic,
      orientation: "landscape",
      page: page,
      per_page: 16,
    },
  };

  try {
    const response: AxiosResponse<ImageData> = await instance.get(
      "/search/photos/",
      option
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch images from Unsplash API");
  }
};
