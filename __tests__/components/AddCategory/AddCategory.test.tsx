import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { AddCategoryProps } from "@/types/props";

import AddCategory from "@/components/AddCategory/AddCategory";

const mockAddCategory = jest.fn();
const mockSetNumberOfGifs = jest.fn();

const renderComponent = (props: Partial<AddCategoryProps> = {}): RenderResult => {
  const defaultProps: AddCategoryProps = {
    numberOfGifs: 10,
    addCategory: mockAddCategory,
    setNumberOfGifs: mockSetNumberOfGifs,
    ...props,
  };
  return render(<AddCategory {...defaultProps} />);
};

describe("AddCategory", () => {
  describe("rendering", () => {
    it("should render the text input", () => {
      renderComponent();
      expect(screen.getByPlaceholderText("Buscar Gif")).toBeInTheDocument();
    });

    it("should render the submit button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Search GIFs by category" })).toBeInTheDocument();
    });

    it("should render the number input with the numberOfGifs value", () => {
      const { container } = renderComponent({ numberOfGifs: 5 });
      const numberInput = container.querySelector<HTMLInputElement>("input[type='number']");
      expect(numberInput).toHaveValue(5);
    });
  });

  describe("behavior", () => {
    it("should update the text input as the user types", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      expect(screen.getByPlaceholderText("Buscar Gif")).toHaveValue("cats");
    });

    it("should call addCategory with the trimmed input value on submit", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "  cats  ");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      expect(mockAddCategory).toHaveBeenCalledWith("cats");
    });

    it("should clear the text input after a successful submit", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "cats");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      expect(screen.getByPlaceholderText("Buscar Gif")).toHaveValue("");
    });

    it("should not call addCategory when the input is empty", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      expect(mockAddCategory).not.toHaveBeenCalled();
    });

    it("should not call addCategory when the input contains only whitespace", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.type(screen.getByPlaceholderText("Buscar Gif"), "   ");
      await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
      expect(mockAddCategory).not.toHaveBeenCalled();
    });

    it("should call setNumberOfGifs when the number input changes", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const numberInput = container.querySelector<HTMLInputElement>("input[type='number']")!;
      await user.clear(numberInput);
      await user.type(numberInput, "5");
      expect(mockSetNumberOfGifs).toHaveBeenCalled();
    });
  });
});
