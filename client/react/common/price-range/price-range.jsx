import React from "react";
import {formatMoney} from "../../../common/products-utils";

export class PriceRange extends React.Component {
  constructor(props) {
    super(props);

    let {from, to} = props;
    this.state = {
      range1: Number(from) ? formatMoney(props.from) : "",
      range2: Number(to) ? formatMoney(props.to) : ""
    };
  };

  handleChange = field => e => {
    let value = e.target.value;
    value = value.trim();
    if(value === ".")
      return this.setState({[field]: ""});
    let lastChar = value[value.length - 1];
    if(isNaN(Number(lastChar)) && (lastChar !== ".")){
      value = value.slice(0, value.length - 1);
    }


    if(lastChar === "." && value.match(/(\.)/g).length > 1)
      value = value.slice(0, value.length - 1);

    this.setState({[field]: value ? value[value.length - 1] === "." ? value : formatMoney(Number(value.replace(/,/g, ""))) : ""})
  };

  render() {
    let {range1, range2} = this.state;
    let range1Value = Number(range1.replace(/,/g, "")).toFixed(0);
    let range2Value = Number(range2.replace(/,/g, "")).toFixed(0);
    console.log(range1Value)
    console.log(range2Value)
    let submit = () => this.props.onChange(range1Value < range2Value ? {from: range1Value, to: range2Value} : {from: range2Value, to: range1Value});
    return (
      <div className="price-range">
        <p className="pr-title">Chọn khoảng giá {this.props.renderReset()}</p>
        <div className="range-inputs">
          <input
            className="range-input"
            type="text"
            value={range1}
            onChange={this.handleChange("range1")}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                submit();

              }
            }}
          />
          <span></span>
          <input
            className="range-input"
            type="text"
            value={range2}
            onChange={this.handleChange("range2")}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                submit();
              }
            }}
          />
        </div>
        <button className={`btn filter-btn`} onClick={submit}>OK</button>
      </div>
    );
  }
}