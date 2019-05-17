import {Cache} from "./cache";
import {client} from "../../graphql";
import {addRecentVisit, getAuthenUser, getUserRecentVisited} from "../../graphql/queries/user";
import {userInfo} from "../states/user-info";
import {authenCache} from "./authen-cache";
import omit from "lodash/omit"

export const createLocalStorageCache  = ({maxCache = 20, key, compare}) =>  {
    const cache = new Cache(localStorage);
    return {
        async clear(){
            return cache.set(null, key);
        },
        async get(){
            return cache.get(key) || []
        },
        async add(temp, item){
            let previousItems = cache.get(key) || [];
            let index = previousItems.findIndex(each => compare(each, item));
            if(index !== -1){
               previousItems.splice(index, 1);
            }else if(previousItems.length === maxCache){
                previousItems.pop();
            }
            return cache.set([item, ...previousItems], key);
        }
    }
};

const recentVisitedCache = createLocalStorageCache({
    key: "recent-visited-products",
    compare: (item1, item2) => item1._id === item2._id,
    maxCache: 10
});

const authenActions = {
    get(userID){
        return client.query({
            query: getUserRecentVisited,
            variables: {
                id: userID
            },
            fetchPolicy: "no-cache"
        }).then(({data}) => {
            let result = [...data.getUserRecentVisited.recentVisit];
            result.sort((a,b) => Number(b.createdAt) - Number(a.createdAt));

            return result.map(each => ({...omit(each.product, ["provider"]), options: [...each.product.provider[0].options]}))
        })


    },
    add(userID, product){
        return client.mutate({
            mutation: addRecentVisit,
            variables: {
                pID: product._id,
                uID: userID
            }
        })
    }
};

export const createVisitedCacheFunction = (actionName) => {
  let authen = authenCache.getAuthen();
  return !authen ? recentVisitedCache[actionName] : authenActions[actionName]
};