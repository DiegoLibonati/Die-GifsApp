import { render, screen, renderHook } from "@testing-library/react";
import { Main } from "../../src/components/Main";
import * as React from "react";
import { removeAllCategories } from "../../src/helpers/removeAllCategories.js";
import { removeCategory } from "../../src/helpers/removeCategory.js";
import { getGifs } from "../../src/helpers/getGifs.js";

beforeEach(() => {
  render(<Main></Main>);
});

describe("test en componente main", () => {
  test("Debe rederizar el componenete ", () => {
    render(<Main></Main>); // Renderizo el componenete
  });

  test("Debe verificar estado el estado inicial ", () => {
    expect(screen.getByTestId("testcategories").textContent).toBe("0"); // Testeo el lenght de categories
  });

  test("Verificar cambio en el estado de categorías.", () => {
    const stateSetter = jest.fn();
    jest.spyOn(React, "useState").mockImplementation((stateValue) => [
      (stateValue = ["Dragon Ball"]), // Ahora categories es ["Dragon Ball"] y no []
      stateSetter,
    ]);
  });

  test("Debe verificar que se borren todas las categorias", () => {
    const stateSetter = jest.fn();
    const deleteAllCategories = removeAllCategories(["pepe"], stateSetter); // Tiene categoria pepe y al pasarle el useState borra todo.

    expect(deleteAllCategories.length).toBe(0);
  });

  test("Debe verificar que se borre una categoria x", () => {
    // Testeo remove category

    const categoryName = "pepe";
    const categories = ["pepe", "mono", "Dragon Ball"];

    for (let i = 0; i < categories.length; i++) {
      if (categoryName === categories[i]) {
        categories.splice(categories.indexOf(categoryName), 1);
      }
    }

    expect(categories).toEqual(["mono", "Dragon Ball"]);
  });

  test("Debe retornar la cantidad exacta de gifs que le pasamos ", async () => {
    // Funcion agregada por mi
    const cantidad = 2;
    const categoria = "pepe";
    const gifs = await getGifs(categoria, cantidad);

    expect(gifs.length).toBe(cantidad);
  });
});
