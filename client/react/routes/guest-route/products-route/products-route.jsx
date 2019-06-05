import React from "react";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import CheckoutCart from "../../common/cart-route/cart-route";
import {PageTitle} from "../../../common/page-title/page-title";
import {parseQueryString} from "../../../../string-utils";
import {ProductFilterBar} from "./product-filter-bar/product-filter-bar";
import {PaginationProductList} from "./pagination-product-list/pagination-product-list";
import {MainProductFilter} from "./main-product-filter/main-product-filter";
import {categoriesCache} from "../../../../common/cache/api-cache/common-cache";
import {client} from "../../../../graphql";
import {getCartItemByIdList} from "../../../../graphql/queries/user";
import {createUserCartCacheFunction} from "../../../../common/cache/cart-cache";
import {getCategoriesParents} from "../../../../graphql/queries/category";
import {transformCategoriesToFuckingArray} from "../../../../common/products-utils";
import {Breadcrumb} from "../../../common/breadcrumb/breadcrumb";
import {getProducts} from "../../../../graphql/queries/product";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";

export class ProductsRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainFilter: {
        keyword: "",
        sort: null,
      },
      productFilter: null,
      breadcrumb: null,
      total: 0,
      loading: true
    };

    this.paramInfo = parseQueryString(this.props.location.search);

    this.getBreadcrumbData().then(categories => {
      this.setState({breadcrumb: transformCategoriesToFuckingArray(categories)});
    })
  };

  matcher = {
    "category": {
      title: () => {
        return categoriesCache.syncGet().find(each => each._id === this.paramInfo.category).name;
      },
      idValue: () => {
        return this.paramInfo.category;
      },
      fetchBreadcrumbData: () => {
        return client.query({
          query: getCategoriesParents,
          variables: {
            cID: this.paramInfo.category
          }
        }).then(({data}) => {
          return data.getCategoriesParents;
        });
      }
    }
  };

  getPageIdValue = () => {
    const queryObj = this.paramInfo;
    return this.matcher[Object.keys(queryObj)[0]].idValue();
  };

  getBreadcrumbData = () => {
    const queryObj = this.paramInfo;
    return this.matcher[Object.keys(queryObj)[0]].fetchBreadcrumbData();
  };

  getPageTitle = () => {
    const queryObj = this.paramInfo;
    return this.matcher[Object.keys(queryObj)[0]].title();
  };

  render() {
    let {breadcrumb, mainFilter, productFilter, total, loading} = this.state;
    let api = ({skip, take}) => {
      let { mainFilter, productFilter} = this.state;
      this.setState({loading: true});
      return client.query({
        query: getProducts,
        variables: {
          mainFilter,
          productFilter,
          categoryID: this.paramInfo.category,
          skip,
          take
        },
        fetchPolicy: "no-cache"
      }).then(({data}) => {
        this.setState({loading: false, total: data.getProducts.total});
        return data.getProducts.products;
      });
    };

    return (
      <PageTitle
        title={this.getPageTitle()}
      >
        <AuthenLayout
          showCategories={true}
        >
          <Breadcrumb
            items={breadcrumb || []}
          >
            <div className="container content-container products-route">
              <div className="left-panel">
                <ProductFilterBar
                  filter={productFilter}
                  onChange={productFilter => this.setState({productFilter})}
                />
              </div>
              <div className="right-panel">
                {loading && (
                  <LoadingInline/>
                )}
                <div className="rp-header">
                  {this.getPageTitle()}: <span className="result">{total} kết quả</span>
                </div>
                <MainProductFilter
                  filter={mainFilter}
                  onChange={mainFilter => this.setState({mainFilter})}
                  title={this.getPageTitle()}
                />
                <PaginationProductList
                  filter={mainFilter}
                  onChange={mainFilter => this.setState({mainFilter})}
                  api={api}
                  maxItem={9}
                />
              </div>
            </div>
          </Breadcrumb>
        </AuthenLayout>
      </PageTitle>
    );
  }
}