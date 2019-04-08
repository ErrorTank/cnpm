import React from "react";
import classnames from "classnames";
import {ClickOutside} from "../click-outside/click-outside";

export class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  };

  render() {
    let {show} = this.state;
    let {label = "", inline = false, className, displayAs = null, list = [], value = null, placeholder = "", compare, onChange} = this.props;
    return (
      <ClickOutside onClickOut={() => show && this.setState({show: false})}>
        <div className={classnames(className, "m-form__group k-custom-select", {"m-form__group--inline": inline})}>
          <div className="m-form__label">
            {label && (<label>{label}</label>)}
          </div>
          <div className="m-form__control">
            <div className={classnames("dropdown bootstrap-select form-control m-bootstrap-select p-0 h-auto", {"show": show})}>
              <button type="button" className="btn dropdown-toggle btn-light bs-placeholder" onClick={() => this.setState({show: !show})}>
                <span className="filter-option-inner">{value ? displayAs ? displayAs(value) : value.label : placeholder}</span>
                <i className="fas fa-caret-down"></i>
              </button>
              <div className={classnames("dropdown-menu", {"show": show})}>
                <div className="inner-dropdown">
                  <ul className="menu show">
                    {list.map((each, i) => (
                      <li key={i} className={classnames({"selected active": compare(each)})} onClick={() => {
                        onChange(each)
                        this.setState({show: false})
                      }}>
                        <a className={classnames("item", {"selected active": compare(each)})}>
                          <i className="fas fa-check"></i>
                          <span className="text">{displayAs ? displayAs(each) : each.label}</span>
                        </a>
                      </li>
                    ))

                    }
                  </ul>
                </div>


              </div>
            </div>
          </div>
        </div>
      </ClickOutside>

    );
  }
}