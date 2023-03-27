const { JSDOM } = require("jsdom");

async function crawlUrl(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);
  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;
  console.log(`Actively Crawling ${currentUrl}`);

  try {
    const res = await fetch(currentUrl);
    if (res.status > 399) {
      throw new Error(
        `Error in fetching ${url} with status code ${res.status}`
      );
    }

    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("text/html")) {
      throw new Error(`Response Content-Type is not text/html`);
    }

    const htmlBody = await res.text();
    const nextUrls = getUrlsFromHtml(htmlBody, baseUrl);

    for (const nextUrl of nextUrls) {
      pages = await crawlUrl(baseUrl, nextUrl, pages);
    }
  } catch (err) {
    console.error(`${err.message} on page: ${currentUrl}`);
    return pages;
  }
  return pages;
}

function getUrlsFromHtml(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const link of linkElements) {
    if (link.href.startsWith("/")) {
      //relative url
      try {
        const urlObj = new URL(`${baseUrl}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      //absolute url
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  return urls;
}

function normalizeUrl(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.host}${urlObj.pathname}`;
  if (hostPath && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getUrlsFromHtml,
  crawlUrl,
};
