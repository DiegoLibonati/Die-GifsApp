import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GifGridProps } from "@/types/props";

import GifGrid from "@/components/GifGrid/GifGrid";

import gifService from "@/services/gifService";

import { gifs } from "@tests/__mocks__/gifs.mock";

type RenderComponent = { container: HTMLElement; props: GifGridProps };

const mockHandleDeleteCategory = jest.fn();
const mockHandleOpenModalImage = jest.fn();

jest.mock("@/services/gifService");

const mockGetAllResponse = {
  data: gifs,
  meta: { status: 200, msg: "OK", response_id: "1" },
  pagination: { total_count: 2, count: 2, offset: 0 },
};

const renderComponent = (overrides?: Partial<GifGridProps>): RenderComponent => {
  const props: GifGridProps = {
    category: "cats",
    numberOfGifs: 10,
    handleDeleteCategory: mockHandleDeleteCategory,
    handleOpenModalImage: mockHandleOpenModalImage,
    ...overrides,
  };
  const { container } = render(<GifGrid {...props} />);
  return { container, props };
};

describe("GifGrid", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category title", async () => {
    (gifService.getAll as jest.Mock).mockResolvedValueOnce(mockGetAllResponse);
    renderComponent({ category: "dogs" });
    expect(await screen.findByRole("heading", { name: "dogs" })).toBeInTheDocument();
  });

  it("should call gifService.getAll with the correct category and numberOfGifs", async () => {
    (gifService.getAll as jest.Mock).mockResolvedValueOnce(mockGetAllResponse);
    renderComponent({ category: "cats", numberOfGifs: 5 });
    await screen.findByRole("heading", { name: "cats" });
    expect(gifService.getAll).toHaveBeenCalledWith("cats", 5);
  });

  it("should render gif items after loading", async () => {
    (gifService.getAll as jest.Mock).mockResolvedValueOnce(mockGetAllResponse);
    renderComponent();
    expect(await screen.findByText(gifs[0].title)).toBeInTheDocument();
  });

  it("should render the delete button with the correct aria-label", async () => {
    (gifService.getAll as jest.Mock).mockResolvedValueOnce(mockGetAllResponse);
    renderComponent({ category: "cats" });
    expect(
      await screen.findByRole("button", { name: 'Delete "cats" category' })
    ).toBeInTheDocument();
  });

  it("should call handleDeleteCategory with the category when the delete button is clicked", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValueOnce(mockGetAllResponse);
    renderComponent({ category: "cats" });
    await user.click(await screen.findByRole("button", { name: 'Delete "cats" category' }));
    expect(mockHandleDeleteCategory).toHaveBeenCalledWith("cats");
  });

  it("should call handleOpenModalImage when a gif title is clicked", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValueOnce(mockGetAllResponse);
    renderComponent();
    await user.click(await screen.findByText(gifs[0].title));
    expect(mockHandleOpenModalImage).toHaveBeenCalledWith(
      gifs[0].images.original.url,
      gifs[0].title
    );
  });
});
