import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { GifGrid } from "@src/components/GifGrid/GifGrid";

import { createServer } from "@tests/msw/server";
import { mockGifsResponse } from "@tests/jest.constants";

type RenderComponent = {
  props: {
    category: string;
    numberOfGifs: number;
    handleDeleteCategory: jest.Mock;
    handleOpenModalImage: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    category: "category",
    numberOfGifs: 10,
    handleDeleteCategory: jest.fn(),
    handleOpenModalImage: jest.fn(),
  };

  const { container } = render(
    <GifGrid
      category={props.category}
      numberOfGifs={props.numberOfGifs}
      handleDeleteCategory={props.handleDeleteCategory}
      handleOpenModalImage={props.handleOpenModalImage}
    />
  );

  return {
    container: container,
    props: props,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const props = {
    category: "category",
    numberOfGifs: 10,
    handleDeleteCategory: jest.fn(),
    handleOpenModalImage: jest.fn(),
  };

  const { container } = render(
    <GifGrid
      category={props.category}
      numberOfGifs={props.numberOfGifs}
      handleDeleteCategory={props.handleDeleteCategory}
      handleOpenModalImage={props.handleOpenModalImage}
    />
  );

  await screen.findAllByRole("link", { name: /go to user profile/i });

  return {
    container: container,
    props: props,
  };
};

describe("GifGrid.tsx", () => {
  describe("General Tests.", () => {
    createServer([
      {
        path: "/v1/gifs/search",
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const apiKey = url.searchParams.get("api_key");
          const q = url.searchParams.get("q");
          const limit = url.searchParams.get("limit");
          const offset = url.searchParams.get("offset");
          const rating = url.searchParams.get("rating");
          const lang = url.searchParams.get("lang");

          console.log(apiKey, q, limit, offset, rating, lang);

          return mockGifsResponse;
        },
      },
    ]);

    test("It must render the category with the delete button. You must also render a loading spinner before the gifs load.", () => {
      const { props, container } = renderComponent();

      const category = screen.getByRole("heading", { name: props.category });
      const buttonCategory = screen.getByRole("button", {
        name: `delete ${props.category}`,
      });
      const spinner = container.querySelector(".spinner");

      expect(category).toBeInTheDocument();
      expect(buttonCategory).toBeInTheDocument();
      expect(spinner).toBeInTheDocument();
    });

    test("It must render the list of Gifs once they are loaded from the API.", async () => {
      await asyncRenderComponent();

      const lists = screen.getAllByRole("list");
      const listGifs = lists.find((list) =>
        list.classList.contains("gif-grid__gifs")
      );

      expect(listGifs).toBeInTheDocument();
      expect(listGifs?.children).toHaveLength(mockGifsResponse.data.length);
    });

    test("It must execute the 'handleDeleteCategory' function when the delete category button is clicked.", async () => {
      const { props } = await asyncRenderComponent();

      const buttonDeleteCategory = screen.getByRole("button", {
        name: `delete ${props.category}`,
      });

      expect(buttonDeleteCategory).toBeInTheDocument();

      await user.click(buttonDeleteCategory);

      expect(props.handleDeleteCategory).toHaveBeenCalledTimes(1);
      expect(props.handleDeleteCategory).toHaveBeenCalledWith(props.category);
    });
  });
});
