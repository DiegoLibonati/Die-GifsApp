import "@testing-library/jest-dom";

import { Config } from "../src/entities/entities";

export const CONFIG_MOCK: Config = {
  VITE_API_KEY: "api_key",
  VITE_API_URL: "https://api.com",
};

jest.mock("../src/constants/config.ts", () => ({
  get CONFIG() {
    return CONFIG_MOCK;
  },
}));
