import React from "react";
import {KComponent} from "../../k-component";
import classnames from "classnames"
import isEqual from "lodash/isEqual"
import {LoadingInline} from "../../loading-inline/loading-inline";
import {DataTable} from "../data-table";
import {Pagination} from "../pagination/pagination";
import {LoadingOverLay} from "../../loading-overlay/loading-overlay";
import {customHistory} from "../../../routes/routes";

export class ApiDataTable extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      total: null,
      page: 1,
      loading: true
    };
    setTimeout(() => {
      this.loadData({page: this.state.page});
    });
  };

  loadData(changes = {}) {
    let options = {
      page: changes.page === undefined ? this.state.page : changes.page,
      sort: changes.sort === undefined ? this.state.sort : changes.sort,
      filter: changes.filter === undefined ? this.props.filter : changes.filter,
    };
    this.setState({page: options.page, sort: options.sort, loading: true});

    this.props.api((options.page - 1) * this.pageSize(), this.pageSize(), options.filter, options.sort).then((result) => {
      // If this page is still desired
      if (this.isDesiredLoad(options)) {
        this.setState({
          loading: false,
          rows: result.rows,
          total: result.total,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {filter, pageSize} = this.props;

    if (!isEqual(nextProps.filter, filter) || pageSize !== nextProps.pageSize) {
      setTimeout(() => {
        this.loadData({page: 1, sort: null, filter: nextProps.filter})
      })
    }

  }

  isDesiredLoad(options) {
    return options.page == this.state.page &&
      isEqual(options.sort, this.state.sort) &&
      isEqual(options.filter, this.props.filter)
      ;
  }

  pageSize() {
    const {pageSize = 50} = this.props;
    return pageSize;
  }

  toggleSort(sortKey) {

    if (this.state.sort == null || this.state.sort.key != sortKey) {
      this.loadData({sort: {key: sortKey, asc: true}, page: 1});
    } else {
      if (this.state.sort.asc) {
        this.loadData({sort: {key: sortKey, asc: false}, page: 1});
      } else {
        this.loadData({sort: null, page: 1});
      }
    }
  }

  renderHeaderCell = (column, index, rows) => {
    let {label, sortable = false, sortKey, cellClass, customHeader = null, show = () => true} = column;
    if(!show({data: rows})){
      return null;
    }
    let renderHeader = () => customHeader ? customHeader(rows) : label;
    if (!sortable) {
      return (
        <th className={column.cellClass} key={index}>
          {renderHeader()}
        </th>
      );
    }

    if (!sortKey) {
      throw new Error(`Sortable Column "${label}" need sortFunc or sortKey property`);
    }

    return (
      <SortableHeaderCell
        key={index}
        label={label}
        className={cellClass}
        sort={this.state.sort && this.state.sort.key == sortKey && (this.state.sort.asc ? "asc" : "desc")}
        onClick={() => this.toggleSort(sortKey)}
        header={renderHeader()}
      />
    )
  };
  clickRow = (e, row) => {

    if (this.props.rowLinkTo) {
      customHistory.push(this.props.rowLinkTo(row));
    } else if (this.props.onClickRow) {
      this.props.onClickRow(row);
    }
  };

  render() {
    const {className, columns, ...props} = this.props;
    const _columns = [...columns];


    return (
      <div className={classnames("api-data-table", className)}>
        {this.state.rows != null && (
          <DataTable
            {...props}
            clickRow={this.clickRow}
            columns={_columns}
            renderHeaderCell={(column, index) => this.renderHeaderCell(column, index)}
            rows={this.state.rows}
          />
        )}
        {this.state.loading && (
          <LoadingOverLay className={"data-loading"}/>
        )}

        <div className="table-footer">
          {!this.state.loading && this.state.rows && this.state.rows.length > 0 && (
            <div className="summary ">
              Hiển thị {(this.state.page - 1) * this.pageSize() + 1} - {(this.state.page - 1) * this.pageSize() + this.state.rows.length} trong {this.state.total} kết quả
            </div>
          )}


          {this.state.total != null && this.state.total > this.pageSize() && (
            <Pagination
              className="table-pagination"
              value={this.state.page}
              total={Math.ceil(this.state.total / this.pageSize())}
              onChange={(newPage) => this.loadData({page: newPage})}
            />
          )}
        </div>
      </div>
    );

  }
}

export const getValueOf = (val, ...args) => {
  if (!val) {
    return null;
  } else if (typeof val === "function") {
    return val(...args);
  } else {
    return val;
  }
};

export function SortableHeaderCell(props) {
  return (
    <th onClick={props.onClick}
        className={classnames("sortable-header-cell", props.className)}
    >
      <span>
      {props.header}

        {props.sort && (
          <i className={`la ${props.sort == "asc" ? 'la-arrow-down' : 'la-arrow-up'}`}/>
        )}
      </span>
    </th>
  )
}