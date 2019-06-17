import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {parseQueryString} from "../../../../string-utils";
import {Breadcrumb} from "../../../common/breadcrumb/breadcrumb";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {client} from "../../../../graphql";
import {searchProducts} from "../../../../graphql/queries/product";
import isEqual from "lodash/isEqual";
import {ProductsRow} from "../index-route/index-product-list/index-product-list";
import minBy from "lodash/minBy";

export default class SearchRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      products: []
    };
    this.paramInfo = parseQueryString(this.props.location.search);
    this.fetchData().then(products =>  this.setState({
      searching: false,
      products
    }))
  };

  fetchData = () => {
    return client.query({
      query: searchProducts,
      variables: {
        keyword: this.paramInfo.keyword
      }
    }).then(({data}) => {
      return data.searchProducts.products;

    })
  };

  componentWillReceiveProps(nextProps, nextContext) {
    let nextParams = parseQueryString(nextProps.location.search);
    if(!isEqual(nextParams, this.paramInfo)){
      this.paramInfo = {...nextParams};
      this.setState({searching: true});
      this.fetchData().then(products => {
        this.setState({products});
      })

    }
  }

  getRenderList = (list) => {
    if(!list.length) return [];
    let rowsCount = Math.ceil(list.length / 5);
    return Array.from(new Array(rowsCount)).map((each, i) => list.slice(i * 5, i * 5 + 5));
  };

  render() {
    let {searching, products} = this.state;
    let renderList = this.getRenderList(products.map(({info, ...temp}) => {
      let {provider, ...rest} = info;
      let minProvider = minBy(provider, each => minBy(each.options, op => op.price).price);
      return {...rest, ...temp , discountWithCode: minProvider.discountWithCode, options: [minBy(minProvider.options, each => each.price)]}
    }));
    return (
      <PageTitle
        title={!searching ? `${products.length} kết quả cho: ${decodeURIComponent(this.paramInfo.keyword)}` : "Đang tìm kiếm..."}
      >
        <AuthenLayout
          showCategories={true}
        >
          <Breadcrumb
            items={[{name: decodeURIComponent(this.paramInfo.keyword), _id: "dasdasd1312" ,onClick: () => null}]}
          >
            <div className="container content-container search-route">
              {searching && (
                <LoadingInline/>
              )}
              {products.length ? (
                <div className="product-list">
                  {renderList.map((each, i) => (
                    <ProductsRow
                      className="search-list"
                      rowList={each}
                      key={i}
                      cols={5}
                      animate={false}
                      deal={false}
                      showDetails={true}
                    />
                  ))}
                </div>
              ) : searching ?  null : <p className="empty-notify">Không có sản phẩm nào</p>}
            </div>
          </Breadcrumb>
        </AuthenLayout>
      </PageTitle>
    );
  }
}