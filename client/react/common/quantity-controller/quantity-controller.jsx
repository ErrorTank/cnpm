import React from "react";

export class QuantityController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleChange = (newValue) => {
    let { min = 1, max = 100, onChange} = this.props;
    let toNumberValue = parseInt(newValue);
    if(isNaN(toNumberValue)){
      return onChange(1);
    }
    return onChange((toNumberValue < min) ? min : (toNumberValue > max) ? max : toNumberValue);
  };

  render() {
    let {label, value, onChange, min, max} = this.props;
    return (
      <div className="qty-controller">
        {label && <p className="label">{label}</p>

        }

        <div className="controller-contain">
          <div className="controller">
            <span className="mutate-qty text-select-disable" onClick={() => this.handleChange(value - 1)}>-</span>
            <input className="qty-input"
                   type="tel"
                   min={min}
                   max={max}
                   value={value}
                   onChange={(e) => onChange(e.target.value)}
                   onBlur={() => this.handleChange(value)}
            />
            <span  className="mutate-qty text-select-disable" onClick={() => this.handleChange(value + 1)}>+</span>
          </div>
        </div>
      </div>
    );
  }
}