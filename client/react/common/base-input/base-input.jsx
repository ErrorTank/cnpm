import React from 'react';
import classnames from "classnames";


export class InputBase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, success = false, error = false, label = null, helper = null, id, icon, inputType = "input", ...others} = this.props;

    return (
      <div className={classnames(
        "form-group m-form__group base-input",
        className,
        {
          "has-success": success,
          "has-danger": error
        },
      )}>
        {label && (
          <label className="form-control-label" htmlFor={id}>{label}</label>
        )}

        {icon ? (
            <div className="m-input-icon m-input-icon--right">
              {inputType === "input" ? (
                <input type="text"
                       className="form-control m-input"
                       id={id}
                       {...others}
                />
              ) : (
                <textarea
                  className="form-control m-input"
                  id={id}
                  {...others}
                />
              )

              }

              <span className="m-input-icon__icon m-input-icon__icon--right">
                <span>
                 {icon}
               </span>
              </span>
            </div>

          ) :
          inputType === "input" ? (
            <input type="text"
                   className="form-control m-input"
                   id={id}
                   {...others}
            />
          ) : (
            <textarea
              className="form-control m-input"
              id={id}
              {...others}
            />
          )


        }
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
