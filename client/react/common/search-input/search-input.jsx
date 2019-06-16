import React from "react";
import {InputBase} from "../base-input/base-input";
import classnames from "classnames"

export class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.value !== this.props.value)
      this.setState({value: nextProps.value});
  }

  render() {
    let {value, className, } = this.state;
    let {onSearch, placeholder} = this.props;
    return (
      <div className={classnames("search-input-box", className)}>
        <div className="wrapper">
          <InputBase
            className="search-input pt-0 pb-0"
            onKeyDown={(e) => {
              if(e.keyCode === 13)
                onSearch(value);
            }}
            value={value}
            placeholder={placeholder}
            onChange={e => {
              this.setState({value: e.target.value});
            }}

          />
          <button className="search-btn btn"
                  onClick={() => onSearch(value)}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

      </div>
    );
  }
}