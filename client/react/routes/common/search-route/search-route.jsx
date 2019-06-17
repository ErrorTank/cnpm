import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {parseQueryString} from "../../../../string-utils";
import {Breadcrumb} from "../../../common/breadcrumb/breadcrumb";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {client} from "../../../../graphql";
import {searchProducts} from "../../../../graphql/queries/product";
import isEqual from "lodash/isEqual";

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

  render() {
    let {searching, products} = this.state;
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

            </div>
          </Breadcrumb>
        </AuthenLayout>
      </PageTitle>
    );
  }
}