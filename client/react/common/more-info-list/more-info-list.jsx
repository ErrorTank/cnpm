import React from "react";
import classnames from "classnames"

export class MoreInfoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  };

  render() {
    let {className, renderItem, list, renderToggle, threshold} = this.props;
    let renderList = list.length <= threshold ? list :list.slice(0, this.state.show ? list.length : threshold);
    return (
      <div className={classnames("more-info-list", className)}>
        {renderList.map((each, i) => (
          <div className="item"
               key={i}
          >
            {renderItem(each)}
          </div>
        ))}
        {list.length > threshold && (
          <div className="toggle">
            {renderToggle(this.state.show)}
          </div>
        )}

      </div>
    );
  }
}