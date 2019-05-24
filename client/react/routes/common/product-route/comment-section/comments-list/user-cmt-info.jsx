import React from "react";
import {StarRating} from "../../../../../common/star-rating/star-rating";

export class UserCmtInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {rating, title, content, picture} = this.props;
    return (
      <div className="cmt-info">
        <div className="ci-header">
          <StarRating
            rating={rating}
          />
          <span className="cmt-title">{title}</span>
        </div>
        <div className="ci-body">
          <p className="cmt-content">{content}</p>
          {!!picture.length && (
            <CmtImagesDisplay
              images={picture}
            />
          )}
        </div>
      </div>
    );
  }
}

const CmtImagesDisplay = ({images}) => {
  return (
    <div className="cmt-images-display">
      {images.map(each => (
        <div className="img-block" key={each}>
          <img src={each}/>
        </div>
      ))}
    </div>
  )
};