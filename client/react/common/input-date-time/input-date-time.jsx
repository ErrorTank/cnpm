import React from 'react';
import classnames from "classnames";
import DateTime from "react-datetime"
import moment from "moment"


export class InputDateTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, success = false, error = false, label = null, helper = null, id, onChange, ...others} = this.props;

    return (
      <div className={classnames(
        "form-group m-form__group input-date-time",
        className,
        {
          "has-success": success,
          "has-danger": error
        },
      )}>
        {label && (
          <label className="form-control-label" htmlFor={id}>{label}</label>
        )}

        <DateTime
          {...others}
          closeOnSelect={true}
          input={true}
          dateFormat={"DD/MM/YYYY"}
          timeFormat={"HH:mm"}
          onChange={value => onChange(typeof value === "string" ? value : value.toDate())}
        />
        {(error) && (
          <div className="form-control-feedback">{error.message}</div>
        )}
        {helper && (
          <span className="m-form__help">{helper}</span>
        )}

      </div>
    );
  }
}
