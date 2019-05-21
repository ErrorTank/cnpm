import React, {Fragment} from "react";
import {ProductRatingSection} from "./product-rating-section/product-rating-section";
import {CommentsList} from "./comments-list/comments-list";
import {CmtListActions} from "./cmt-list-actions";
import {client} from "../../../../../graphql";
import {ScrollToFetch} from "../../../../common/scroll-to-fetch/scroll-to-fetch";
import {getProductComments} from "../../../../../graphql/queries/product";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

export class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      filter:{
        skip: 0,
        take: 5,
        sortByStar: "ALL"
      },
      loading: true
    };


  };

  fetchComments = () =>{
    client.query({
      query: getProductComments,
      variables: {
        productID: this.props.productID,
        ...this.state.filter
      }
    }).then(({data}) => {
      console.log(data.getProductComments)
      this.setState({comments: [...data.getProductComments.comments], loading: false});
    });
  };

  render() {
    let {loading, comments, filter} = this.state;
    return (
      <ScrollToFetch
        api={this.fetchComments}
      >
        <div className="product-comment-section">

          <p className="section-header">KHÁCH HÀNG NHẬN XÉT</p>

          <div className="section-body">
            {loading ? (
              <LoadingInline/>
            ) : comments.length ? (

              <Fragment>
                <ProductRatingSection
                  comments={comments}
                />
                <div className="comments-list-section">
                  <CmtListActions
                    filter={filter}
                  />
                  <CommentsList
                    filter={filter}
                    comments={comments}
                  />
                </div>
              </Fragment>
            ) : (
              <p className="unseen-notify">Không có nhận xét nào cho sản phẩm này</p>
            )}

          </div>

        </div>
      </ScrollToFetch>
    );
  }
}
