import {createApiCache} from "./api-cache";
import {client} from "../../../graphql";
import {getCacheCategoriesInfo} from "../../../graphql/queries/category";
import {getCacheBrandsInfo} from "../../../graphql/queries/brand";
import {getCacheProvidersInfo} from "../../../graphql/queries/user";


export const categoriesCache = createApiCache(() => client.query({
  query: getCacheCategoriesInfo,
}).then(({data}) => {
  return data.getCacheCategoriesInfo;
}));

export const brandCache = createApiCache(() => client.query({
  query: getCacheBrandsInfo,
}).then(({data}) => {
  return data.getCacheBrandsInfo;
}));

export const providerCache = createApiCache(() => client.query({
  query: getCacheProvidersInfo,
}).then(({data}) => {
  return data.getCacheProvidersInfo;
}));

export const initClientCache =  () => {
  return Promise.all([
    categoriesCache.get(),
    brandCache.get(),
    providerCache.get()
  ]);
};