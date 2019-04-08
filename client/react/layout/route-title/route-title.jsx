import React, {Fragment} from "react";

export const RouteTitle = (props) => (
  <div className="route-title-layout">
    <div className="route-header">
      <div className="route-title">
        {props.content}
      </div>

    </div>
    <div className="route-body">
      {props.children}
    </div>
  </div>

);