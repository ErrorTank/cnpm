import React from "react";

export class FormTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const {tabs = [], activeTab, onChangeTab, renderActions} = this.props;
    return (
      <div className="m-portlet m-portlet--tabs form-tabs">
        <div className="m-portlet__head">
          <div className="m-portlet__head-tools">
            <ul className="nav nav-tabs m-tabs m-tabs-line   m-tabs-line--left m-tabs-line--primary">
              {tabs.map((t, index) => (
                <li
                  className={`nav-item m-tabs__item`}
                  key={index}
                  onClick={() => onChangeTab(t, index)}
                >
                  <a className={`nav-link m-tabs__link ${t.label == activeTab.label && "active"}`}>
                    {t.icon} {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="m-portlet__body">
          <div className="tab-content">
            {activeTab.render()}
          </div>
        </div>
        <div className="m-portlet__foot m-portlet__foot--fit">
          <div className="m-form__actions">
            {renderActions()}

          </div>
        </div>
      </div>
    );
  }
}