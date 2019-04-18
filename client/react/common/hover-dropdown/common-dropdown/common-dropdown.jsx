import React from "react";
import classnames from "classnames"

export const CommonDropdown = props => {
  return (
    <div className={classnames("common-dropdown", props.className)}>
      {props.content}
      <div className="pointer">

      </div>
    </div>
  )
};