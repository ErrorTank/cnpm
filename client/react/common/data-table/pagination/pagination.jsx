import React from "react";
import classnames from "classnames";
import "./pagination.styl"


export class Pagination extends React.Component {
  constructor(props) {
    super(props);

  }

  getShownPages() {

    let total = this.props.total;
    let r = {
      from: Math.floor((this.props.value - 1) / 10) * 10 + 1,
      to: Math.min(total, Math.floor((this.props.value - 1) / 10) * 10 + 10)
    };
    if (this.props.value != 1 && this.props.value == r.from) {
      r.from--;
      r.to--;
    } else if (this.props.value != total && this.props.value == r.to) {
      r.from++;
      r.to++;
    }

    let shownPages = [];

    if (r.from > 1) {
      shownPages.push({
        page: 1,
        label: "1"
      });
    }
    for (var p = r.from; p <= r.to; p++) {
      shownPages.push({
        page: p,
        label: (p == r.from && r.from > 2) || (p == r.to && r.to < total - 1) ? "..." : p
      });
    }
    if (r.to < total) {
      shownPages.push({
        page: total,
        label: total
      });
    }
    return shownPages;
  }


  handleEdit = (e) => {
    let {editVal = null} = this.state;

    if (e === 13) {
      let p = this.getShownPages().find((p) => p.page === Number(editVal));
      if (p) {
        this.props.onChange(p.page);
      }
      this.setState({editVal: null})
    }
  };

  render() {
    let shownPages = this.getShownPages();
    let {className} = this.props;
    return (
      <div className={`pagination ${className ? className : ""}`}>
        <div className={`link link-prev ${this.props.value <= 1 ? "isDisabled" : ""} `}
             onClick={() => this.props.onChange(this.props.value - 1)}
        >
          <i className="fas fa-ellipsis-h"></i>
        </div>
        {shownPages.map((p) => (
          <div className={classnames("link page", {active: p.page === this.props.value})}
               key={p.page}
               onClick={() => this.props.onChange(p.page)}
          >{p.label}</div>
        ))}


        <div className={`link link-next ${this.props.value >= this.props.total ? "isDisabled" : ""} `}
             onClick={() => this.props.onChange(this.props.value + 1)}
        >
          <i className="fas fa-ellipsis-h"></i>
        </div>
      </div>
    );
  }
}
