import React, {Fragment} from "react";
import {Select} from "../../../select/select";
import {InputBase} from "../../../base-input/base-input";
import {LoadingInline} from "../../../loading-inline/loading-inline";
import moment from "moment"
import {rcApi} from "../../../../../api/common/rc-api";
import {contestApi} from "../../../../../api/common/contest-api";

export class InitContestRoom extends React.Component{
    constructor(props){
        super(props);
        this.state={
          loading: true,
          examDates: []
        };
      contestApi.getExamDatesByContestID(props.form.getPathData("contestID")).then(({examDates}) => {
        this.setState({loading: false, examDates})
      })
    };

    componentWillReceiveProps(nextProps, nextContext) {
      if(nextProps.form.getPathData("contestID") !== this.props.form.getPathData("contestID")){
        this.setState({loading: true});
        contestApi.getExamDatesByContestID(nextProps.form.getPathData("contestID")).then(({examDates}) => {

          this.setState({loading: false, examDates})
        })
      }

    }

  render(){
      let {form, onChange: propsOnChange} = this.props;
        return(
          <div className="m-form m-form--fit m-form--label-align-right m-form--state init-contest-room">
            {this.state.loading ? (
              <LoadingInline/>
            ) : (
              <Fragment>
                <div className="row mb-5">
                  <div className="col part-title">
                    Gán kì thi
                  </div>

                </div>
                <div className="row">
                  <div className="col-6">
                    {form.enhanceComponent("examDateID", ({error, onEnter, onChange, value, ...others}) => (
                      <Select
                        className="in-input pt-0"
                        options={this.state.examDates}
                        value={value}
                        displayAs={(each) => `${moment(each.start).format("DD/MM/YYYY HH:mm")} - ${moment(each.stop).format("DD/MM/YYYY HH:mm")}`}
                        getValue={each => each.examDateID}
                        onChange={e => {
                          propsOnChange();
                          onChange(e.target.value)
                        }}
                        label={"Buổi thi"}
                        placeholder="Chọn buổi thi"
                      />
                    ), true)}
                  </div>
                  <div className="col-6">

                    {form.enhanceComponent("SBD", ({error, onEnter, onChange, ...others}) => (
                      <InputBase
                        className="in-input pt-0"
                        error={error}
                        id={"SBD"}
                        onKeyDown={onEnter}
                        onChange={e => {
                          propsOnChange();
                          onChange(e);
                        }}
                        type={"text"}
                        label={"SBD"}
                        {...others}
                      />
                    ), true)}

                  </div>
                </div>
              </Fragment>
            )

            }

          </div>
        );
    }
}