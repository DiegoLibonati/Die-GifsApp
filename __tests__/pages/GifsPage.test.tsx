import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GifsPage from "@/pages/GifsPage/GifsPage";

import gifService from "@/services/gifService";

import { gifs } from "@tests/__mocks__/gifs.mock";

type RenderPage = { container: HTMLElement };

jest.mock("@/services/gifService");

const mockGetAllResponse = {
  data: gifs,
  meta: { status: 200, msg: "OK", response_id: "1" },
  pagination: { total_count: 2, count: 2, offset: 0 },
};

const renderPage = (): RenderPage => {
  const { container } = render(<GifsPage />);
  return { container };
};

describe("GifsPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page title", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Die GifApp" })).toBeInTheDocument();
  });

  it("should render the 'Remove All Categories' and 'Surprise' buttons", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "REMOVE ALL CATEGORIES" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SURPRISE" })).toBeInTheDocument();
  });

  it("should render the search form with its submit button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Search GIFs by category" })).toBeInTheDocument();
  });

  it("should render a gif grid when a category is added", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValue(mockGetAllResponse);
    renderPage();
    await user.type(screen.getByRole("textbox"), "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    expect(await screen.findByRole("heading", { name: "cats" })).toBeInTheDocument();
  });

  it("should not add a duplicate category", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValue(mockGetAllResponse);
    renderPage();
    await user.type(screen.getByRole("textbox"), "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    await screen.findByRole("heading", { name: "cats" });
    await user.type(screen.getByRole("textbox"), "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    expect(screen.getAllByRole("heading", { name: "cats" })).toHaveLength(1);
  });

  it("should remove all categories when the 'Remove All' button is clicked", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValue(mockGetAllResponse);
    renderPage();
    await user.type(screen.getByRole("textbox"), "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    await screen.findByRole("heading", { name: "cats" });
    await user.click(screen.getByRole("button", { name: "REMOVE ALL CATEGORIES" }));
    expect(screen.queryByRole("heading", { name: "cats" })).not.toBeInTheDocument();
  });

  it("should add a category via the surprise button", async () => {
    const user = userEvent.setup();
    (gifService.getRandomGifsByCategory as jest.Mock).mockResolvedValueOnce({
      data: { ...gifs[0], title: "Surprise GIF by TestUser" },
      meta: { status: 200, msg: "OK", response_id: "1" },
    });
    (gifService.getAll as jest.Mock).mockResolvedValue(mockGetAllResponse);
    renderPage();
    await user.click(screen.getByRole("button", { name: "SURPRISE" }));
    expect(await screen.findByRole("heading", { name: "Surprise GIF" })).toBeInTheDocument();
  });

  it("should open the modal when a gif title is clicked", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValue(mockGetAllResponse);
    renderPage();
    await user.type(screen.getByRole("textbox"), "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    await user.click(await screen.findByText(gifs[0].title));
    expect(screen.getByRole("button", { name: "Close GIF preview" })).toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", async () => {
    const user = userEvent.setup();
    (gifService.getAll as jest.Mock).mockResolvedValue(mockGetAllResponse);
    renderPage();
    await user.type(screen.getByRole("textbox"), "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    await user.click(await screen.findByText(gifs[0].title));
    await user.click(screen.getByRole("button", { name: "Close GIF preview" }));
    expect(screen.queryByRole("button", { name: "Close GIF preview" })).not.toBeInTheDocument();
  });
});
