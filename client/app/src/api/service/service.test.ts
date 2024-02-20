import { describe, expect, it } from "vitest";
import { all } from "./service";

//TODO: Realizar Mocks posteriormente
describe("Teste vivo", () => {
  it("GetAll", async () => {
    const data = await all();
    expect(data).toBe("Amazon Prime");
  });
});
