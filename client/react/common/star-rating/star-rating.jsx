import React from "react";
import classnames from "classnames";

export class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {className, rating = 0, } = this.props;

    return (
      <div className={classnames("stars-outer", className)}>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <div className="stars-inner" style={{width: (rating / 5) * 100 + "%"}}>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </div>
      </div>
    );
  }
}