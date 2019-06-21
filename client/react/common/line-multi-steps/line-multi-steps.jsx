import React from "react";
import classnames from "classnames"

export class LineMultiSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // step: 1
    };
  };


  render() {
    let {manualNavigate, steps, step, onChange} = this.props;

    let stepInfo = steps[step];
    return (
      <div className="line-multi-steps">
        <div className="navigate-bar">
          <div className="steps ">
            <div className={"row p-0 m-0"}>
              {steps.map((each, i) => (
                <LineStep
                  {...each}
                  key={i}
                  index={i}
                  current={step}
                  onChange={() => manualNavigate ? onChange(i) : null}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="step-content">
          {stepInfo.render({
            step: stepInfo,
            stepIndex: step,
            navigate: index => {
              if(Array.from(Array(steps.length), (x, i) => i).includes(index))
                onChange(index);
            }
          })}
        </div>
      </div>
    );
  }
}

const LineStep = ({title, label, index, current, onChange}) => {
  return (
    <div className={classnames("line-step col-4 m-0 p-0", {active: current >= index, complete: current > index})}>
      <p className="ls-title">{title}</p>
      <div className="label-dot" onClick={onChange}>{label === null ? index : label}</div>
      <div className="ls-process">

      </div>
    </div>
  )
};