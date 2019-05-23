import React from "react";
import Select from "react-select"

export class CmtListActions extends React.Component {
  constructor(props) {
    super(props);

  };

  starSorter = [
    {
      value: "ALL",
      label: "Tất cả sao"
    },
    {
      value: "FIVE",
      label: "5 Sao"
    }, {
      value: "FOUR",
      label: "4 Sao"
    }, {
      value: "THREE",
      label: "3 Sao"
    }, {
      value: "TWO",
      label: "2 Sao"
    }, {
      value: "ONE",
      label: "1 Sao"
    },{
      value: "ASC",
      label: "Tăng dần"
    },{
      value: "DESC",
      label: "Giảm dần"
    },

  ];

  render() {
    let {filter, onChange} = this.props;
    return (
      <div className="cmt-list-actions">
        <p className="filter-title">Chọn xem nhận xét</p>
        <div className={"actions-list"}>
          <Select
            className={"cmt-select"}
            value={this.starSorter.find(each => each.value === filter.sortByStar)}
            getOptionValue={each => each.value}
            onChange={v => {
              onChange({...filter, sortByStar: v.value})
            }}
            options={this.starSorter}
            placeholder={"Lọc theo sao"}
            isClearable={false}
          />
        </div>

      </div>
    );
  }
}