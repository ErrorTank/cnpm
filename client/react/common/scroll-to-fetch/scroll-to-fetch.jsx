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
    this.fetching();
  }

  fetching = () => {

    let elem = ReactDOM.findDOMNode(this);
    let elemPos = elem.getBoundingClientRect().top + document.documentElement.scrollTop;
    let windowClientHeight = window.pageYOffset + window.innerHeight;
    // console.log(window.pageYOffset)
    // console.log(elem.offsetTop);
    // console.log(windowClientHeight)
    // console.log(elemPos);
    if(this.cancelFetching && windowClientHeight > elemPos){
      this.cancelFetching();
      this.cancelFetching = null;
      this.props.api();
    }
  };



  initialFetching = () => {
    let fetchFunc = (e) => {
      this.fetching();
    };
    window.addEventListener("scroll", fetchFunc);
    return () => window.removeEventListener("scroll", fetchFunc);

  };

  render() {
    return React.Children.only(this.props.children)
  }
}