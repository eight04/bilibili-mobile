export function modifyUA(s) {
  const ua = s || navigator.userAgent;
  const newUA = ua.replace(/Android|Phone|SymbianOS|iPod|Mobile/ig, "");
  if (s != null) return newUA;
  Object.defineProperty(navigator, "userAgent", {
    value: newUA,
  });
}


