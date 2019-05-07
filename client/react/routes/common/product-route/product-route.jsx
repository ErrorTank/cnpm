import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {client} from "../../../../graphql";
import {createVisitedCacheFunction} from "../../../../common/cache/recent-product-guest-visit-cache";
import {getBasicProductInfo, getFullProductDetails} from "../../../../graphql/queries/product";
import pick from "lodash/pick"
import {userInfo} from "../../../../common/states/user-info";
import {Breadcrumb} from "../../../common/breadcrumb/breadcrumb";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {ProductMainPanel} from "./product-main-panel/product-main-panel";
import {ProductDetailFields} from "./product-detail-fields/product-detail-fields";


export class ProductRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true
    };

    client.query({
      query: getBasicProductInfo
      ,
      variables: {
        pID: props.match.params.productID
      }
    }).then(({data}) => {
      let result = data.getProduct;
      let info = userInfo.getState();
      createVisitedCacheFunction("add")(info ? info._id : null, pick(result, ["name", "_id", "options", "deal", "description", "regularDiscount"]));
      this.setState({loading: false, product: {...result}});
    })
  };

  render() {
    let {loading, product} = this.state;
    console.log(product)
    return (
      <PageTitle
        title={product ? product.name : "Đang tải thông tin sản phẩm"}
      >
        <AuthenLayout
          showCategories={true}
        >
          <div className="product-route">
            {(loading) ? (
              <LoadingInline/>
            ) : (
              <Breadcrumb
                items={[...product.categories]}
              >
                <div className="container content-container">
                  <ProductMainPanel
                    {...product}
                  />
                  <ProductDetailFields
                    {...product}
                  />
                </div>
              </Breadcrumb>
            )}
          </div>


        </AuthenLayout>
      </PageTitle>
    );
  }
}