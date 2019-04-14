import React from "react";
import {LoadingInline} from "../../loading-inline/loading-inline";
import {modals} from "../modals";
import {UserActionsModal} from "../user-actions/user-actions";

export class ResendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false
    };
  };

  handleResend = () => {

  };

  render() {
    let {title, body, btnResendText = "Gửi lại", btnCloseText = "Ok", onClose} = this.props;
    return (
      <div className="resend-modal">
        <div className="modal-header">
          <div className="modal-title">
            {title}
          </div>
          <i className="fas fa-times close-modal"
             onClick={() => onClose()}
          />
        </div>
        <div className="modal-body">
          {body}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={() => onClose()}>
            {btnCloseText}
          </button>
          <button type="button" className="btn btn-primary ml-3" onClick={this.handleResend}>
            {this.state.loading && (
              <LoadingInline/>
            )

            }
            {btnResendText}
          </button>
        </div>
      </div>
    );
  }
}

export const resendModal = {
  open(config) {
    const modal = modals.openModal({
      content: (
        <ResendModal
          {...config}
          onClose={() => modal.close()}
        />
      )
    });
    return modal.result;
  }
};