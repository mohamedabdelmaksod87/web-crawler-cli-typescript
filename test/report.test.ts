import { sortPages } from "../src/report";
import { test, expect } from "@jest/globals";
import { pagesArray, pages } from "../src/types";

test("sortPages", () => {
  const input: pages = {
    "https://wagslane.dev/path1": 1,
    "https://wagslane.dev/path2": 2,
    "https://wagslane.dev/path3": 3,
    "https://wagslane.dev/path4": 4,
    "https://wagslane.dev": 10,
  };
  const result = sortPages(input);
  const expected: pagesArray = [
    ["https://wagslane.dev", 10],
    ["https://wagslane.dev/path4", 4],
    ["https://wagslane.dev/path3", 3],
    ["https://wagslane.dev/path2", 2],
    ["https://wagslane.dev/path1", 1],
  ];
  expect(result).toEqual(expected);
});
