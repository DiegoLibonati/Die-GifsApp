import { render, screen } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";

describe("test en <GrifItem>", () => {
  const title = "Dragon Ball";
  const url = "https://dragon-ball.com/goku.jpg";
  /*   test("Debe coincidir con el snapshot", async () => {
    // snapshot del componente

    const container = render(<GifItem title={title} url={url}></GifItem>);

    expect(container).toMatchSnapshot();
  });
 */
  test("Debe encontar un texto", () => {
    const { getByText } = render(<GifItem title={title} url={url} />);

    expect(getByText(title)).toBeTruthy();
  });

  test("Debe encontrar por test-id", () => {
    const { getByTestId } = render(<GifItem title={title} url={url} />);

    expect(getByTestId("test-title").src).toContain(url);
  });

  test("Debe mostrar URL y ALT", () => {
    render(<GifItem title={title} url={url}></GifItem>);

    screen.debug();

    expect(screen.getAllByRole(img).src).toContain(url);
  });
});
