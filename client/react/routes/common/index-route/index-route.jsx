import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {userActionModal} from "../../../common/modal/user-actions/user-actions";


export class IndexRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    userActionModal.open();
  };

  render() {
    return (
      <PageTitle
        title={"Trang chủ"}
      >
        <div>
        </div>
      </PageTitle>
    );
  }
}