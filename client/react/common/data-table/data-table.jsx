import React from "react";
import isEmpty from "lodash/isEmpty";
import classnames from "classnames";
import {getValueOf} from "./api-data-table/api-data-table";


export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {className, columns, _rowTrackBy = ((row, index) => index), onClickRow, rowLinkTo, rowClassName, clickRow, renderHeaderCell, rows, placeholder} = this.props;

    return (
      <table className={classnames("data-table table m-table m-table--head data-table-desktop", className)}>
        <thead>
        <tr>
          {columns.map(renderHeaderCell)}
        </tr>
        </thead>
        <tbody

        >
        {isEmpty(rows) && <tr>
          <td className="no-data" colSpan={columns.length}>{placeholder}</td>
        </tr>}

        {!isEmpty(rows) && rows.map((row, rIndex) => (
          <tr
            key={_rowTrackBy(row, rIndex)}
            onClick={(onClickRow == null && rowLinkTo == null) ? undefined : e => {
              return clickRow(e, row, rIndex)
            }}
            className={classnames({clickable: onClickRow != null || rowLinkTo != null}, getValueOf(rowClassName, row))}
          >
            {columns.map(({cellClass, cellCheckbox, cellDisplay, show = () => true}, index) => {
              return show({data: rows}) ? (
                <td key={index}
                    className={classnames(getValueOf(cellClass, row), {"checkbox-cell": getValueOf(cellCheckbox, row)})}>
                  {cellDisplay ? cellDisplay(row, rIndex) : null}
                </td>
              ) : null;
            })}
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}
