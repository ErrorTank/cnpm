import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {userActionModal} from "../../../common/modal/user-actions/user-actions";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {IndexBanner} from "./index-banner/index-banner";
import {ScrollToFetch} from "../../../common/scroll-to-fetch/scroll-to-fetch";
import {DealSection} from "./deal-section/deal-section";
import {VisitedSection} from "./visited-section/visited-section";
import {createVisitedCacheFunction} from "../../../../common/cache/recent-product-guest-visit-cache";
import {userInfo} from "../../../../common/states/user-info";
import {KComponent} from "../../../common/k-component";
import {customHistory} from "../../routes";

export class IndexRoute extends KComponent {
  constructor(props) {
    super(props);

  };



  render() {
    return (
      <PageTitle
        title={"Trang chủ"}
      >
        <AuthenLayout
          showCategories={false}
        >
          <div className="container content-container">
            <IndexBanner/>
          </div>

          <div className="container content-container">
            <VisitedSection

            />
          </div>
          <div className="container content-container">
            <DealSection/>
          </div>

          {/*<div style={{height: "2000px"}}>*/}
            {/*<ScrollToFetch>*/}
              {/*<div style={{marginTop: "500px", height: "100px", backgroundColor: "red"}}></div>*/}
            {/*</ScrollToFetch>*/}
          {/*</div>*/}

        </AuthenLayout>
      </PageTitle>
    );
  }
}