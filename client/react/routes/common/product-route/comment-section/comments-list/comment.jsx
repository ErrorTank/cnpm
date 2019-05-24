import React from "react";
import {moment} from "../../../../../../common/moment-utils";
import {StarRating} from "../../../../../common/star-rating/star-rating";
import {Avatar} from "../../../../../common/avatar/avatar";
import {UserCmtInfo} from "./user-cmt-info";
import classnames from "classnames"
import {MoreInfoList} from "../../../../../common/more-info-list/more-info-list";
import {calcSalePrice, formatMoney} from "../../../../../../common/products-utils";

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubForm: false
    };
  };

  render() {
    let {author, updatedAt, subComment, ...rest} = this.props;
    let {showSubForm} = this.state;
    return (
      <div className="comment">
        <div className="user-info">
          <UserCmtAvatar
            {...author}
          />
          <p className="updated-time">{moment(Number(updatedAt)).fromNow()}</p>
        </div>
        <div className="user-cmt-info">
          <UserCmtInfo
            {...rest}
          />
          <div className="user-cmt-actions">
            <span className={classnames("reply-toggle", {active: showSubForm})} onClick={() => this.setState({showSubForm: !showSubForm})}>Gửi trả lời</span>

          </div>
          <MoreInfoList
            className={"sub-cmt-list"}
            threshold={2}
            list={subComment}
            renderToggle={show => (
              <span>{show ? `Thu gọn` : `Xem thêm ${subComment.length - 2} bình luận`}</span>
            )}
            renderItem={(sub) => (
              <div className="sub-cmt">
                <Avatar
                  className={"sub-ava"}
                  url={sub.author.picture}
                  name={sub.author.fullname}
                />
                <p className="sub-name">{sub.author.fullname}</p>
                <p className="sub-content">{sub.content}</p>
              </div>
            )}
          />
        </div>

      </div>
    );
  }
}



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