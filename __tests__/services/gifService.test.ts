import gifService from "@/services/gifService";

import { gifs } from "@tests/__mocks__/gifs.mock";

describe("gifService", () => {
  const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should call fetch with the category and limit params", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ data: gifs }),
      } as unknown as Response);

      await gifService.getAll("cats", 5);

      expect(mockedFetch).toHaveBeenCalledWith(expect.stringContaining("q=cats"));
      expect(mockedFetch).toHaveBeenCalledWith(expect.stringContaining("limit=5"));
    });

    it("should return the parsed response", async () => {
      const mockFetchJson = jest.fn();
      const mockResponse = {
        data: gifs,
        meta: { status: 200, msg: "OK", response_id: "1" },
        pagination: { total_count: 2, count: 2, offset: 0 },
      };
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue(mockResponse),
      } as unknown as Response);

      const result = await gifService.getAll("cats", 5);

      expect(result).toEqual(mockResponse);
    });

    it("should throw on a 404 response", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as unknown as Response);

      await expect(gifService.getAll("cats", 5)).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw on a 500 response", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as unknown as Response);

      await expect(gifService.getAll("cats", 5)).rejects.toThrow("HTTP error! status: 500");
    });
  });

  describe("getRandomGifsByCategory", () => {
    it("should call the random gifs endpoint", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ data: gifs[0] }),
      } as unknown as Response);

      await gifService.getRandomGifsByCategory();

      expect(mockedFetch).toHaveBeenCalledWith(expect.stringContaining("/v1/gifs/random"));
    });

    it("should return the parsed response", async () => {
      const mockFetchJson = jest.fn();
      const mockResponse = {
        data: gifs[0],
        meta: { status: 200, msg: "OK", response_id: "1" },
      };
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue(mockResponse),
      } as unknown as Response);

      const result = await gifService.getRandomGifsByCategory();

      expect(result).toEqual(mockResponse);
    });

    it("should throw on a non-ok response", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as unknown as Response);

      await expect(gifService.getRandomGifsByCategory()).rejects.toThrow("HTTP error! status: 500");
    });
  });
});
