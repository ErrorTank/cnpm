import {Cache} from "./cache";
import {client} from "../../graphql";
import {addRecentVisit, getAuthenUser, getUserRecentVisited} from "../../graphql/queries/user";
import {userInfo} from "../states/common";
import {authenCache} from "./authen-cache";
import omit from "lodash/omit"


export const createLocalStorageCache  = ({key}) =>  {
    const cache = new Cache(localStorage);
    return {
        async clear(){
            return cache.set(null, key);
        },
        async get(){
            return cache.get(key) || []
        },
        async set(value){
            return cache.set(value, key);

        }
    }
};

const recentVisitedCache = createLocalStorageCache({
    key: "recent-visited-products",
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
   set(userID, product){

        return client.mutate({
            mutation: addRecentVisit,
            variables: {
                pID: product._id,
                uID: userID
            }
        })
    }
};

const unAuthenActions = {
    get(){
        return recentVisitedCache.get();


    },
    async set(userID, product){
        let previousItems = await recentVisitedCache.get();
        let index = previousItems.findIndex(each =>  each._id === product._id);
        if(index !== -1){
            previousItems.splice(index, 1)
        }else if(previousItems.length === 10){
            previousItems.pop()

        }
        return recentVisitedCache.set([product, ...previousItems]);
    }
};

export const createVisitedCacheFunction = (actionName) => {
  let authen = authenCache.getAuthen();
  return !authen ? unAuthenActions[actionName] : authenActions[actionName]
};