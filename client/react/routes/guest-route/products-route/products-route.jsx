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
import {VisitedSection} from "../../common/index-route/visited-section/visited-section";

export default class ProductsRoute extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      mainFilter: {
        keyword: "",
        sort: null,
      },
      execTime: null,
      productFilter: null,

    };
    this.state = {
      ...this.defaultState,
      breadcrumb: null,
      total: 0,
      loading: true
    };

    this.paramInfo = parseQueryString(this.props.location.search);

    this.getBreadcrumbData().then(categories => {
      this.setState({breadcrumb: transformCategoriesToFuckingArray(categories)});
    });

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
          },
          fetchPolicy: "no-cache"
        }).then(({data}) => {
          return data.getCategoriesParents;
        });
      }
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    let nextParams = parseQueryString(nextProps.location.search);
    if(nextParams.category !== this.paramInfo.category){
      this.paramInfo = {...nextParams};
      this.setState({loading: true, ...this.defaultState});
      this.getBreadcrumbData().then(categories => {
        this.setState({breadcrumb: transformCategoriesToFuckingArray(categories)});
      })

    }
  }

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
    let {breadcrumb, mainFilter, productFilter, total, loading, execTime} = this.state;
    let api = ({skip, take}) => {
      let { mainFilter, productFilter} = this.state;
      this.setState({loading: true});
      return client.query({
        query: getProducts,
        variables: {
          mainFilter: {...mainFilter, keyword: mainFilter.keyword.trim()},
          productFilter,
          categoryID: this.paramInfo.category,
          skip,
          take
        },
        fetchPolicy: "no-cache"
      }).then(({data}) => {
        this.setState({loading: false, total: data.getProducts.total, execTime: data.getProducts.execTime});
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

                <div className="main-section">
                  {loading && (
                    <LoadingInline/>
                  )}
                  <div className="rp-header">
                    {this.getPageTitle()}: <span className="result">{total} kết quả {execTime && <span style={{"fontSize": "13px"}}>(Trong {(execTime % 60000) / 1000} giây)</span>}</span>
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
                    category={this.paramInfo.category}
                    showDeal={false}
                    showDetails={true}
                    maxItem={4}
                    cols={4}
                    total={total}
                  />
                </div>

                <div className="visited">
                  <VisitedSection/>
                </div>

              </div>
            </div>
          </Breadcrumb>
        </AuthenLayout>
      </PageTitle>
    );
  }
}