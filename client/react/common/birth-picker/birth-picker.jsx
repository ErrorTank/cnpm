import React from "react";
import classnames from "classnames"
import {checkValidDate, createBirthList, getDayList} from "../../../common/date-utils";
import Select from "react-select"
import isEqual from "lodash/isEqual"

export class BirthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthList: createBirthList(12, x => x + 1),
      yearList: createBirthList(111, x => x + 1900),

    };

  };


  renderSelect = ({type, list, value, onChange, placeholder}) => {
    return (
      <Select
        className={"bp-select"}
        value={value.value ? value : null}
        onChange={v => {
          onChange(v)
        }}
        options={list}
        placeholder={placeholder}
        isClearable={true}
      />
    )
  };
  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.value, nextProps.value) || !isEqual(this.props.error, nextProps.error)
  }
  render() {
    let {label, error, className, value, onChange} = this.props;
    let {day, month, year} = value;
    let {dayList} = getDayList({...this.props.value});
    let {monthList, yearList} = this.state;
    return (
      <div className={classnames("birth-picker", className, {isError: error})}>
        <label className="bp-title">{label}</label>
        <div className="bp-date-picker">
          {this.renderSelect({
            type: "day",
            list: dayList,
            value: {label: day, value: day},
            placeholder: "Ngày",
            onChange: newDay => {
              let newValue = newDay ? newDay.value : 0;
              onChange({...value, day: Number(newValue)})
            },
          })}
          {this.renderSelect({
            type: "month",
            list: monthList,
            value: {label: month, value: month},
            placeholder: "Tháng",
            onChange: newMonth => {
              let newValue = newMonth ? newMonth.value : 0;
              onChange({
                ...value,
                month: Number(newValue),
                day: checkValidDate({day, month: newValue, year}) ? Number(day) : 0
              })
            },
          })}
          {this.renderSelect({
            type: "year",
            list: yearList,
            value: {label: year, value: year},
            placeholder: "Năm",
            onChange: newYear => {
              let newValue = newYear ? newYear.value : 0;
              onChange({
                ...value,
                year: Number(newValue),
                day: checkValidDate({day, month, year: newValue}) ? Number(day) : 0
              })
            },
          })}
        </div>
        {error && (
          <div className="error-notify">
            {error.message}
          </div>
        )

        }

      </div>
    );
  }
}