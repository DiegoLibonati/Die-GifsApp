import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddCategoryProps } from "@/types/props";

import AddCategory from "@/components/AddCategory/AddCategory";

type RenderComponent = { container: HTMLElement; props: AddCategoryProps };

const mockAddCategory = jest.fn();
const mockSetNumberOfGifs = jest.fn();

const renderComponent = (overrides?: Partial<AddCategoryProps>): RenderComponent => {
  const props: AddCategoryProps = {
    numberOfGifs: 10,
    addCategory: mockAddCategory,
    setNumberOfGifs: mockSetNumberOfGifs,
    ...overrides,
  };
  const { container } = render(<AddCategory {...props} />);
  return { container, props };
};

describe("AddCategory", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the text input", () => {
    renderComponent();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render the number input with the current numberOfGifs value", () => {
    renderComponent({ numberOfGifs: 5 });
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });

  it("should render the submit button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Search GIFs by category" })).toBeInTheDocument();
  });

  it("should call addCategory with the trimmed value on submit", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.type(screen.getByRole("textbox"), "  cats  ");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    expect(mockAddCategory).toHaveBeenCalledWith("cats");
  });

  it("should not call addCategory when the input is empty", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    expect(mockAddCategory).not.toHaveBeenCalled();
  });

  it("should clear the text input after a successful submit", async () => {
    const user = userEvent.setup();
    renderComponent();
    const textInput = screen.getByRole("textbox");
    await user.type(textInput, "cats");
    await user.click(screen.getByRole("button", { name: "Search GIFs by category" }));
    expect(textInput).toHaveValue("");
  });

  it("should call setNumberOfGifs when the number input changes", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.clear(screen.getByRole("spinbutton"));
    await user.type(screen.getByRole("spinbutton"), "20");
    expect(mockSetNumberOfGifs).toHaveBeenCalled();
  });
});
