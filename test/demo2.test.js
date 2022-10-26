import { getSaludo, getUser } from "./functions";

describe("test demo", () => {
  test("test 1 - Numero igual", async () => {
    expect(1 === 1).toBe(true);
  });
  test("test 2 - Mensaje igual", async () => {
    // 1.Arrange / Inicio
    const message1 = "Hola";

    // 2. Act / acciones
    const message2 = message1.trim();

    // 3.Assert / observar
    expect(message1).toBe(message2);
  });
  test("test 3 - getNombre", async () => {
    const nombre = "Beto";
    const message = getSaludo(nombre);

    expect(message).toBe(`Hola ${nombre}`);
  });

  test("test 4 - getUser", async () => {
    const testUser = {
      uid: "ABC123",
      username: "Agosto1986",
    };

    const user = getUser();

    expect(testUser).toEqual(user);
  });
});
