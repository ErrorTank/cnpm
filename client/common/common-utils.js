const wait = (fn, amount = 2000) => new Promise((res, rej) => {
  setTimeout(() => {
    fn();
    res();
  }, amount)
});



export {
  wait
}