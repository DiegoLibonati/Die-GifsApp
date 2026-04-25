import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { Gif } from "@/types/app";
import type { GifGridProps } from "@/types/props";

import GifGrid from "@/components/GifGrid/GifGrid";

import gifService from "@/services/gifService";

import { gifs } from "@tests/__mocks__/gifs.mock";

type GetAllResult = Awaited<ReturnType<typeof gifService.getAll>>;

const mockHandleDeleteCategory = jest.fn();
const mockHandleOpenModalImage = jest.fn();

jest.mock("@/services/gifService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
  },
}));

const makeGetAllResult = (data: Gif[] = []): GetAllResult => ({
  data,
  meta: { status: 200, msg: "OK", response_id: "test" },
  pagination: { total_count: data.length, count: data.length, offset: 0 },
});

const renderComponent = (props: Partial<GifGridProps> = {}): RenderResult => {
  const defaultProps: GifGridProps = {
    category: "cats",
    numberOfGifs: 10,
    handleDeleteCategory: mockHandleDeleteCategory,
    handleOpenModalImage: mockHandleOpenModalImage,
    ...props,
  };
  return render(<GifGrid {...defaultProps} />);
};

describe("GifGrid", () => {
  describe("rendering", () => {
    it("should render the category title", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult());
      await act(async () => {
        renderComponent();
        await Promise.resolve();
      });
      expect(screen.getByRole("heading", { name: "cats" })).toBeInTheDocument();
    });

    it("should render the delete button for the category", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult());
      await act(async () => {
        renderComponent();
        await Promise.resolve();
      });
      expect(screen.getByRole("button", { name: 'Delete "cats" category' })).toBeInTheDocument();
    });

    it("should render gifs after the service resolves", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult(gifs));
      renderComponent();
      expect(
        await screen.findByAltText("Bundesliga Raphael GIF by FC Augsburg 1907")
      ).toBeInTheDocument();
    });

    it("should render the second gif by its avatar name", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult(gifs));
      renderComponent();
      expect(await screen.findByText("Warrantti")).toBeInTheDocument();
    });

    it("should use private profile fallbacks when a gif has no user", async () => {
      const { user: _user, ...gifBase } = gifs[0]!;
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult([gifBase as Gif]));
      renderComponent();
      await waitFor(() => {
        expect(screen.getAllByText("It is a private profile")).toHaveLength(2);
      });
    });

    it("should show a spinner while loading", async () => {
      let resolveGetAll!: (value: GetAllResult) => void;
      jest.mocked(gifService.getAll).mockImplementation(
        () =>
          new Promise<GetAllResult>((resolve) => {
            resolveGetAll = resolve;
          })
      );
      const { container } = renderComponent();
      await waitFor(() => {
        expect(container.querySelector<HTMLDivElement>(".spinner")).toBeInTheDocument();
      });
      resolveGetAll(makeGetAllResult());
      await waitFor(() => {
        expect(container.querySelector<HTMLDivElement>(".spinner")).not.toBeInTheDocument();
      });
    });
  });

  describe("behavior", () => {
    it("should call gifService.getAll with category and numberOfGifs on mount", async () => {
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult());
      renderComponent({ category: "dogs", numberOfGifs: 5 });
      await waitFor(() => {
        expect(jest.mocked(gifService.getAll)).toHaveBeenCalledWith("dogs", 5);
      });
    });

    it("should call handleDeleteCategory with the category when the delete button is clicked", async () => {
      const user = userEvent.setup();
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult());
      renderComponent();
      await user.click(screen.getByRole("button", { name: 'Delete "cats" category' }));
      expect(mockHandleDeleteCategory).toHaveBeenCalledWith("cats");
    });

    it("should call handleOpenModalImage with url and title when a gif title is clicked", async () => {
      const user = userEvent.setup();
      const gif0 = gifs[0]!;
      jest.mocked(gifService.getAll).mockResolvedValue(makeGetAllResult(gifs));
      renderComponent();
      const titleElement = await screen.findByText("Bundesliga Raphael GIF by FC Augsburg 1907", {
        selector: "p",
      });
      await user.click(titleElement);
      expect(mockHandleOpenModalImage).toHaveBeenCalledWith(gif0.images.original.url, gif0.title);
    });
  });
});
