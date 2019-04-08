import React from "react";
import {InputBase} from "../base-input/base-input";
import classnames from "classnames";

export class AppPasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  };

  render() {
    let {show} = this.state;
    return (
      <div className="app-password-input">
        <InputBase
          {...this.props}
          type={show ? "text" :"password"}
          icon={show ? (
            <i className="fas fa-eye-slash" onClick={() => show && this.setState({show: false})}></i>
          ) : (
            <i className="fas fa-eye" onClick={() => !show && this.setState({show: true})}></i>
          )}
        />

      </div>

    );
  }
}