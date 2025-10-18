import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { OptionBtnProps } from "@src/entities/props";

import { OptionBtn } from "@src/components/OptionBtn/OptionBtn";

type RenderComponent = {
  props: {
    onClick: jest.Mock;
  } & OptionBtnProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    onClick: jest.fn(),
    description: "1234 description.",
  };

  const { container } = render(
    <OptionBtn description={props.description} onClick={props.onClick} />
  );

  return {
    container: container,
    props: props,
  };
};

describe("OptionBtn.tsx", () => {
  describe("General Tests.", () => {
    test("It must render a button with its respective description.", () => {
      const { props } = renderComponent();

      const btn = screen.getByRole("button", {
        name: `${props.description} button`,
      });

      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent(props.description);
    });

    test("It must execute the function that is passed to it by props.", async () => {
      const { props } = renderComponent();

      const btn = screen.getByRole("button", {
        name: `${props.description} button`,
      });

      await user.click(btn);

      expect(btn).toBeInTheDocument();
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
