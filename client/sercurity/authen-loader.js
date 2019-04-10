export const authenLoader = {
  init() {

    // authenApi.addHeader("Authorization", () => {
    //   let token = authenCache.getAuthen();
    //   return token ? `Bearer ${token}` : null;
    // });



    // return authenCache.loadAuthen().then(() => Promise.resolve()).catch(() => Promise.resolve());
    return new Promise((res, rej) => {
      res()
    })
  }
};
