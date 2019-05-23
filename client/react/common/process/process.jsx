import React from "react";
import classnames from "classnames"

export class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {className, content, total, value} = this.props;
    return (
      <div className={`process ${className}`}>
        <div className="current-value" style={{width: `${((Number(value) / Number(total)) * 100).toFixed(1)}%`}}>
          {content && (
            <span className={"process-content"}>{content()}</span>
          )}


        </div>
      </div>
    );
  }
}