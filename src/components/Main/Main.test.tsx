import { screen, render, within } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Main } from "./Main";

import { createServer } from "../../tests/msw/server";
import {
  GIF_RANDOM_CATEGORY_RESPONSE,
  GIFS_MOCK_RESPONSE,
} from "../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const INPUT_TEXT = "Valuecieto";
const INPUT_NUMBER = 15;

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

      return GIFS_MOCK_RESPONSE;
    },
  },
  {
    path: "/v1/gifs/random",
    method: "get",
    res: ({ request }) => {
      const url = new URL(request.url);
      const apiKey = url.searchParams.get("api_key");
      const tag = url.searchParams.get("tag");
      const rating = url.searchParams.get("rating");

      console.log(apiKey, tag, rating);

      return GIF_RANDOM_CATEGORY_RESPONSE;
    },
  },
]);

const renderComponent = (): RenderComponent => {
  const { container } = render(<Main />);

  return {
    container: container,
  };
};

test("It must render the title of the APP.", () => {
  renderComponent();

  const headingApp = screen.getByRole("heading", { name: /die gifapp/i });

  expect(headingApp).toBeInTheDocument();
});

test("It must render the category added through the form with their respective gifs.", async () => {
  const { container } = renderComponent();

  const inputText = screen.getByRole("textbox");
  const inputNumber = container.querySelector(
    ".gifs_container_form_inputValueNumber"
  ) as HTMLInputElement;
  const btnSubmit = screen.getByRole("button", { name: /search gifs/ });

  expect(inputText).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await user.clear(inputText);
  await user.click(inputText);
  await user.keyboard(INPUT_TEXT);

  expect(inputText).toHaveValue(INPUT_TEXT);

  await user.clear(inputNumber);
  await user.click(inputNumber);
  await user.keyboard(String(INPUT_NUMBER));

  expect(inputNumber).toHaveValue(INPUT_NUMBER);

  await user.click(btnSubmit);

  const headingCategory = screen.getByRole("heading", { name: INPUT_TEXT });
  const lists = screen.getAllByRole("list");
  const gifLists = lists.find((list) =>
    list.classList.contains("gifs_container_category_list")
  );

  expect(headingCategory).toBeInTheDocument();
  expect(gifLists).toBeInTheDocument();
  expect(gifLists?.children).toHaveLength(GIFS_MOCK_RESPONSE.data.length);
});

test("It must remove all categories when you click 'REMOVE ALL CATEGORIES'.", async () => {
  const { container } = renderComponent();

  const inputText = screen.getByRole("textbox");
  const inputNumber = container.querySelector(
    ".gifs_container_form_inputValueNumber"
  ) as HTMLInputElement;
  const btnSubmit = screen.getByRole("button", { name: /search gifs/ });

  expect(inputText).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await user.clear(inputText);
  await user.click(inputText);
  await user.keyboard(INPUT_TEXT);

  expect(inputText).toHaveValue(INPUT_TEXT);

  await user.clear(inputNumber);
  await user.click(inputNumber);
  await user.keyboard(String(INPUT_NUMBER));

  expect(inputNumber).toHaveValue(INPUT_NUMBER);

  await user.click(btnSubmit);

  const headingCategory = screen.getByRole("heading", { name: INPUT_TEXT });
  const lists = screen.getAllByRole("list");
  const gifLists = lists.find((list) =>
    list.classList.contains("gifs_container_category_list")
  );

  expect(headingCategory).toBeInTheDocument();
  expect(gifLists).toBeInTheDocument();
  expect(gifLists?.children).toHaveLength(GIFS_MOCK_RESPONSE.data.length);

  const btnRemoveAllCategories = screen.getByRole("button", {
    name: `delete ${INPUT_TEXT}`,
  });

  expect(btnRemoveAllCategories).toBeInTheDocument();

  await user.click(btnRemoveAllCategories);

  expect(headingCategory).not.toBeInTheDocument();
  expect(gifLists).not.toBeInTheDocument();
});

test("It should render a random category when you click 'SURPRISE'.", async () => {
  renderComponent();

  const btnSurprise = screen.getByRole("button", { name: /surprise/i });

  expect(btnSurprise).toBeInTheDocument();

  await user.click(btnSurprise);

  const headingCategory = screen.getByRole("heading", {
    name: GIF_RANDOM_CATEGORY_RESPONSE.data.title.split("by")[0].trim(),
  });

  expect(headingCategory).toBeInTheDocument();

  await screen.findAllByRole("link", { name: /go to user profile/i });

  const lists = screen.getAllByRole("list");
  const gifLists = lists.find((list) =>
    list.classList.contains("gifs_container_category_list")
  );

  expect(gifLists).toBeInTheDocument();
  expect(gifLists?.children).toHaveLength(
    Array.from(GIFS_MOCK_RESPONSE.data).length
  );
});

test("It should render the modal with a gif when the title of a gif is clicked.", async () => {
  renderComponent();

  const btnSurprise = screen.getByRole("button", { name: /surprise/i });

  expect(btnSurprise).toBeInTheDocument();

  await user.click(btnSurprise);

  const headingCategory = screen.getByRole("heading", {
    name: GIF_RANDOM_CATEGORY_RESPONSE.data.title.split("by")[0].trim(),
  });

  expect(headingCategory).toBeInTheDocument();

  await screen.findAllByRole("link", { name: /go to user profile/i });

  const lists = screen.getAllByRole("list");
  const gifLists = lists.find((list) =>
    list.classList.contains("gifs_container_category_list")
  );

  expect(gifLists).toBeInTheDocument();
  expect(gifLists?.children).toHaveLength(
    Array.from(GIFS_MOCK_RESPONSE.data).length
  );

  const gif = gifLists?.children[0];
  const gifData = GIFS_MOCK_RESPONSE.data[0];
  const modal = document.querySelector(".showGif_container") as HTMLElement;

  expect(gif).toBeInTheDocument();
  expect(modal).not.toBeInTheDocument();

  const title = gif?.querySelector(
    ".gifs_container_category_list_card_div p"
  ) as HTMLParagraphElement;

  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(gifData.title);

  await user.click(title!);

  const newConsultModal = document.querySelector(
    ".showGif_container"
  ) as HTMLElement;
  const imgModal = within(newConsultModal).getByRole("img");
  const buttonModal = within(newConsultModal).getByRole("button", {
    name: /close modal/i,
  });

  expect(newConsultModal).toBeInTheDocument();
  expect(imgModal).toBeInTheDocument();
  expect(imgModal).toHaveAttribute("src", gifData.images.original.url);
  expect(imgModal).toHaveAttribute("alt", gifData.title);
  expect(buttonModal).toBeInTheDocument();

  await user.click(buttonModal);

  expect(document.querySelector(".showGif_container")).not.toBeInTheDocument();
});