console.log("[mobile] content.js");

headReady().then(() => {
  document.head.insertAdjacentHTML("afterbegin", '<meta name="viewport" content="width=device-width, initial-scale=1" />');
  // chrome mv2 doesn't support content_scripts[].world
  /* globals chrome */
  if (typeof chrome !== "undefined" && chrome.runtime) {
    console.log("[mobile] chrome.runtime found")
    const script = document.createElement("script");
    script.innerHTML = `(${modifyUA.toString()})()`;
    document.head.appendChild(script);
  }
});

function headReady() {
  return new Promise((resolve) => {
    if (document.head) {
      resolve(document.head);
    } else {
      const observer = new MutationObserver(() => {
        if (document.head) {
          observer.disconnect();
          resolve(document.head);
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    }
  });
}

function DOMReady() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", resolve, { once: true });
    }
  });
}

DOMReady().then(() => {
  const container = document.querySelector("#mirror-vdcon");
  if (!container) {
    console.log("[mobile] container not found");
    return;
  }
  const observer = new ResizeObserver(() => {
    const scrollbarw = container.offsetWidth - container.clientWidth;
    const scrollbarh = container.offsetHeight - container.clientHeight;
    container.style.setProperty("--scrollbar-w", `${scrollbarw}px`);
    container.style.setProperty("--scrollbar-h", `${scrollbarh}px`);
  });
  observer.observe(container);
});

modifyUA();

function modifyUA() {
  const ua = navigator.userAgent;
  const newUA = ua.replace(/Android|Phone|SymbianOS|iPod|Mobile/ig, "");
  Object.defineProperty(navigator, "userAgent", {
    value: newUA,
  });
}


