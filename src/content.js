const observer = new MutationObserver(() => {
  if (document.head) {
    observer.disconnect();
    document.head.insertAdjacentHTML("afterbegin", '<meta name="viewport" content="width=device-width, initial-scale=1" />');
  }
});
observer.observe(document, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#mirror-vdcon");
  if (!container) throw new Error("Container not found");
  const observer = new ResizeObserver(() => {
    const scrollbarw = container.offsetWidth - container.clientWidth;
    const scrollbarh = container.offsetHeight - container.clientHeight;
    container.style.setProperty("--scrollbar-w", `${scrollbarw}px`);
    container.style.setProperty("--scrollbar-h", `${scrollbarh}px`);
  });
  observer.observe(container);
});
