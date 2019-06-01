const asyncParallel = (asyncArr) => new Promise((resolve, reject) => {
  let result = [];
  let invokeResolve = () => {
    if(result.length === asyncArr.length){
      resolve(result)
    }
  };
  for(let fn of asyncArr){
    fn().then(r => {
      result.push(r);
      invokeResolve()

    }).catch(r => {
      result.push({error: r});
      invokeResolve()
    });
  }

});

export {
  asyncParallel
}