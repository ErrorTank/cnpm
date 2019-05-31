import React from "react";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import CheckoutCart from "../../common/cart-route/cart-route";
import {PageTitle} from "../../../common/page-title/page-title";
import {parseQueryString} from "../../../../string-utils";
import {ProductFilterBar} from "./product-filter-bar/product-filter-bar";
import {PaginationProductList} from "./pagination-product-list/pagination-product-list";
import {MainProductFilter} from "./main-product-filter/main-product-filter";

export class ProductsRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainFilter: {
        keyword: "",
        mostSale: false,
        descPrice: false,
        ascPrice: false,
        mostDiscount: true
      },
      productFilter: null,
    };
    const queryObj = parseQueryString(props.location.search);
  };

  render() {
    return (
      <PageTitle
        title={""}
      >
        <AuthenLayout
          showCategories={true}
        >

          <div className="container content-container products-route">
            <div className="left-panel">
              <ProductFilterBar/>
            </div>
            <div className="right-panel">
              <MainProductFilter/>
              <PaginationProductList/>
            </div>
          </div>
        </AuthenLayout>
      </PageTitle>
    );
  }
}