import React, {Fragment} from "react";
import {ProductImagesDisplay} from "../../../../common/product-images-display/product-images-display";
import {ProductMainInfo} from "./product-main-info";
import {ProductHeaderInfo} from "./product-header-info";
import pick from "lodash/pick"
import omit from "lodash/omit"

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: props.providerInfo.options[0]
    };
  };

  componentWillReceiveProps(props) {
    if (this.state.currentOption._id !== props.providerInfo.options[0]._id) {
      this.setState({currentOption:  props.providerInfo.options[0]});
    }

  }

  render() {
    let {currentOption} = this.state;
    return (
      <div className="product-main-panel">
        <ProductLeftPanel
          optionInfo={currentOption}
        />
        <ProductRightPanel
          optionInfo={currentOption}
          commonInfo={omit(this.props, ["provider", "providerInfo", "onChangeProvider"])}
          {...pick(this.props, ["provider", "providerInfo", "onChangeProvider"])}
          onChangeOption={option => this.setState({currentOption: option})}
        />
      </div>
    )
  }
}

export class ProductMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProvider: props.provider[0]
    };
  };

  render() {
    let {currentProvider} = this.state;
    return (
      <MainPanel
        {...this.props}
        providerInfo={currentProvider}
        onChangeProvider={provider => this.setState({currentProvider: provider})}
      />
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

