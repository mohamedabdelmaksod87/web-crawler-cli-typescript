import { crawlUrl } from "./crawl";
import { printReport } from "./report";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

async function main(): Promise<void> {
  while (true) {
    const input = await getUserInput();
    if (!input) continue;
    if (input === "exit") break;
    console.log(`Starting Crawl of ${input}`);
    const pages = await crawlUrl(input, input, {});
    printReport(pages);
  }
}

async function getUserInput(): Promise<string> {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question("Enter a valid URL or exit to close:\n>");
  rl.close();
  return answer.trim();
}

main();
