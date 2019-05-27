import React from "react";
import {InputBase} from "../../../../../common/base-input/base-input";
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {userInfo} from "../../../../../../common/states/common";
import {userActionModal} from "../../../../../common/modal/user-actions/user-actions";

export class SubCommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subContent: "",
      adding: false
    };
  };


  addReply = () => {
    let {subContent} = this.state;
    this.setState({adding: true});
    this.props.addReply({content: subContent, author: userInfo.getState()._id}).then(() => {
      this.setState({adding: false, subContent: ""});
    });



  };


  render() {
    let {subContent, adding} = this.state;
    let canSend = (subContent && subContent.length <= 300);
    return (
      <div className="sub-cmt-input">
        <InputBase
          className="rp-input pt-0"
          type={"text"}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.addReply();

            }
          }}
          inputType={"textarea"}
          placeholder={"Nhập nội dung trả lời ở đây (Tối đa 300 từ)"}
          onChange={e => {
            this.setState({subContent: e.target.value});
          }}
          value={subContent}
        />
        <div className="sci-actions">
          <button className="btn yellow-btn reply-btn" onClick={this.addReply} disabled={!canSend || adding}>Gửi trả
            lời của bạn
            {adding && (
              <LoadingInline/>
            )}
          </button>
          <button className="btn cancel-btn" onClick={this.props.onCancel}>Hủy bỏ</button>
        </div>
      </div>
    );
  }
}