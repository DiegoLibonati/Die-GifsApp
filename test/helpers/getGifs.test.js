import { getGifs } from "../../src/helpers/getGifs";

describe("test en getGifs", () => {
  test("Debe retornar el arreglo de gifs", async () => {
    const gifs = await getGifs("Dragon Ball", 1);

    expect(gifs.length).toBeGreaterThan(0);

    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
    });
  });
});
