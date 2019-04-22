import React from "react";
import classnames from "classnames"
import {CategoriesPicker} from "../../../../common/categories-picker/categories-picker";

export class CategoriesOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {show, onToggle, onMouseLeave} = this.props;
    return (
      <div className={classnames("categories-overlay")}
           onMouseLeave={onMouseLeave}
      >
        <div className="cate-toggle"
             onMouseEnter={onToggle}
        >
          <i className="fas fa-bars"></i>
          DANH MỤC SẢN PHẨM
        </div>
        {show && (
          <div className="overlay">
            <CategoriesPicker/>
          </div>

        )

        }
      </div>
    );
  }
}