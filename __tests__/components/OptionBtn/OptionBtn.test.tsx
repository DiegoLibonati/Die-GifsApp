import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { OptionBtnProps } from "@/types/props";

import OptionBtn from "@/components/OptionBtn/OptionBtn";

const mockOnClick = jest.fn();

const renderComponent = (props: Partial<OptionBtnProps> = {}): RenderResult => {
  const defaultProps: OptionBtnProps = {
    description: "Remove All",
    onClick: mockOnClick,
    ...props,
  };
  return render(<OptionBtn {...defaultProps} />);
};

describe("OptionBtn", () => {
  describe("rendering", () => {
    it("should render the button with the provided description", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Remove All" })).toBeInTheDocument();
    });

    it("should render the description as visible text", () => {
      renderComponent({ description: "SURPRISE" });
      expect(screen.getByText("SURPRISE")).toBeInTheDocument();
    });

    it("should have the aria-label matching the description", () => {
      renderComponent({ description: "Clear all" });
      expect(screen.getByRole("button", { name: "Clear all" })).toHaveAttribute(
        "aria-label",
        "Clear all"
      );
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Remove All" }));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
