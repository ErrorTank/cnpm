import React from "react";

export class GlobalSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  };

  render() {
    let {value} = this.state;
    let {onSearch} = this.props;
    return (
      <div className="global-search-bar">
        <div className="input">
          <input
            type="text"
            value={this.state.value}
            placeholder={"Tìm kiếm sản phẩm"}
            onChange={e => this.setState({value: e.target.value})}
            onKeyDown={e => e.keyCode === 13 && onSearch(value)}
          />
        </div>
        <div className="search-btn"
             onClick={() => onSearch(value)}
        >
            <span>
              <i className="fas fa-search"></i>
            </span>
          <span>
              Tìm kiếm
            </span>
        </div>

      </div>
    );
  }
}