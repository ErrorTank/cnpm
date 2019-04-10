import React from "react";
import {Logo} from "../logo/logo";

export class UserViewCol extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let {info, utils = []} = this.props;
    return (
      <div className="user-view-col m-portlet">
        <div className="m-portlet__body">
          <div className="m-card-profile">
            <div className="m-card-profile__pic">
              <div className="m-card-profile__pic-wrapper">
                <Logo/>
              </div>
            </div>
            <div className="m-card-profile__details">
              <span className="m-card-profile__name">{info.name}</span>
              <a className="m-card-profile__email m-link">{info.email}</a>
            </div>
          </div>
          <div className="m-nav m-nav--hover-bg m-portlet-fit--sides">
            <li className="m-nav__separator m-nav__separator--fit"></li>
            {utils.map((each, i) => (
              <li className="m-nav__item"
                  key={i}
                  onClick={each.onClick}
              >
                <a className="m-nav__link">
                  {each.icon("m-nav__link-icon")}
                  <span className="m-nav__link-text">{each.label}</span>
                </a>

              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}