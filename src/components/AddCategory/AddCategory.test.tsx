import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { AddCategory } from "./AddCategory";

type RenderComponent = {
  props: {
    numberOfGifs: number;
    setNumberOfGifs: jest.Mock;
    addCategory: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    numberOfGifs: 10,
    setNumberOfGifs: jest.fn(),
    addCategory: jest.fn(),
  };

  const { container } = render(
    <AddCategory
      numberOfGifs={props.numberOfGifs}
      addCategory={props.addCategory}
      setNumberOfGifs={props.setNumberOfGifs}
    />
  );

  return {
    container: container,
    props: props,
  };
};

test("It must render the form with the inputs and the submit button.", () => {
  const { container, props } = renderComponent();

  const form = container.querySelector("form");
  const inputText = screen.getByRole("textbox");
  const inputNumber = container.querySelector(
    ".gifs_container_form_inputValueNumber"
  ) as HTMLInputElement;
  const button = screen.getByRole("button", { name: /search gifs/i });

  expect(form).toBeInTheDocument();
  expect(inputText).toBeInTheDocument();
  expect(inputText).toHaveAttribute("type", "text");
  expect(inputText).toHaveAttribute("placeholder", "Buscar Gif");
  expect(inputText).not.toHaveValue();
  expect(inputNumber).toBeInTheDocument();
  expect(inputNumber).toHaveValue(props.numberOfGifs);
  expect(inputNumber).toHaveAttribute("type", "number");
  expect(inputNumber).toHaveAttribute("placeholder", "");
  expect(button).toBeInTheDocument();
});

test("It must change the value of the inputs when you edit its content.", async () => {
  const InputTextValue = "Valuecito";

  const { container, props } = renderComponent();

  const inputText = screen.getByRole("textbox");
  const inputNumber = container.querySelector(
    ".gifs_container_form_inputValueNumber"
  ) as HTMLInputElement;

  expect(inputText).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(inputNumber).toHaveValue(props.numberOfGifs);

  await user.clear(inputText);
  await user.click(inputText);
  await user.keyboard(InputTextValue);

  expect(inputText).toHaveValue(InputTextValue);
});

test("The submit functions should not be executed if an empty value is entered in the text.", async () => {
  const { props } = renderComponent();

  const inputText = screen.getByRole("textbox");
  const buttonSubmit = screen.getByRole("button", { name: /search gifs/i });

  expect(inputText).toBeInTheDocument();
  expect(buttonSubmit).toBeInTheDocument();

  await user.clear(inputText);
  await user.click(buttonSubmit);

  expect(props.addCategory).toHaveBeenCalledTimes(0);
  expect(props.setNumberOfGifs).toHaveBeenCalledTimes(0);
});

test("The functions within the submit must be executed when the submit button is clicked.", async () => {
  const InputTextValue = "Valuecito";

  const { container, props } = renderComponent();

  const inputText = screen.getByRole("textbox");
  const inputNumber = container.querySelector(
    ".gifs_container_form_inputValueNumber"
  ) as HTMLInputElement;
  const buttonSubmit = screen.getByRole("button", { name: /search gifs/i });

  expect(inputText).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(inputNumber).toHaveValue(props.numberOfGifs);
  expect(buttonSubmit).toBeInTheDocument();

  await user.clear(inputText);
  await user.click(inputText);
  await user.keyboard(InputTextValue);

  expect(inputText).toHaveValue(InputTextValue);

  await user.click(buttonSubmit);

  expect(props.addCategory).toHaveBeenCalledTimes(1);
  expect(props.addCategory).toHaveBeenCalledWith(InputTextValue.trim());
  expect(props.setNumberOfGifs).toHaveBeenCalledTimes(1);
  expect(props.setNumberOfGifs).toHaveBeenCalledWith(props.numberOfGifs);
  expect(inputText).toHaveValue("");
});
