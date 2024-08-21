import browser from "webextension-polyfill";

browser.webRequest.onBeforeSendHeaders.addListener(
  ({requestHeaders}) => {
    for (const header of requestHeaders) {
      switch (header.name.toLowerCase()) {
        case "user-agent":
          header.value = header.value.replace(/ mobile /i, " ");
          header.value = header.value.replace(/Android [\d.]+; /i, "");
          break;
        case "sec-ch-ua-mobile":
          header.value = "?0";
          break;
      }
    }
    return {requestHeaders};
  },
  { urls: ["https://*.bilibili.com/*"], types: ["main_frame"]},
  ["blocking", "requestHeaders"]
);
