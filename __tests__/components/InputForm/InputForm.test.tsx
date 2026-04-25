import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { InputFormProps } from "@/types/props";

import InputForm from "@/components/InputForm/InputForm";

const mockOnChange = jest.fn();

const renderComponent = (props: Partial<InputFormProps> = {}): RenderResult => {
  const defaultProps: InputFormProps = {
    type: "text",
    placeholder: "Enter text",
    value: "",
    className: "input-class",
    onChange: mockOnChange,
    ...props,
  };
  return render(<InputForm {...defaultProps} />);
};

describe("InputForm", () => {
  describe("rendering", () => {
    it("should render the input element", () => {
      renderComponent();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with the provided placeholder", () => {
      renderComponent({ placeholder: "Search GIF" });
      expect(screen.getByPlaceholderText("Search GIF")).toBeInTheDocument();
    });

    it("should render with the provided string value", () => {
      renderComponent({ value: "cats" });
      expect(screen.getByRole("textbox")).toHaveValue("cats");
    });

    it("should render with the provided className", () => {
      renderComponent({ className: "custom-class" });
      expect(screen.getByRole("textbox")).toHaveClass("custom-class");
    });

    it("should render as a number input when type is number", () => {
      const { container } = renderComponent({ type: "number", value: 10 });
      const input = container.querySelector<HTMLInputElement>("input[type='number']");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(10);
    });
  });

  describe("behavior", () => {
    it("should call onChange when the user types", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.type(screen.getByRole("textbox"), "a");
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
