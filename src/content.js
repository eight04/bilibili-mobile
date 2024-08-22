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

const swipes = new WeakSet;

document.addEventListener("click", e => {
  if (e.target.tagName.match(/bili-photoswipe/i)) {
    console.log("[mobile] bili-photoswipe clicked");
    if (swipes.has(e.target)) {
      return;
    }
    swipes.add(e.target);
    initTouchMove(e.target)
  }
});

function initTouchMove(el) {
  let img;
  let startData;
  el.shadowRoot.addEventListener("touchstart", e => {
    if (e.target.tagName.match(/img/i)) {
      img = e.target;
      startData = {
        screenX: e.touches[0].screenX,
        screenY: e.touches[0].screenY,
        tx: 0,
        ty: 0,
        tz: 0,
        suffix: ""
      };
      try {
        const match = img.parentNode.style.transform.match(/translate3d\(([^,]+)px, ([^,]+)px, ([^,]+)px\)(.*)/);
        startData.tx = parseFloat(match[1]);
        startData.ty = parseFloat(match[2]);
        startData.tz = parseFloat(match[3]);
        startData.suffix = match[4];
      } catch {}
    }
  }, { passive: true });
  el.shadowRoot.addEventListener("touchmove", e => {
    if (img) {
      const data = e.touches[0];
      const dx = data.screenX - startData.screenX;
      const dy = data.screenY - startData.screenY;
      img.parentNode.style.transform = `translate3d(${startData.tx + dx}px, ${startData.ty + dy}px, ${startData.tz}px)${startData.suffix}`;
    }
  }, {passive: true});
  el.shadowRoot.addEventListener("touchend", e => {
    if (img) {
      img = null;
      startData = null;
    }
  }, {passive: true});
}
