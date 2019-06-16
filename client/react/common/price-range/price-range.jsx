import React from "react";
import {formatMoney} from "../../../common/products-utils";

export class PriceRange extends React.Component {
  constructor(props) {
    super(props);
    let [from, to] = [formatMoney(props.from), formatMoney(props.to)];
    console.log(from)
    console.log(to)
    this.state = {
      range1: Number(from) ? from : "",
      range2: Number(to) ? to : ""
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
    let range1Value = Number(range1.replace(",", "")).toFixed(0);
    let range2Value = Number(range2.replace(",", "")).toFixed(0);
    console.log(range1Value)
    console.log(range2Value)
    return (
      <div className="price-range">
        <p className="pr-title">Chọn khoảng giá</p>
        <div className="range-inputs">
          <input
            className="range-input"
            type="text"
            value={range1}
            onChange={this.handleChange("range1")}
          />
          <span></span>
          <input
            className="range-input"
            type="text"
            value={range2}
            onChange={this.handleChange("range2")}
          />
        </div>
        <button className={`btn filter-btn`} disabled={range1Value === range2Value} onClick={() => this.props.onChange(range1Value < range2Value ? {from: range1Value, to: range2Value} : {from: range2Value, to: range1Value})}>OK</button>
      </div>
    );
  }
}