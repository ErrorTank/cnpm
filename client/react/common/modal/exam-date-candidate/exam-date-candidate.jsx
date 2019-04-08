import React from "react";
import {modals} from "../modals";
import {KComponent} from "../../k-component";
import {createSimpleForm} from "../../form-validator/form-validator";
import {examDateCandidateSchema, examDateSchema} from "../../../routes/authen-routes/schema";
import {InputBase} from "../../base-input/base-input";
import {Select} from "../../select/select";
import {InputDateTime} from "../../input-date-time/input-date-time";
import moment from "moment"


export class ExamDateCandidateModal extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.form = createSimpleForm(examDateCandidateSchema, {
      initData: props.value ? {...props.value} : {
        cID: "",
        SBD: "",
        examDate: ""

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
    let {disabled = () => false, onClose, confirmText, disabledPickCan = false} = this.props;
    let canSave = this.form.isValid() && !this.state.loading && !disabled(this.form.getData());
    return (
      <div className="exam-date-candidate-modal">
        <div className="modal-header">
          <div className="modal-title">
            Thêm thí sinh
          </div>
          <i className="fas fa-times close-modal"
             onClick={() => onClose()}
          />
        </div>
        <div className="modal-body">
          <div className="m-form m-form--fit m-form--label-align-right m-form--state">
            <div className="row justify-content-center">

              <div className="col-10">

                {this.form.enhanceComponent("SBD", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="edc-input pt-0"
                    error={error}
                    id={"SBD"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      onChange(e);
                    }}
                    type={"text"}
                    label={"SBD"}
                    {...others}
                  />
                ), true)}

              </div>
              <div className="col-10">

                {this.form.enhanceComponent("cID", ({error, onEnter, onChange, value, ...others}) => (
                  <Select
                    className="edc-input pt-0"
                    options={this.props.candidates}
                    value={value}
                    disabled={disabledPickCan}
                    getValue={item => item.cID}
                    displayAs={item => item.name + " (" + item.email + ")"}
                    onChange={e => {
                      onChange(e.target.value)
                    }}
                    label={"Thí sinh"}
                    placeholder={"Chọn thí sinh"}
                  />
                ), true)}

              </div>
              <div className="col-10">

                {this.form.enhanceComponent("examDate", ({error, onEnter, onChange, value, ...others}) => (
                  <Select
                    className="edc-input pt-0"
                    options={this.props.examDates}
                    value={value ? value.cardID : ""}
                    getValue={item => item.cardID}
                    displayAs={item => moment(item.start).format("DD/MM/YYYY HH:mm") + " - "  +moment(item.stop).format("DD/MM/YYYY HH:mm")}
                    onChange={e => {
                      onChange(this.props.examDates.find(each=> each.cardID === e.target.value))
                    }}
                    label={"Buổi thi"}
                    placeholder={"Chọn buổi thi"}
                  />
                ), true)}

              </div>
              <div className="col-10">

                {this.form.enhanceComponent("examDate", ({value}) =>
                  value ? (
                      <div>
                        <div className="row p-0">
                          <div className="col-4 p-0">
                            Thời gian:
                          </div>
                          <div className="col-8 p-0">
                            {moment(value.start).format("DD/MM/YYYY HH:mm") + " - "  +moment(value.stop).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </div>
                        <div className="row p-0">
                          <div className="col-4 p-0">
                            Mô tả:
                          </div>
                          <div className="col-8 p-0">
                            {value.content}
                          </div>
                        </div>
                      </div>
                    ) : null


                , true)}

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

export const examDateCandidateModal = {
  open({onChange, value, confirmText, disabled, candidates, examDates, disabledPickCan}){
    const modal = modals.openModal({
      content: (
        <ExamDateCandidateModal
          onChange={(data) => onChange(data).then(() => modal.close())}
          onClose={() => modal.close()}
          value={value}
          confirmText={confirmText}
          disabled={disabled}
          candidates={candidates}
          examDates={examDates}
          disabledPickCan={disabledPickCan}
        />
      )
    });
    return modal.result;
  }
};