import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {userActionModal} from "../../../common/modal/user-actions/user-actions";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {IndexBanner} from "./index-banner/index-banner";


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
        </AuthenLayout>
      </PageTitle>
    );
  }
}