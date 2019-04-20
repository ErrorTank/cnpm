import React from "react";
import classnames from "classnames"

const Alert = ({type = "success", className, title, content}) => {
    return (
      <div className={classnames(`alert alert-${type}`, className)}>
        <strong>{title}</strong> {content}
      </div>
    );
};

export default Alert;