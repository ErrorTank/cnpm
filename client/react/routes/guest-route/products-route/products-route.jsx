import React from "react";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import CheckoutCart from "../../common/cart-route/cart-route";
import {PageTitle} from "../../../common/page-title/page-title";
import {parseQueryString} from "../../../../string-utils";
import {ProductFilterBar} from "./product-filter-bar/product-filter-bar";
import {PaginationProductList} from "./pagination-product-list/pagination-product-list";
import {MainProductFilter} from "./main-product-filter/main-product-filter";
import {brandCache, categoriesCache, providerCache} from "../../../../common/cache/api-cache/common-cache";
import {client} from "../../../../graphql";
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
    this.getBreadcrumbData().then(items => {
      this.setState({breadcrumb: items});
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
          return transformCategoriesToFuckingArray(data.getCategoriesParents);
        });
      }
    },
    "brand": {
      title: () => {
        return brandCache.syncGet().find(each => each._id === this.paramInfo.brand).name;
      },
      idValue: () => {
        return this.paramInfo.brand;
      },
      fetchBreadcrumbData: () => {
        return Promise.resolve([{_id: this.paramInfo.brand, onClick: () => customHistory.push("/products?type=brand&brand="+this.paramInfo.brand), name: brandCache.syncGet().find(each => each._id === this.paramInfo.brand).name}]);
      },
      additionalRender: () => (
        <span className="bl-contain">
          <img className="brand-logo" src={ brandCache.syncGet().find(each => each._id === this.paramInfo.brand).logo}/>
        </span>

      )
    },
    "provider": {
      title: () => {
        return providerCache.syncGet().find(each => each._id === this.paramInfo.provider).name;
      },
      idValue: () => {
        return this.paramInfo.provider;
      },
      fetchBreadcrumbData: () => {
        return Promise.resolve([{_id: this.paramInfo.provider, onClick: () => customHistory.push("/products?type=provider&provider="+this.paramInfo.provider), name: providerCache.syncGet().find(each => each._id === this.paramInfo.provider).name}]);
      },
      additionalRender: () => {
        let {name, email, phone, address} = providerCache.syncGet().find(each => each._id === this.paramInfo.provider);
        let infoItems = [
          {
            title: "Email",
            icon: <i className="fas fa-envelope"></i>,
            value: email
          },{
            title: "Số điện thoai",
            icon: <i className="fas fa-phone"></i>,
            value: phone
          },{
            title: "Địa chỉ",
            icon: <i className="fas fa-map-marker-alt"></i>,
            value: address
          },
        ];
        return (
          <div className="provider-info">
            <div className="pi-header">
              <p className="provider-name">{name}</p>
            </div>
            <div className="pi-body">
              <div className="row p-0 m-0">
                {infoItems.map((each ,i) => (
                  <div className="info col-6 m-0 p-0" key={i}>
                    <span className="icon">{each.icon}</span>
                    <span className="i-title">{each.title}</span>:
                    <span className="i-value">{each.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    let nextParams = parseQueryString(nextProps.location.search);
    if(!isEqual(nextParams, this.paramInfo)){
      this.paramInfo = {...nextParams};
      this.setState({loading: true, ...this.defaultState});
      this.getBreadcrumbData().then(items => {
        this.setState({breadcrumb: items});
      })

    }
  }


  getBreadcrumbData = () => {
    return this.matcher[this.paramInfo.type].fetchBreadcrumbData();
  };

  getPageTitle = () => {
    return this.matcher[this.paramInfo.type].title();
  };

  getAdditionRender = () => {
    return this.matcher[this.paramInfo.type].additionalRender ? this.matcher[this.paramInfo.type].additionalRender()  : null;
  };

  handleClickFilter = (filters) => {
    // let {location} = this.props;
    let newParams = {...this.paramInfo, ...filters};
    if(filters.hasOwnProperty("priceRange") && filters.priceRange){
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
    let additRender = this.getAdditionRender();

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
                    {additRender && <span className="addition-render">{additRender}</span>}
                    {this.paramInfo.type === "provider" ? "Tất cả mặt hàng" :this.getPageTitle()}: <span className="result">{total} kết quả {execTime && <span style={{"fontSize": "13px"}}>(Trong {(execTime % 60000) / 1000} giây)</span>}</span>
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