import React from "react";

export class IconInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {placeholder = "",icon, ...rest} = this.props;
    return (
      <div className="icon-input m-input-icon m-input-icon--left">
        <input
               className="form-control m-input m-input--solid"
               placeholder={placeholder}
               {...rest}
        />
        <span className="m-input-icon__icon m-input-icon__icon--left">
									<span>{icon}</span>
        </span>
      </div>
    );
  }
}