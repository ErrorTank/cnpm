import React from "react";
import {modals} from "../modals";
import {KComponent} from "../../k-component";
import {createSimpleForm} from "../../form-validator/form-validator";
import {examDateSchema} from "../../../routes/authen-routes/schema";
import {InputBase} from "../../base-input/base-input";
import {Select} from "../../select/select";
import {InputDateTime} from "../../input-date-time/input-date-time";


export class ExamDateModal extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.form = createSimpleForm(examDateSchema, {
      initData: props.value ? {...props.value} : {
        start: "",
        stop: "",
        content: "",
        roomID: ""
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
      <div className="exam-date-modal">
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
                {this.form.enhanceComponent("start", ({error,  onChange, value}) => (
                  <InputDateTime
                    className="ed-input pt-0"
                    error={error}
                    id={"start"}
                    onChange={e => {
                      console.log(e)
                      onChange(e);
                    }}
                    label={"Thời gian bắt đầu"}
                    value={value}
                  />
                ), true)}
              </div>

              <div className="col-10">

                {this.form.enhanceComponent("stop", ({error, onEnter, onChange, value}) => (
                  <InputDateTime
                    className="ed-input pt-0"
                    error={error}
                    id={"stop"}
                    onChange={e => {
                      console.log(e)
                      onChange(e);
                    }}
                    label={"Thời gian kết thúc"}
                    value={value}
                  />
                ), true)}

              </div>
              <div className="col-10">

                {this.form.enhanceComponent("roomID", ({error, onEnter, onChange, value, ...others}) => (
                  <Select
                    className="ed-input pt-0"
                    options={this.props.rooms}
                    value={value}
                    getValue={item => item.roomID}
                    displayAs={item => item.name + " (" + item.locate + ")"}
                    onChange={e => {
                      onChange(e.target.value)
                    }}
                    label={"Phòng thi"}
                    placeholder={"Chọn phòng thi"}
                  />
                ), true)}

              </div>
              <div className="col-10">

                {this.form.enhanceComponent("content", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="ed-input pt-0"
                    error={error}
                    id={"content"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      onChange(e);
                    }}
                    inputType={"textarea"}
                    type={"text"}
                    label={"Mô tả"}
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

export const examDateModal = {
  open({onChange, value, confirmText, disabled, rooms}){
    const modal = modals.openModal({
      content: (
        <ExamDateModal
          onChange={(data) => onChange(data).then(() => modal.close())}
          onClose={() => modal.close()}
          value={value}
          confirmText={confirmText}
          disabled={disabled}
          rooms={rooms}
        />
      )
    });
    return modal.result;
  }
};