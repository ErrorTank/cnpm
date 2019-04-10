import React from "react";
import classnames from "classnames"

export class MultipleStepsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {onClickLabel = () =>  null, steps, currentStep,} = this.props;
    let check = (each) => each.hasOwnProperty("isDone") ? each.isDone(each) : each.step < currentStep;
    return (
      <div className="multiple-steps-tabs m-portlet">
        <div className="m-wizard m-wizard--5 m-wizard--success m-wizard--step-first">
          <div className="m-wizard__head m-portlet__padding-x">
            <div className="row">
              <div className="col-xl-10 offset-xl-1">
                <div className="m-wizard__nav">
                  <div className="m-wizard__steps">
                    {steps.map((each, i) => (
                      <div className={classnames("m-wizard__step", {
                        "m-wizard__step--current": currentStep === each.step,
                        "m-wizard__step--done": check(each)
                      })}
                           key={i}
                           onClick={() => onClickLabel(each.step)}
                      >
                        <a className="m-wizard__step-number">
                          <span className="m-wizard__step-seq">{i + 1}.</span>
                          <span className="m-wizard__step-label">
                            {each.label}
												</span>
                          {check(each) && (
                            <span className="m-wizard__step-icon"><i className="fas fa-check"></i></span>
                          )

                          }

                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-wizard__form">
            <div className="m-form m-form--label-align-left- m-form--state-">
              <div className="m-portlet__body">

                <div
                  className={classnames("m-wizard__form-step m-wizard__form-step--current")}

                >
                  <div className="row">
                    <div className="col-xl-10 offset-xl-1">
                      <div className="m-form__section m-form__section--first">
                        {steps.find(each => each.step === currentStep).render()}
                      </div>

                    </div>
                  </div>
                </div>


              </div>
              <div className="m-portlet__foot m-portlet__foot--fit m--margin-top-40">
                <div className={"m-form__actions m-form__actions"}>
                  <div className="row justify-content-end an-actions">
                    {steps.find(each => each.step === currentStep).renderActions()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}