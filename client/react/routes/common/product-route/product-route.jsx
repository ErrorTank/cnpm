import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {client} from "../../../../graphql";
import {createVisitedCacheFunction} from "../../../../common/cache/recent-product-guest-visit-cache";
import {getBasicProductInfo, getFullProductDetails} from "../../../../graphql/queries/product";
import pick from "lodash/pick"
import omit from "lodash/omit"
import {userInfo} from "../../../../common/states/common";
import {Breadcrumb} from "../../../common/breadcrumb/breadcrumb";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {ProductMainPanel} from "./product-main-panel/product-main-panel";
import {ProductDetailFields} from "./product-detail-fields/product-detail-fields";
import {ProductDescription,} from "./product-description/product-description";
import {VisitedSection} from "../index-route/visited-section/visited-section";
import {CommentSection} from "./comment-section/comment-section";

export class ProductRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true
    };
    this.fetchData(props.match.params.productID).then(result => this.setState({loading: false, product: {...result}}));

  };

  fetchData = (pID) => {

    return client.query({
      query: getBasicProductInfo
      ,
      variables: {
        pID
      }
    }).then(({data}) => {
      let {info: product, meanStar, commentCount, timeLeft} = data.getBasicProduct;
      let info = userInfo.getState();
      let {options} = product.provider[0];
      createVisitedCacheFunction("add")(info ? info._id : null, {
        ...pick(omit(product, "provider"), ["name", "_id", "deal", "description", "regularDiscount"]),
        options: [...product.provider[0].options]
      });
      return {...product, meanStar, commentCount, describeFields: JSON.parse(product.describeFields), timeLeft};
    })
  };

  componentWillReceiveProps(nextProps) {
    let nextID = nextProps.match.params.productID;
    if (this.state.product && nextID && (this.state.product._id !== nextID)) {
      this.setState({loading: true});
      this.fetchData(nextID).then(data => this.setState({product: {...data}, loading: false}));
    }
  }

  transformCategoriesToFuckingArray = (category, result = []) => {
    let {_id, name, parent} = category;
    if (!parent)
      return [{_id, name}, ...result];
    return this.transformCategoriesToFuckingArray(parent, [{_id, name}, ...result]);
  };


  render() {
    let {loading, product} = this.state;

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
                items={[...this.transformCategoriesToFuckingArray(product.categories), {name: product.name}]}
              >
                <div className="container content-container">
                  <ProductMainPanel
                    {...product}
                  />
                  <ProductDetailFields
                    {...product}
                  />
                  <ProductDescription
                    {...product}
                  />
                  <VisitedSection
                    filterList={list => list.filter(each => each._id !== product._id)}
                  />
                  <CommentSection
                    productID={product._id}
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