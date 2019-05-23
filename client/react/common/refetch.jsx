import React from "react";

export class Refetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    let {render, cond, api, ...rest} = this.props;
    if(cond(rest, nextProps)){
      this.setState({loading: true});
      api().finally(() => this.setState({loading: false}));
    }
  }

  render() {
    let {render} = this.props;
    return render(this.state.loading)
  }
}