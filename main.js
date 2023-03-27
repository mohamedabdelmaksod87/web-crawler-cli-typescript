const { crawlUrl } = require("./crawl");
const { printReport } = require("./report");

async function main() {
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
