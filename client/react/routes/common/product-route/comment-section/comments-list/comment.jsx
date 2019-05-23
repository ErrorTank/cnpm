import React from "react";
import {moment} from "../../../../../../common/moment-utils";
import {StarRating} from "../../../../../common/star-rating/star-rating";
import {Avatar} from "../../../../../common/avatar/avatar";

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {author, updatedAt, ...rest} = this.props;

    return (
      <div className="comment">
        <div className="user-info">
          <UserCmtAvatar
            {...author}
          />
          <p className="updated-time">{moment(Number(updatedAt)).fromNow()}</p>
        </div>
        <div className="user-cmt-info">
          <CmtInfo
            {...rest}
          />
        </div>
      </div>
    );
  }
}

const CmtInfo = props => {
  let {rating, title} = props;
  return (
    <div className="cmt-info">
      <div className="ci-header">
        <StarRating
          rating={rating}
        />
        <span className="cmt-title">{title}</span>
      </div>
    </div>
  )
};

const UserCmtAvatar = props => {
  let {fullname, picture} = props;
  return (
    <div className="user-cmt-avatar">
      <Avatar
        url={picture}
        name={fullname}
      />
      <p className="user-name">{fullname}</p>
    </div>
  )
};