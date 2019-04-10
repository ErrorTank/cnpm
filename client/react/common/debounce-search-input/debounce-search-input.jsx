import React from "react";
import debounce from "lodash/debounce"

export class DebounceSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  };

  handleChange = debounce(() => {
    this.props.onSearch(this.state.value);
  }, this.props.timeout);

  render() {
    let {renderInput} = this.props;
    return renderInput({
      onChange: (e) => {
        this.setState({value: e.target.value});
        this.handleChange();
      },
      value: this.state.value
    })
  }
}