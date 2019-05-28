import React, {Fragment} from "react";
import {IndexProductList} from "../index-product-list/index-product-list";
import {createVisitedCacheFunction} from "../../../../../common/cache/recent-product-guest-visit-cache";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/common";
import {KComponent} from "../../../../common/k-component";
import {StaticProductList} from "../static-product-list/static-product-list";
import classnames from "classnames"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

export class VisitedSection extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
    this.getRecentVisited();
    this.onUnmount(userInfo.onChange((nextState, oldState) => {
      if(!nextState || !oldState){
        this.setState({loading: true});
        this.getRecentVisited();
      }

    }));
  };

  getRecentVisited = () => {
    let info = userInfo.getState();
    createVisitedCacheFunction("get")(info ? info._id : null).then(arr => {

      this.setState({list: arr || [], loading: false});
    });
  };


  render() {
    let {list} = this.state;
    let {filterList = (l) => l} = this.props;
    let renderList = filterList(list);
    return (
        <div className={classnames("visited-section")}>

            <p className="section-header">SẢN PHẨM BẠN ĐÃ XEM</p>
            <div className="section-body">
              {this.state.loading ? (
                <LoadingInline/>
              ) :
                renderList.length  ? (
                    <Fragment>
                      <StaticProductList
                        deal={false}
                        cols={5}
                        list={renderList}
                      />
                      <div className="vs-footer">
                        <button className="btn more-btn" onClick={() => customHistory.push("/recent-visited")}>Xem
                          thêm
                        </button>
                      </div>
                    </Fragment>
                  ) : (
                    <p className="unseen-notify"> Bạn chưa xem sản phẩm nào</p>
                  )
              }


            </div>



        </div>
      )


  }
}