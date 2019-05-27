const wait = (fn, amount = 2000) => new Promise((res, rej) => {
  setTimeout(() => {
    fn();
    res();
  }, amount)
});
const getBase64=(file)=>new Promise((resolve)=>{
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    resolve({file, src:reader.result, fileID: file.lastModified});
  };
});


export {
  wait,
  getBase64
}