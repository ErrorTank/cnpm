import React, {Fragment} from "react";
import {ProductImagesDisplay} from "../../../../common/product-images-display/product-images-display";
import {ProductMainInfo} from "./product-main-info";
import {ProductHeaderInfo} from "./product-header-info";

export class ProductMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: props.options[0]
    };
  };

  render() {
    let {options, ...rest} = this.props;
    let {currentOption} = this.state;
    return (
      <div className="product-main-panel">
        <ProductLeftPanel
          optionInfo={currentOption}
        />
        <ProductRightPanel
          optionInfo={currentOption}
          commonInfo={rest}
          options={options}
          onChangeOption={option => this.setState({currentOption: option})}
        />
      </div>
    );
  }
}

const ProductLeftPanel = props => {
  let {optionInfo} = props;
  return (
    <div className="product-left-panel">
      <ProductImagesDisplay
        images={optionInfo.picture}
      />
    </div>
  )
};

const ProductRightPanel = (props) => {

  console.log(props)
  return (
    <div className="product-right-panel">
      <ProductHeaderInfo
        {...props}
      />
      <ProductMainInfo

        {...props}
      />
    </div>
  )
};

