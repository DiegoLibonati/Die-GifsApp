import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GifItemProps } from "@/types/props";

import GifItem from "@/components/GifItem/GifItem";

type RenderComponent = { container: HTMLElement; props: GifItemProps };

const mockHandleOpenModalImage = jest.fn();

const renderComponent = (overrides?: Partial<GifItemProps>): RenderComponent => {
  const props: GifItemProps = {
    title: "Test GIF",
    url: "https://media.giphy.com/test.gif",
    avatar: "https://media.giphy.com/avatar.png",
    avatarName: "TestUser",
    avatarDescription: "A test user description",
    avatarProfileUrl: "https://giphy.com/testuser",
    gifDownload: "https://media.giphy.com/test.webp",
    handleOpenModalImage: mockHandleOpenModalImage,
    ...overrides,
  };
  const { container } = render(<GifItem {...props} />);
  return { container, props };
};

describe("GifItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the gif image with the correct src and alt", () => {
    renderComponent();
    const img = screen.getByAltText("Test GIF");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://media.giphy.com/test.gif");
  });

  it("should render the avatar image with the correct src and alt", () => {
    renderComponent();
    const avatar = screen.getByAltText("TestUser");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://media.giphy.com/avatar.png");
  });

  it("should render the username", () => {
    renderComponent();
    expect(screen.getByText("TestUser")).toBeInTheDocument();
  });

  it("should render the user description", () => {
    renderComponent();
    expect(screen.getByText("A test user description")).toBeInTheDocument();
  });

  it("should render the profile link with the correct aria-label", () => {
    renderComponent();
    expect(
      screen.getByRole("link", { name: "Visit TestUser's Giphy profile" })
    ).toBeInTheDocument();
  });

  it("should render the download link with the correct aria-label and href", () => {
    renderComponent();
    const link = screen.getByRole("link", { name: 'Download "Test GIF" GIF' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://media.giphy.com/test.webp");
  });

  it("should call handleOpenModalImage with the url and title when the title is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText("Test GIF"));
    expect(mockHandleOpenModalImage).toHaveBeenCalledWith(
      "https://media.giphy.com/test.gif",
      "Test GIF"
    );
  });
});
