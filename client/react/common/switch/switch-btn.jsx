import React from "react";

export class SwitchBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {label, value, onToggle, className = ''} = this.props;
    return (
      <span className={`m-switch m-switch--icon ${className}`}>
        <label>
          <input type="checkbox"
                 checked={value}
                 onChange={() => onToggle(!value)}
          />
          <span/>
          {label && (
            <p className="switch-label">
              {label}
            </p>
          )}
        </label>
      </span>
    )
  }
}
