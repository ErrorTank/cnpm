import React from "react";
import classnames from "classnames"

export class LineMultiSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.steps[0].passCondition() ? 1 : 0
    };
  };

  render() {
    let {manualNavigate, steps} = this.props;
    let {step} = this.state;
    let stepInfo = steps[step];
    return (
      <div className="line-multi-steps">
        <div className="navigate-bar">
          {steps.map((each, i) => (
            <LineStep
              {...each}
              index={i}
              onChange={() => manualNavigate ? this.setState({step: i}) : null}
            />
          ))}
        </div>
        <div className="step-content">
          {stepInfo.render({
            step: stepInfo,
            stepIndex: step,
            navigate: index => {
              if(Array.from(Array(steps.length), (x, i) => i).includes(index))
                this.setState({step: index});
            }
          })}
        </div>
      </div>
    );
  }
}

const LineStep = ({title, label, index, current, onChange}) => {
  return (
    <div className={classnames("line-step", {active: current === index, complete: current > index})}>
      <p className="ls-title">{title}</p>
      <div className="label-dot" onClick={onChange}>{label === null ? index : label}</div>
      <div className="ls-process">

      </div>
    </div>
  )
};