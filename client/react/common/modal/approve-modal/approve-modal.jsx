import React from "react";
import {modals} from "../modals";
import {KComponent} from "../../k-component";
import {createSimpleForm} from "../../form-validator/form-validator";
import {rcApproveSchema, roomSchema} from "../../../routes/authen-routes/schema";
import {InputBase} from "../../base-input/base-input";
import {RegistrationInfoForm} from "../../../routes/authen-routes/candidate-registration/form/registration-info/registration-info";
import {LoadingInline} from "../../loading-inline/loading-inline";
import {rcApi} from "../../../../api/common/rc-api";
import {Select} from "../../select/select";
import {InitContestRoom} from "./init-contest-room/init-contest-room";

export class ApproveModal extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      err: '',
    };

    this.form = createSimpleForm(rcApproveSchema, {
      initData: {...props.value, SBD: "", examDateID: ""}
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };




  handleConfirm = () => {
    let data = this.form.getData();
    this.setState({loading: true});
    rcApi.createCandidateInstance({...data}).then(() => {
      this.props.onClose();
    }).catch((err) => this.setState({loading: false, err}))
  };

  render() {
    let {onClose} = this.props;
    let canSave = this.form.isValid() && !this.state.loading && !this.state.err;
    return (
      <div className="approve-modal">
        <div className="modal-header">
          <div className="modal-title">
            Duyệt thí sinh
          </div>
          <i className="fas fa-times close-modal"
             onClick={() => onClose()}
          />
        </div>
        <div className="modal-body">

          <RegistrationInfoForm
            form={this.form}
            onChange={() => this.setState({err: ""})}
            err={this.state.err}
            showPassword
          />
          <InitContestRoom
            form={this.form}
            onChange={() => this.setState({err: ""})}
          />

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={() => onClose()}>
            Hủy bỏ
          </button>
          <button type="button" className="btn btn-primary ml-3" disabled={!canSave} onClick={this.handleConfirm}>
            {this.state.loading && (
              <LoadingInline/>
            )

            }
            Tạo Thí sinh
          </button>
        </div>
      </div>
    );
  }
}

export const approveModal = {
  open({value}){
    const modal = modals.openModal({
      content: (
        <ApproveModal
          value={value}
          onClose={() => modal.close()}
        />
      )
    });
    return modal.result;
  }
};