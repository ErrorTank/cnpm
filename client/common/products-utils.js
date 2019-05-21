const calcCommentsAvgRating = comments => {
  return comments.reduce((total, cmt) => total + cmt.rating, 0) / comments.length;
};


const calcSalePrice = (price, sale) => {
 return (price * (100 - sale)) / 100;
};

const formatMoney = (money, fix = 0) => {
  let str = Number(money).toFixed(fix).toString();
  let [relative, fixed] = str.includes('.') ? str.split(".") : [str, null];
  let spliceStrPaths = (total, str) => {
    if(str.length>3){
      return spliceStrPaths([str.slice(str.length - 3),...total], str.slice(0, str.length - 3))
    }
    return [str.slice(0, str.length), ...total]
  };
  let paths = spliceStrPaths([],relative);
  return paths.join(",")+ (fixed ? ("."+ fixed) : "");
};

export {
  calcSalePrice,
  formatMoney,
  calcCommentsAvgRating
}