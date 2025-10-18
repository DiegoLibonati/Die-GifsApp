import "@testing-library/jest-dom";

jest.mock("@src/constants/envs", () => {
  return {
    __esModule: true,
    default: {
      VITE_API_KEY: "api_key",
      VITE_API_URL: "https://api.com",
    },
  };
});
