import React from "react";
import debounce from "lodash/debounce"

export class AppNotificationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    };
    props.setSubcriber((content) => {
      this.setState({content});
      this.hidePopup();

    });
  };

  hidePopup = debounce(() => {
    this.setState({content: null});
  }, this.props.timeout);


  render() {
    return this.state.content ?  this.props.renderLayout(this.state.content) : null;
  }
}

export const createNotificationPopup = ({timeout}) => {
  let listeners = [];
  return {
    publish: (keyMap) => {
      listeners.forEach(({func, itemKey}) => {
        if(Object.keys(keyMap).includes(itemKey)){
          func(keyMap[itemKey]);
        }
      })
    },
    installPopup: (key, renderLayout) => {
      return (
        <AppNotificationPopup
          setSubcriber={(func) => {
            listeners.push({func, key});
          }}
          renderLayout={renderLayout}
          timeout={timeout}
        />
      )
    }
  };
};

