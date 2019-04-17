import React from "react";
import classnames from "classnames"

export class HoverDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {className, toggleContent, dropdown} = this.props;
    return (
      <div className={classnames("hover-dropdown", className)}>
        {toggleContent}
        <div className="dropdown-content">
          {dropdown}
        </div>
      </div>
    );
  }
}