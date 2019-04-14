import React from "react";
import {Radio} from "./radio";
import classnames from "classnames"

export class RadioGroup extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {helpText, title, value, radios, displayAs, isChecked, onChange, className} = this.props;
        return(
            <div className={classnames(`m-form__group form-group`, className)}>
                {title && (
                    <label>{title}</label>
                )}

                <div className="m-radio-list">
                    {radios.map((each, i) => (
                      <div className="radio-wrap" key={i}>
                          <Radio

                            checked={isChecked(value, each)}
                            label={displayAs(each)}
                            onChange={() => {
                                onChange(each.value)
                            }}
                          />
                      </div>

                    ))

                    }
                </div>
                {helpText && (
                    <span className="m-form__help">{helpText}</span>
                )}

            </div>
        );
    }
}
