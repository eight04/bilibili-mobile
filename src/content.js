const observer = new MutationObserver(() => {
  if (document.head) {
    observer.disconnect();
    document.head.insertAdjacentHTML("afterbegin", '<meta name="viewport" content="width=device-width, initial-scale=1" />');
  }
});
observer.observe(document, { childList: true, subtree: true });
//
// const oldUA = navigator.userAgent;
// const newUA = oldUA.replace(/ mobile /i, " ").replace(/Android [\d.]+; /i, "");
// Object.defineProperty(navigator, "userAgent", {
//   value: newUA,
// });
