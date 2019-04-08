import React from "react";
import {LoadingInline} from "../loading-inline/loading-inline";
import classnames from "classnames"

export class LoadingOverLay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {className} = this.props;
    return (
      <div className={classnames("loading-overlay", className)}>
        <LoadingInline/>
      </div>
    );
  }
}