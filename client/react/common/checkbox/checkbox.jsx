import React from "react";
import "./checkbox.styl"

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {label, onChange, value, style = "m-checkbox--brand", disabled, className = ""} = this.props;
    return (
      <label className={`m-checkbox ${style} ${className}`}>
        <input type="checkbox"
               disabled={disabled}
               checked={value}
               onChange={() => onChange && onChange(!value)}
        />
        {label && label}
        <span className="check-mark"/>
      </label>
    )
  }
}
