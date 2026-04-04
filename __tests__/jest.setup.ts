import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

const mockFetch = jest.fn();

Object.assign(globalThis, { TextEncoder, TextDecoder });

globalThis.fetch = mockFetch;

jest.mock("@/constants/envs", () => {
  return {
    __esModule: true,
    default: {
      VITE_API_KEY: "api_key",
      VITE_API_URL: "https://api.com",
    },
  };
});
