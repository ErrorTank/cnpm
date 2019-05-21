import React from "react";
import {Select} from "../../../../common/select/select";

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
        <Select
          className={"cmt-select"}
          value={filter.sortByStar}
          onChange={v => {
            onChange({...filter, sortByStar: v})
          }}
          options={this.starSorter}
          placeholder={"Lọc theo sao"}
          isClearable={false}
        />
      </div>
    );
  }
}