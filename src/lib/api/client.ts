import axios, { type AxiosError } from "axios";

import { credentialsStorage } from "@/lib/storage/credentialsStorage";

export const apiClient = axios.create({
  baseURL: "https://api.green-api.com",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const credentials = credentialsStorage.getCredentials();
  if (!credentials) {
    throw new Error("Нет учетных данных GREEN-API");
  }
  const path = config.url?.replace(
    "{token}",
    credentials.apiTokenInstance,
  );
  config.url = `/waInstance${credentials.idInstance}${path}`;
  return config;
});

apiClient.interceptors.response.use(undefined, (error: AxiosError) =>
  Promise.reject(
    new Error(
      error.response?.status === 401
        ? "Неверный idInstance или apiTokenInstance"
        : "Ошибка запроса к GREEN-API",
    ),
  ),
);
