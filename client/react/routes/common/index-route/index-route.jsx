import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {userActionModal} from "../../../common/modal/user-actions/user-actions";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {IndexBanner} from "./index-banner/index-banner";
import {ScrollToFetch} from "../../../common/scroll-to-fetch/scroll-to-fetch";
import {DealSection} from "./deal-section/deal-section";

export class IndexRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

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
          <div className="container content-container ">
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