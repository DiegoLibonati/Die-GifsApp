import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { GifItemProps } from "@/types/props";

import GifItem from "@/components/GifItem/GifItem";

const mockHandleOpenModalImage = jest.fn();

const renderComponent = (props: Partial<GifItemProps> = {}): RenderResult => {
  const defaultProps: GifItemProps = {
    title: "Test GIF",
    url: "https://example.com/gif.gif",
    avatar: "https://example.com/avatar.png",
    avatarName: "TestUser",
    avatarDescription: "A test user description",
    avatarProfileUrl: "https://giphy.com/TestUser/",
    gifDownload: "https://example.com/gif.webp",
    handleOpenModalImage: mockHandleOpenModalImage,
    ...props,
  };
  return render(<GifItem {...defaultProps} />);
};

describe("GifItem", () => {
  describe("rendering", () => {
    it("should render the gif image with correct src and alt", () => {
      renderComponent();
      const gifImg = screen.getByAltText("Test GIF");
      expect(gifImg).toBeInTheDocument();
      expect(gifImg).toHaveAttribute("src", "https://example.com/gif.gif");
    });

    it("should render the avatar image with correct src and alt", () => {
      renderComponent();
      const avatar = screen.getByAltText("TestUser");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");
    });

    it("should render the username", () => {
      renderComponent();
      expect(screen.getByText("TestUser")).toBeInTheDocument();
    });

    it("should render the description", () => {
      renderComponent();
      expect(screen.getByText("A test user description")).toBeInTheDocument();
    });

    it("should render the profile link with the correct href", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit TestUser's Giphy profile" })).toHaveAttribute(
        "href",
        "https://giphy.com/TestUser/"
      );
    });

    it("should render the download link with the correct href", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: 'Download "Test GIF" GIF' })).toHaveAttribute(
        "href",
        "https://example.com/gif.webp"
      );
    });

    it("should render the gif title as a paragraph", () => {
      renderComponent();
      expect(screen.getByText("Test GIF", { selector: "p" })).toBeInTheDocument();
    });

    it("should open all links in a new tab", () => {
      renderComponent();
      screen.getAllByRole("link").forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
    });
  });

  describe("behavior", () => {
    it("should call handleOpenModalImage with url and title when the title is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByText("Test GIF", { selector: "p" }));
      expect(mockHandleOpenModalImage).toHaveBeenCalledWith(
        "https://example.com/gif.gif",
        "Test GIF"
      );
    });

    it("should call handleOpenModalImage exactly once per click", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByText("Test GIF", { selector: "p" }));
      expect(mockHandleOpenModalImage).toHaveBeenCalledTimes(1);
    });
  });
});
