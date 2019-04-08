import React from "react";
import {modals} from "../modals";
import {KComponent} from "../../k-component";
import {createSimpleForm} from "../../form-validator/form-validator";
import {roomSchema} from "../../../routes/authen-routes/schema";
import {InputBase} from "../../base-input/base-input";

export class RoomInfoModal extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.form = createSimpleForm(roomSchema, {
      initData: props.value ? {...props.value} : {
        name: "",
        locate: "",
        maxSeat: 0
      }
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };



  handleConfirm = () => {
    let data = this.form.getData();
    this.setState({loading: true});
    this.props.onChange(data);
  };

  render() {
    let {disabled = () => false, onClose, confirmText} = this.props;
    let canSave = this.form.isValid() && !this.state.loading && !disabled(this.form.getData());
    return (
      <div className="room-info-modal">
        <div className="modal-header">
          <div className="modal-title">
            Tạo phòng
          </div>
          <i className="fas fa-times close-modal"
             onClick={() => onClose()}
          />
        </div>
        <div className="modal-body">
          <div className="m-form m-form--fit m-form--label-align-right m-form--state">
            <div className="row justify-content-center">
              <div className="col-10">
                {this.form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="r-input pt-0"
                    error={error}
                    id={"name"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      onChange(e);
                    }}
                    type={"text"}
                    label={"Tên phòng"}
                    {...others}
                  />
                ), true)}
              </div>
              <div className="col-10">

                {this.form.enhanceComponent("locate", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="r-input pt-0"
                    error={error}
                    id={"locate"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      onChange(e);
                    }}
                    type={"text"}
                    label={"Địa điểm"}
                    {...others}
                  />
                ), true)}

              </div>
              <div className="col-10">

                {this.form.enhanceComponent("maxSeat", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="r-input pt-0"
                    error={error}
                    id={"maxSeat"}
                    onKeyDown={onEnter}
                    onChange={e => {

                      onChange(Number(e.target.value));
                    }}
                    type={"number"}
                    label={"Sức chứa"}
                    {...others}
                  />
                ), true)}

              </div>
            </div>
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={() => onClose()}>
            Hủy bỏ
          </button>
          <button type="button" className="btn btn-primary ml-3" disabled={!canSave} onClick={this.handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    );
  }
}

export const roomInfoModal = {
  open({onChange, value, confirmText, disabled}){
    const modal = modals.openModal({
      content: (
        <RoomInfoModal
          onChange={(data) => onChange(data).then(() => modal.close())}
          onClose={() => modal.close()}
          value={value}
          confirmText={confirmText}
          disabled={disabled}
        />
      )
    });
    return modal.result;
  }
};