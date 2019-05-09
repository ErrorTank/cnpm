import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames"

export class ZoomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      posX: 200,
      posY: 150
    };
  };

  zoomIn = (e) => {
    // let overlayElem = ReactDOM.findDOMNode(this.imgOverlay);
    // overlayElem.style.display = 'inline-block';
    if(this.state.show === false)
      this.setState({show: true});
    let imgElem = ReactDOM.findDOMNode(this.zoomingImg);
    let posX = e.offsetX ? (e.offsetX) : e.pageX - imgElem.offsetLeft;
    let posY = e.offsetY ? (e.offsetY) : e.pageY - imgElem.offsetTop;
    this.setState({posX, posY});
  };

  zoomOut = (e) => {
    // let overlayElem = ReactDOM.findDOMNode(this.imgOverlay);
    // overlayElem.style.display = 'none';
    this.setState({show: false});
  };

  render() {
    let {className, src} = this.props;
    let {show, posX, posY} = this.state;
    console.log((-posX * 2) + "px" + (-posY * 2) + "px")
    return (
      <div className={classnames("zoom-image-container", className)}>
        <div className="img-container">
          <img src={src}
               onMouseMove={this.zoomIn}
               onMouseOut={this.zoomOut}
               ref={img => this.zoomingImg = img}
          />
          {/*<div className="">*/}
          {/**/}
          {/*</div>*/}
        </div>
        <div className="img-zooming-overlay"
          // ref={overlay => this.imgOverlay = overlay}
             style={{
               display: show ? "inline-block" : "none",
               backgroundImage: `url(${src})`,
               backgroundPosition: (-posX * 2) + "px " + (-posY * 2) + "px"
             }}
        >

        </div>

      </div>
    );
  }
}``