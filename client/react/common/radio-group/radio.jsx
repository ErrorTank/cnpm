import React from "react";

export class Radio extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {checked, label, onChange, value} = this.props;

        return(
            <label className="m-radio m-radio--state-brand"
            >
                <input type="radio"
                       checked={checked}
                       onChange={(e) => onChange(Number(e.target.value))}
                       value={value}
                />
                {label}
                <span/>
            </label>
        );
    }
}
