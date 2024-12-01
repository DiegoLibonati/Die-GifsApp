import { screen, render, within } from "@testing-library/react";

import { Header } from "./Header";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Header />);

  return {
    container: container,
  };
};

test("It must render the application header with the three links to redirect.", () => {
  const { container } = renderComponent();

  const header = container.querySelector(".header_container");
  const nav = screen.getByRole("navigation");
  const list = screen.getByRole("list");
  const listItems = screen.getAllByRole("listitem");

  expect(header).toBeInTheDocument();
  expect(nav).toBeInTheDocument();
  expect(list).toBeInTheDocument();

  for (let listItem of listItems) {
    expect(listItem).toBeInTheDocument();

    const anchor = within(listItem).getByRole("link");

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor.children).toHaveLength(1);
  }
});
