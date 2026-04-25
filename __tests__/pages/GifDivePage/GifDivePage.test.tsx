import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { Gif } from "@/types/app";

import GifDivePage from "@/pages/GifDivePage/GifDivePage";

import gifService from "@/services/gifService";

import { gifs } from "@tests/__mocks__/gifs.mock";

type GetAllResult = Awaited<ReturnType<typeof gifService.getAll>>;
type GetRandomResult = Awaited<ReturnType<typeof gifService.getRandomGifsByCategory>>;

jest.mock("@/services/gifService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
    getRandomGifsByCategory: jest.fn(),
  },
}));

const makeGetAllResult = (data: Gif[] = []): GetAllResult => ({
  data,
  meta: { status: 200, msg: "OK", response_id: "test" },
  pagination: { total_count: data.length, count: data.length, offset: 0 },
});

const makeRandomResult = (gif: Gif = gifs[0]!): GetRandomResult => ({
  data: gif,
  meta: { status: 200, msg: "OK", response_id: "test" },
});

const renderPage = (): RenderResult => render(<GifDivePage />);

describe("GifDivePage", () => {
  beforeEach(() => {
    jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult());
    jest.mocked(gifService.getRandomGifsByCategory).mockResolvedValue(makeRandomResult());
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Gif Dive" })).toBeInTheDocument();
    });

    it("should render the search text input", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Buscar Gif")).toBeInTheDocument();
    });

    it("should render the remove all categories button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "REMOVE ALL CATEGORIES" })).toBeInTheDocument();
    });

    it("should render the surprise button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "SURPRISE" })).toBeInTheDocument();
    });

    it("should not render any gif grid initially", () => {
      renderPage();
      expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
    });
  });

  describe("behavior", () => {
    it("should add a gif grid when a category is submitted", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      expect(await screen.findByRole("heading", { name: "cats" })).toBeInTheDocument();
    });

    it("should not add a duplicate category", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      await screen.findByRole("heading", { name: "cats" });
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      expect(screen.getAllByRole("heading", { name: "cats" })).toHaveLength(1);
    });

    it("should remove all categories when REMOVE ALL CATEGORIES is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      await screen.findByRole("heading", { name: "cats" });
      await user.click(screen.getByRole("button", { name: "REMOVE ALL CATEGORIES" }));
      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "cats" })).not.toBeInTheDocument();
      });
    });

    it("should add a random category when SURPRISE is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "SURPRISE" }));
      expect(
        await screen.findByRole("heading", { name: "Bundesliga Raphael GIF" })
      ).toBeInTheDocument();
    });

    it("should delete a specific category when its delete button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      await screen.findByRole("heading", { name: "cats" });
      await user.click(screen.getByRole("button", { name: 'Delete "cats" category' }));
      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "cats" })).not.toBeInTheDocument();
      });
    });

    it("should open a modal when a gif title is clicked", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult(gifs));
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      const titleElement = await screen.findByText("Bundesliga Raphael GIF by FC Augsburg 1907", {
        selector: "p",
      });
      await user.click(titleElement);
      expect(await screen.findByRole("button", { name: "Close GIF preview" })).toBeInTheDocument();
    });

    it("should close the modal when the close button is clicked", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult(gifs));
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      const titleElement = await screen.findByText("Bundesliga Raphael GIF by FC Augsburg 1907", {
        selector: "p",
      });
      await user.click(titleElement);
      await user.click(await screen.findByRole("button", { name: "Close GIF preview" }));
      await waitFor(() => {
        expect(screen.queryByRole("button", { name: "Close GIF preview" })).not.toBeInTheDocument();
      });
    });
  });
});
