import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Header from "@/components/Header/Header";

const renderComponent = (): RenderResult => render(<Header />);

describe("Header", () => {
  describe("rendering", () => {
    it("should render the header element", () => {
      renderComponent();
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the navigation", () => {
      renderComponent();
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should render the Facebook link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Facebook page" })).toBeInTheDocument();
    });

    it("should render the Instagram link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit Instagram page" })).toBeInTheDocument();
    });

    it("should render the GitHub link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Visit GitHub repository" })).toBeInTheDocument();
    });

    it("should render exactly three social links", () => {
      renderComponent();
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    it("should open all social links in a new tab", () => {
      renderComponent();
      screen.getAllByRole("link").forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
      });
    });
  });
});
