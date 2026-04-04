import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputFormProps } from "@/types/props";

import InputForm from "@/components/InputForm/InputForm";

type RenderComponent = { container: HTMLElement };

const mockOnChange = jest.fn();

const renderComponent = (overrides?: Partial<InputFormProps>): RenderComponent => {
  const props: InputFormProps = {
    type: "text",
    placeholder: "Search",
    value: "",
    className: "test-input",
    onChange: mockOnChange,
    ...overrides,
  };
  const { container } = render(<InputForm {...props} />);
  return { container };
};

describe("InputForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a text input", () => {
    renderComponent();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render a number input", () => {
    renderComponent({ type: "number" });
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("should render with the correct placeholder", () => {
    renderComponent({ placeholder: "Type a category" });
    expect(screen.getByPlaceholderText("Type a category")).toBeInTheDocument();
  });

  it("should render with the correct value", () => {
    renderComponent({ value: "dogs" });
    expect(screen.getByDisplayValue("dogs")).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.type(screen.getByRole("textbox"), "a");
    expect(mockOnChange).toHaveBeenCalled();
  });
});
