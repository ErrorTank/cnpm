import React from "react";
import ReactDOM from "react-dom"
import {KComponent} from "../k-component";

export class ScrollToFetch extends KComponent {
  constructor(props) {
    super(props);
    this.cancelFetching = null;
    this.onUnmount(() => {
      if(this.cancelFetching) {
        this.cancelFetching();
        this.cancelFetching = null;
      }
    });

  };

  componentDidMount() {
    this.cancelFetching = this.initialFetching();

  }



  initialFetching = () => {
    let fetchFunc = (e) => {
      let elem = ReactDOM.findDOMNode(this);
      let elemPos = elem.getBoundingClientRect().top + document.documentElement.scrollTop;
      let windowClientHeight = window.pageYOffset + window.innerHeight;
      if(this.cancelFetching && windowClientHeight > elemPos){
        console.log("cascas");
        this.cancelFetching();
        this.cancelFetching = null;
        this.props.api();
      }
    };
    window.addEventListener("scroll", fetchFunc);
    return () => window.removeEventListener("scroll", fetchFunc);

  };

  render() {
    return React.Children.only(this.props.children)
  }
}