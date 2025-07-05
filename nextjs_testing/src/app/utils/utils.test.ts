import { filterEmpty, sum } from "./utils";

describe("Utils Logic", () => {
  it("should add two numbers", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, -3)).toBe(-1);
    expect(sum(-2, 3)).toBe(1);
    expect(sum(-2, -3)).toBe(-5);
  });

  it("filter empty string from array", () => {
    expect(filterEmpty(["1", "", "2", "3"])).toEqual(["1", "2", "3"]);
    expect(filterEmpty(["1", "", "2", "", "3"])).toEqual(["1", "2", "3"]);
    expect(filterEmpty(["1", false, "2", "", null, "3", undefined, 4])).toEqual(
      ["1", "2", "3", 4]
    );
  });
});
