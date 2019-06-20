import React from "react";
import {LoadingInline} from "../../loading-inline/loading-inline";
import {modals} from "../modals";
import {UserActionsModal} from "../user-actions/user-actions";
import {client} from "../../../../graphql";
import {resendConfirmEmail} from "../../../../graphql/queries/user";
import {getErrorObject} from "../../../../graphql/utils/errors";

export class ResendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      serverError: ""
    };
  };

  renderServerError = () => {
    let {serverError} = this.state;
    let errMatcher = {
      "user_not_found": `Tài khoản ${this.props.email} không tồn tại. Vui lòng tạo tài khoản mới.`,
    };
    return errMatcher.hasOwnProperty(serverError) ? errMatcher[serverError] : "Đã có lỗi xảy ra."
  };

  handleResend = () => {
    this.setState({sending: true});
    client.mutate({
      mutation: resendConfirmEmail,
      variables: {
        email: this.props.email,
        redirect: this.props.redirect
      }
    }).then(() => {
      this.setState({sending: false});
    }).catch(err => this.setState({sending: false, serverError: getErrorObject(err).message}))
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
          {this.state.serverError && (
            <p className="server-error">{this.renderServerError()}</p>
          )

          }

          {body}
        </div>
        <div className="modal-footer">

          <button type="button" className="btn btn-success ml-3" onClick={this.handleResend}>
            {this.state.sending && (
              <LoadingInline/>
            )

            }
            {btnResendText}
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onClose()}>
            {btnCloseText}
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