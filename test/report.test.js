const { sortPages } = require("../report");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "https://wagslane.dev/path1": 1,
    "https://wagslane.dev/path2": 2,
    "https://wagslane.dev/path3": 3,
    "https://wagslane.dev/path4": 4,
    "https://wagslane.dev": 10,
  };
  const result = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 10],
    ["https://wagslane.dev/path4", 4],
    ["https://wagslane.dev/path3", 3],
    ["https://wagslane.dev/path2", 2],
    ["https://wagslane.dev/path1", 1],
  ];
  expect(result).toEqual(expected);
});
