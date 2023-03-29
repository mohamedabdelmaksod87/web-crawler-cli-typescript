import { crawlUrl } from "./crawl";
import { printReport } from "./report";

async function main(): Promise<void> {
  if (process.argv.length < 3) {
    return console.log("No URL Provided");
  }

  if (process.argv.length > 3) {
    return console.log("Too many command line args");
  }

  const baseUrl = process.argv[2];
  console.log(`Starting Crawl of ${baseUrl}`);
  const pages = await crawlUrl(baseUrl, baseUrl, {});
  printReport(pages);
}

main();
