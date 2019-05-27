import React from "react";
import {InputBase} from "../../../../../common/base-input/base-input";

export class SubCommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subContent: ""
    };
  };

  render() {
    let {subContent} = this.state;
    let canSend = (subContent && subContent.length <= 300);
    return (
      <div className="sub-cmt-input">
        <InputBase
          className="rp-input pt-0"
          type={"text"}
          onKeyDown={e => {
            if(e.keyCode === 13){
              this.props.addReply(subContent)
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
          <button className="btn yellow-btn" disabled={!canSend}>Gửi trả lời của bạn</button>
          <button className="btn cancel-btn" onClick={this.props.onCancel}>Hủy bỏ</button>
        </div>
      </div>
    );
  }
}