const { normalizeUrl, getUrlsFromHtml } = require("../crawl");
const { test, expect } = require("@jest/globals");

test("normlize url strip protocol", () => {
  const input = "http://blog.boot.dev/path";
  const result = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(result).toEqual(expected);
});

test("normlize url strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const result = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(result).toEqual(expected);
});

test("normlize url capitals", () => {
  const input = "https://Blog.boot.dev/path/";
  const result = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(result).toEqual(expected);
});

test("getUrlsFromHtml absolute path", () => {
  const inputHtmlBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path/">Blog</a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev/path/";
  const result = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(result).toEqual(expected);
});

test("getUrlsFromHtml relative path", () => {
  const inputHtmlBody = `
  <html>
    <body>
      <a href="/path/">Blog</a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const result = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(result).toEqual(expected);
});

test("getUrlsFromHtml relative & absolute", () => {
  const inputHtmlBody = `
  <html>
    <body>
      <a href="/path1/">Blog Path 1</a>
      <a href="https://blog.boot.dev/path2/">Blog Path 2</a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const result = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(result).toEqual(expected);
});

test("getUrlsFromHtml invalid path", () => {
  const inputHtmlBody = `
  <html>
    <body>
      <a href="invalid">Blog</a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const result = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = [];
  expect(result).toEqual(expected);
});
