import React from "react"
import {clearAppStores} from "../../../../common/system/system";
import {authenCache} from "../../../../common/cache/authen-cache";
import {userInfo} from "../../../../common/states/common";


const createResetComponent = (conditions) => {
  return class extends React.Component{
    constructor(props){
      super(props)

      if(conditions.reduce((result, cur) => cur() && result, true)){
        clearAppStores();
      }
    }



    render() {
      return this.props.render()
    }
  }
};

export const ResetComponent = createResetComponent([
  () => !authenCache.getAuthen() && userInfo.getState()
]);