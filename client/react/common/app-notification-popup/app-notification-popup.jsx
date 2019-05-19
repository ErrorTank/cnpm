import React from "react";
import debounce from "lodash/debounce"


export class AppNotificationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    };
    props.setSubcriber((content) => {
      console.log(content)
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
      console.log(listeners)

      listeners.forEach(({func, key}) => {
        console.log(key)
        Object.keys(keyMap)
        if(Object.keys(keyMap).includes(key)){
          func(keyMap[key]);
        }
      })
    },
    installPopup: (key, renderLayout) => {

      return (
        <AppNotificationPopup
          setSubcriber={(func) => {
            let index = listeners.findIndex(each => each.key === key);
            if(index !== -1){
              listeners.splice(index, 1);
            }
            listeners.push({func, key});
          }}
          renderLayout={renderLayout}
          timeout={timeout}
        />
      )
    }
  };
};

