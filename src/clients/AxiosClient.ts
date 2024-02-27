import { IAxiosClient } from "@/utils/interfaces";
import axios, { AxiosInstance } from "axios";

let movie_client_api: AxiosInstance;
let cep_client_api: AxiosInstance;
let restClient: AxiosInstance;

export const setupClient = ({
  movieApiUrl,
  cepApiUrl,
  backUrl,
}: IAxiosClient) => {
  movie_client_api = axios.create({
    baseURL: movieApiUrl,
  });

  cep_client_api = axios.create({ baseURL: cepApiUrl });

  restClient = axios.create({ baseURL: backUrl });
};

export const setBearerAuthorization = (
  client: AxiosInstance,
  token: string
) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const movieClient = () => movie_client_api;
export const cepClient = () => cep_client_api;
export const backClient = () => restClient;
