import React from "react";
import {ProductRatingSection} from "./product-rating-section/product-rating-section";
import {CommentsList} from "./comments-list/comments-list";
import {CmtListActions} from "./cmt-list-actions";
import {client} from "../../../../../graphql";
import {getProductComments} from "../../../../../graphql/queries/product";

export class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    client.query({
      query: getProductComments,
      variables: {
        productID: props.productID,
        skip: 0,
        take: 5,
        sortByStar: "DESC"
      }
    }).then(({data}) => {
      console.log(data.getProductComments)
    });

  };

  render() {
    return (
      <div className="product-comment-section">
        <p className="section-header">KHÁCH HÀNG NHẬN XÉT</p>
        <div className="section-body">
          <ProductRatingSection/>
          <div className="comments-list-section">
            <CmtListActions/>
            <CommentsList/>
          </div>
        </div>

      </div>
    );
  }
}
