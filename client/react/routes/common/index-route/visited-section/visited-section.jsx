import React, {Fragment} from "react";
import {IndexProductList} from "../index-product-list/index-product-list";
import {createVisitedCacheFunction} from "../../../../../common/cache/recent-product-guest-visit-cache";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {KComponent} from "../../../../common/k-component";


export class VisitedSection extends KComponent {
  constructor(props) {
    super(props);

    this.onUnmount(userInfo.onChange((nextState) => {
      this.forceUpdate();
    }));
  };

  getRecentVisited = () => {
    console.log("cac")
    let info = userInfo.getState();
    return createVisitedCacheFunction("get")(info ? info._id : null).then(arr => {
      console.log(arr)


      return arr.length > 5 ? arr.slice(0, 5) : arr;
    });
  };


  render() {
    return (
      <div className="visited-section">
        {

            <Fragment>
              <p className="section-header">SẢN PHẨM BẠN ĐÃ XEM</p>
              <div className="section-body">
                <IndexProductList
                  api={this.getRecentVisited}
                  deal={false}
                  cols={5}
                  onClickBtn={() => customHistory.push("/recent-visited")}
                />
                <div className="vs-footer">
                  <button className="btn more-btn" onClick={() => customHistory.push("/recent-visited")}>Xem
                    thêm
                  </button>
                </div>
              </div>
            </Fragment>

        }


      </div>
    );
  }
}