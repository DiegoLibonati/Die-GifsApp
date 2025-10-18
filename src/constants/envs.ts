import { Envs } from "@src/entities/envs";

const envs: Envs = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_API_KEY: import.meta.env.VITE_API_KEY,
};

export default envs;
