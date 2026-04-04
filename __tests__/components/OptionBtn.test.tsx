import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OptionBtnProps } from "@/types/props";

import OptionBtn from "@/components/OptionBtn/OptionBtn";

type RenderComponent = { container: HTMLElement };

const mockOnClick = jest.fn();

const renderComponent = (overrides?: Partial<OptionBtnProps>): RenderComponent => {
  const props: OptionBtnProps = {
    description: "TEST BUTTON",
    onClick: mockOnClick,
    ...overrides,
  };
  const { container } = render(<OptionBtn {...props} />);
  return { container };
};

describe("OptionBtn", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the description as visible text", () => {
    renderComponent();
    expect(screen.getByText("TEST BUTTON")).toBeInTheDocument();
  });

  it("should use the description as the aria-label", () => {
    renderComponent({ description: "REMOVE ALL CATEGORIES" });
    expect(screen.getByRole("button", { name: "REMOVE ALL CATEGORIES" })).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
