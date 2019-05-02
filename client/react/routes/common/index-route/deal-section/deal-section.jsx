import React from "react";
import {IndexProductList} from "../index-product-list/index-product-list";
import {client} from "../../../../../graphql";
import {fetchIndexDealProducts} from "../../../../../graphql/queries/product";

export class DealSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  fetchDealProducts = () => {
      return client.query({
          query: fetchIndexDealProducts
      }).then(({data}) => {
          console.log(data);
          return data;
      });
  };

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