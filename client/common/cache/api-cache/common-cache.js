import {createApiCache} from "./api-cache";
import {client} from "../../../graphql";
import {getCacheCategoriesInfo} from "../../../graphql/queries/category";


export const categoriesCache = createApiCache(() => client.query({
  query: getCacheCategoriesInfo,
}).then(({data}) => {
  return data.getCacheCategoriesInfo;
}));


export const initClientCache =  () => {
  return Promise.all([
    categoriesCache.get()
  ]);
};