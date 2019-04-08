import React from "react";
import classnames from "classnames"

export class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  //todo create tooltip

  render() {
    let {className, label, id, options, value, onChange, placeholder, displayAs = null, getValue = null, disabled = false} = this.props;
    return (
      <div className={classnames("form-group m-form__group k-select", className)}>
        <label htmlFor={id}>{label}</label>
        <select className="form-control m-input" id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
        >
          <option value={""} disabled hidden>{placeholder}</option>
          {options.map((each, i) => (
            <option
              key={i}
              value={getValue ? getValue(each) : each.value}
            >
              {displayAs ? displayAs(each) : each.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}