import React from "react";
import classnames from "classnames"
import {CSSTransition, TransitionGroup} from "react-transition-group";

export class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
    };

  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {

      this.setState({direction: nextProps.current > this.props.current ? "right" : "left"});
    }
  }

  render() {
    let {className, current, getContent} = this.props;
    return (
      <div className={classnames("slider", className)}

      >
        <TransitionGroup
          className={classnames("slides-container", this.state.direction)}
        >
          <CSSTransition
            timeout={300}
            classNames={"slide-cover"}
            key={current}
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