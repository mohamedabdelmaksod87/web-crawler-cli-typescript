import { pagesArray, pages } from "./types";

export function printReport(pages: pages) {
  console.log("=========");
  console.log("REPORT");
  console.log("=========");
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} links to page ${page[0]}`);
  }
  console.log("===========");
  console.log("END REPORT");
  console.log("===========");
}

export function sortPages(pages: pages): pagesArray {
  const pagesArr: pagesArray = Object.entries(pages);
  pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });
  return pagesArr;
}
