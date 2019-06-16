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
import {buildParams} from "../../../../common/common-utils";
import {customHistory} from "../../routes";
import isEqual from "lodash/isEqual"

export default class ProductsRoute extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      mainFilter: {
        keyword: "",
        sort: null,
      },
      execTime: null,
      productFilters: null,

    };
    this.state = {
      ...this.defaultState,
      breadcrumb: null,
      total: 0,
      loading: true
    };

    this.paramInfo = parseQueryString(this.props.location.search);
    let possibleType = ["brand", "category", "provider", "priceRange"];
    if(!this.paramInfo.type || !possibleType.includes(this.paramInfo.type)){
      customHistory.push("/")
    }
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
    },
    // "rating": {
    //   title: () => {
    //     return categoriesCache.syncGet().find(each => each._id === this.paramInfo.category).name;
    //   },
    //   idValue: () => {
    //     return this.paramInfo.category;
    //   },
    //   fetchBreadcrumbData: () => {
    //     return client.query({
    //       query: getCategoriesParents,
    //       variables: {
    //         cID: this.paramInfo.category
    //       },
    //       fetchPolicy: "no-cache"
    //     }).then(({data}) => {
    //       return data.getCategoriesParents;
    //     });
    //   }
    // }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    let nextParams = parseQueryString(nextProps.location.search);
    if(!isEqual(nextParams, this.paramInfo)){
      this.paramInfo = {...nextParams};
      this.setState({loading: true, ...this.defaultState});
      this.getBreadcrumbData().then(categories => {
        this.setState({breadcrumb: transformCategoriesToFuckingArray(categories)});
      })

    }
  }


  getBreadcrumbData = () => {
    return this.matcher[this.paramInfo.type].fetchBreadcrumbData();
  };

  getPageTitle = () => {
    return this.matcher[this.paramInfo.type].title();
  };

  handleClickFilter = (filters) => {
    // let {location} = this.props;
    let newParams = {...this.paramInfo, ...filters};
    if(filters.hasOwnProperty("priceRange")){
      let {from, to} = filters.priceRange;
      newParams = {...newParams, priceRange: `${from}_${to}`};
    }
    let paramUrl = `/products` + buildParams(newParams);
    customHistory.push(paramUrl);
  };

  render() {
    let {breadcrumb, mainFilter, productFilters, total, loading, execTime} = this.state;
    let api = ({skip, take}) => {
      let { mainFilter} = this.state;
      this.setState({loading: true});
      return client.query({
        query: getProducts,
        variables: {
          mainFilter: {...mainFilter, keyword: mainFilter.keyword.trim()},
          categoryID: this.paramInfo.category,
          rating: Number(this.paramInfo.rating),
          brand: this.paramInfo.brand,
          provider: this.paramInfo.provider,
          priceRange: this.paramInfo.priceRange,
          skip,
          take
        },
        fetchPolicy: "no-cache"
      }).then(({data}) => {
        this.setState({loading: false, total: data.getProducts.total, execTime: data.getProducts.execTime, productFilters: data.getProducts.productFilters});
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
                  filters={productFilters}
                  params={this.paramInfo}
                  onChange={this.handleClickFilter}
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
                    {...this.paramInfo}
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