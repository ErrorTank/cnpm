import React from "react";
import {IndexProductList} from "../index-product-list/index-product-list";


export class DealSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  fetchDealProducts = () => new Promise((resolve, reject) => {
    setTimeout( () => {

      resolve([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
    }, 3000);
  });

  render() {
    return (
      <div className="deal-section taka-section">
        <div className="ds-header">
                <span className="ds-icon">
                  <div><i className="fas fa-percentage"></i></div>

                </span>
          <p className="main-title">Taka Deal</p>
          <p className="sub">Cập nhật hàng giờ tất cả những deal giảm giá đặc biệt trên Tiki. Hãy bookmark trang này và
            quay lại thường xuyên để không bỏ lỡ bạn nhé!</p>
        </div>
        <IndexProductList
          cols={5}
          api={this.fetchDealProducts}
        />
      </div>
    );
  }
}