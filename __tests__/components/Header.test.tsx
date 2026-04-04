import { render, screen } from "@testing-library/react";

import Header from "@/components/Header/Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render 3 social links", () => {
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("should render the Facebook link with the correct aria-label", () => {
    expect(screen.getByRole("link", { name: "Visit Facebook page" })).toBeInTheDocument();
  });

  it("should render the Instagram link with the correct aria-label", () => {
    expect(screen.getByRole("link", { name: "Visit Instagram page" })).toBeInTheDocument();
  });

  it("should render the GitHub link with the correct aria-label", () => {
    expect(screen.getByRole("link", { name: "Visit GitHub repository" })).toBeInTheDocument();
  });

  it("should open all links in a new tab", () => {
    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });
});
