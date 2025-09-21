import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { InputForm } from "@src/components/InputForm/InputForm";

type RenderComponent = {
  props: {
    type: string;
    placeholder: string;
    value: string | number;
    className: string;
    onChange: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    type: "text",
    placeholder: "input placeholder",
    value: "",
    className: "input_form",
    onChange: jest.fn(),
  };

  const { container } = render(
    <InputForm
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={props.className}
    />
  );

  return {
    container: container,
    props: props,
  };
};

describe("InputForm.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the input with the respective props.", () => {
      const { props } = renderComponent();

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", props.type);
      expect(input).toHaveAttribute("value", props.value);
      expect(input).toHaveAttribute("placeholder", props.placeholder);
      expect(input).toHaveClass(props.className);
    });

    test("It must change input value when written to it.", async () => {
      const value = "Hi3";

      const { props } = renderComponent();

      const input = screen.getByRole("textbox") as HTMLInputElement;

      await user.click(input);
      await user.keyboard(value);

      expect(props.onChange).toHaveBeenCalledTimes(value.length);
    });
  });
});
