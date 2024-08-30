import browser from "webextension-polyfill";

import { modifyUA } from "./lib/ua.js";

const filters = [
  { urls: ["https://*.bilibili.com/*"], types: ["main_frame"]},
  { urls: ["https://*.bilivideo.com/*"], types: ["xmlhttprequest"] }
];

for (const f of filters) {
  // NOTE: on Firefox, you can't register the same listener multiple times
  // so we need to use a different function for each filter
  const overrideHeaders = ({requestHeaders}) => {
    for (const header of requestHeaders) {
      switch (header.name.toLowerCase()) {
        case "user-agent":
          header.value = modifyUA(header.value);
          break;
        case "sec-ch-ua-mobile":
          header.value = "?0";
          break;
      }
    }
    return {requestHeaders};
  };
  browser.webRequest.onBeforeSendHeaders.addListener(
    overrideHeaders, f, ["blocking", "requestHeaders"]
  );
}


browser.webNavigation.onHistoryStateUpdated.addListener(({tabId}) => {
  browser.tabs.sendMessage(tabId, {method: "historyStateUpdated"});
}, {url: [{hostSuffix: ".bilibili.com"}]});

