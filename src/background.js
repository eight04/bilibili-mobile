import browser from "webextension-polyfill";

const filters = [
  { urls: ["https://*.bilibili.com/*"], types: ["main_frame"]},
  { urls: ["https://*.bilivideo.com/*"], types: ["xmlhttprequest"] }
];

for (const f of filters) {
  browser.webRequest.onBeforeSendHeaders.addListener(
    overrideHeaders, f, ["blocking", "requestHeaders"]
  );
}

function overrideHeaders({requestHeaders}) {
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
}
