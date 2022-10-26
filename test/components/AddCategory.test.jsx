import { AddCategory } from "../../src/components/AddCategory";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Test en <AddCategory/>", () => {
  test("Debe cambiar el valor del input", () => {
    render(<AddCategory></AddCategory>);

    screen.debug();

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Goku" } });

    expect(input.value).toBe("Goku");
  });

  test("Debe llamar la funcion addCategory", () => {
    const inputValue = "Goku";

    const addCategory = jest.fn();

    render(<AddCategory addCategory={addCategory}></AddCategory>);

    const input = screen.getByRole("textbox");

    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: inputValue } });

    fireEvent.submit(form);

    screen.debug();
    expect(input.value).toBe("");

    expect(addCategory).toHaveBeenCalled();
    expect(addCategory).toHaveBeenCalledTimes(2);

    expect(addCategory).toHaveBeenCalledWith(inputValue);
  });

  test("No se debe llamar la funcion addCategory, si el input esta vacio", () => {
    const addCategory = jest.fn();
    render(<AddCategory addCategory={addCategory}></AddCategory>);

    const form = screen.getByRole("form");

    fireEvent.submit(form);

    expect(addCategory).not.toHaveBeenCalled();
  });
});
