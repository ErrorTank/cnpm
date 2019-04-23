import React from "react";
import classnames from "classnames"
import {CSSTransition, TransitionGroup} from "react-transition-group";

export class Slider extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let {className, current, getContent, getKey} = this.props;
    return (
      <div className={classnames("slider", className)}>
        <TransitionGroup
          className={"slides-container"}
        >
          <CSSTransition
            timeout={500}
            classNames={"slide"}
            key={getKey(current)}
          >
            <div className="slider-item">
              {getContent(current)}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}