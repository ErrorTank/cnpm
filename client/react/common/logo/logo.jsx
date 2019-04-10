import React from "react";

export class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {className, src} = this.props;
    return (
      <div className="k-logo">
        {src ? (
          <img src={src} className="logo-img"/>
        ) : (
          <img src={"/assets/img/icons8-customer-400.png"} className="logo-img"/>
        )}
      </div>
    );
  }
}