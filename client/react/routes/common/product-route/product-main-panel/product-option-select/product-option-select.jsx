import React from "react";
import classnames from "classnames"

const POption = ({content, onClick, active}) => {
  return (
    <div className={classnames("p-option", {active})}
         onClick={onClick}
    >
      {content}
    </div>)
};

const OptionSelect = ({onChange, options, current}) => {
  return (
    <div className="option-select">
      <div className="ins">
        Chọn phiên bản: <span className="p-des">{current.description}</span>
      </div>
      <div className="option-list">
        {options.map((each, i) => (
          <POption
            key={i}
            active={each._id === current._id}
            content={each.description}
            onClick={() => onChange({...each})}
          />
        ))}
      </div>
    </div>
  );
};

const BuyerAction = props => {
  return (
    <div className="buyer-actions">

    </div>
  )
};

export class ProductOptionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="product-option-select">
        <OptionSelect
          {...this.props}
        />
        <BuyerAction

        />
      </div>
    );
  }
}