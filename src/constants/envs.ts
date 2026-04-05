import type { Envs } from "@/types/envs";

const envs: Envs = {
  VITE_API_URL: import.meta.env.VITE_API_URL as string,
  VITE_API_KEY: import.meta.env.VITE_API_KEY as string,
};

export default envs;
