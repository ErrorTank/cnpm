import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {userActionModal} from "../../../common/modal/user-actions/user-actions";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";


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

        </AuthenLayout>
      </PageTitle>
    );
  }
}