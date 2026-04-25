import gifService from "@/services/gifService";

import { gifs } from "@tests/__mocks__/gifs.mock";

const mockGetAllResponse = {
  data: gifs,
  meta: { status: 200, msg: "OK", response_id: "test" },
  pagination: { total_count: 2, count: 2, offset: 0 },
};
const mockRandomResponse = {
  data: gifs[0]!,
  meta: { status: 200, msg: "OK", response_id: "test" },
};

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    VITE_API_KEY: "api_key",
    VITE_API_URL: "https://api.com",
  },
}));

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("gifService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should return the response with gif data", async () => {
        mockFetchSuccess(mockGetAllResponse);
        const result = await gifService.getAll("cats", 10);
        expect(result).toEqual(mockGetAllResponse);
      });

      it("should call fetch with the correct search endpoint", async () => {
        mockFetchSuccess(mockGetAllResponse);
        await gifService.getAll("cats", 10);
        expect(global.fetch).toHaveBeenCalledWith(
          "/v1/gifs/search?api_key=api_key&q=cats&limit=10&offset=0&rating=r&lang=en"
        );
      });

      it("should include the category in the fetch url", async () => {
        mockFetchSuccess(mockGetAllResponse);
        await gifService.getAll("dogs", 5);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("q=dogs"));
      });

      it("should include the limit in the fetch url", async () => {
        mockFetchSuccess(mockGetAllResponse);
        await gifService.getAll("cats", 20);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("limit=20"));
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status", async () => {
        mockFetchError(500);
        await expect(gifService.getAll("cats", 10)).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error for 404 status", async () => {
        mockFetchError(404);
        await expect(gifService.getAll("cats", 10)).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError("Failed to fetch");
        await expect(gifService.getAll("cats", 10)).rejects.toThrow("Failed to fetch");
      });
    });
  });

  describe("getRandomGifsByCategory", () => {
    describe("when fetch succeeds", () => {
      it("should return the response with a single gif", async () => {
        mockFetchSuccess(mockRandomResponse);
        const result = await gifService.getRandomGifsByCategory();
        expect(result).toEqual(mockRandomResponse);
      });

      it("should call fetch with the correct random endpoint", async () => {
        mockFetchSuccess(mockRandomResponse);
        await gifService.getRandomGifsByCategory();
        expect(global.fetch).toHaveBeenCalledWith("/v1/gifs/random?api_key=api_key&tag=&rating=g");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status", async () => {
        mockFetchError(503);
        await expect(gifService.getRandomGifsByCategory()).rejects.toThrow(
          "HTTP error! status: 503"
        );
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError();
        await expect(gifService.getRandomGifsByCategory()).rejects.toThrow("Network error");
      });
    });
  });
});
