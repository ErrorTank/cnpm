import {customHistory} from "../../routes/routes";

const breadscrumbItems = [
  {
    key: "home",
    content: "Trang chủ",
    onClick: () => customHistory.push("/")
  }
];

const getBreadcrumbItems = (wish, includeHome = true) =>{
  let result =  breadscrumbItems.filter(each => wish.includes(each.key));
  result[result.length - 1].active = true;
  return includeHome ? [breadscrumbItems[0], ...result] : result;
};

export {breadscrumbItems, getBreadcrumbItems}