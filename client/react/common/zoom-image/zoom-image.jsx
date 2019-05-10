import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames"

export class ZoomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      // left: 0,
      // top: 0
    };
  };


  zoomIn = (e) => {
    if(this.state.show === false)
      this.setState({show: true});
    else{
      let imgElem = ReactDOM.findDOMNode(this.zoomingImg);
      let zoomElem = ReactDOM.findDOMNode(this.zoomLen);
      let overlayElem = ReactDOM.findDOMNode(this.overlay);
      let posY = e.offsetY ? (e.offsetY) : e.pageY - (imgElem.getBoundingClientRect().top + document.documentElement.scrollTop);
      let posX = e.offsetX ? (e.offsetX) : e.pageX - imgElem.getBoundingClientRect().left;

      let result = {};
      if(posY <= 80.5){
        result.top = 0;
      }else if(imgElem.offsetHeight - posY <= 80.5){
        result.top = imgElem.offsetHeight - 160;
      }else{
        result.top = posY - 80;
      }
      if(posX <= 80.5){
        result.left = 0;
      }else if(imgElem.offsetWidth - posX <= 80.5){
        result.left = imgElem.offsetWidth - 160;
      }else{
        result.left = posX - 80;
      }

      zoomElem.style.left= result.left + "px";
      zoomElem.style.top= result.top + "px";
      overlayElem.style.backgroundPosition= (-result.left * 3) + "px " + (-result.top * 3) + "px";
    }

    // this.setState({...result});
  };




  zoomOut = (e) => {
    this.setState({show: false});
  };

  render() {
    let {className, src} = this.props;
    let {show, left, top} = this.state;
    return (
      <div className={classnames("zoom-image-container", className)}>
        <div className="img-container">

          <img src={src}
               onMouseMove={this.zoomIn}
               onMouseOut={this.zoomOut}
               ref={img => this.zoomingImg = img}
          />
          {show && (
            <div className="zoom-len"
                 ref={len => this.zoomLen = len}
                 style={{
                   left,
                   top
                 }}
            >

            </div>
          )

          }

        </div>
        {show && (
          <div className="img-zooming-overlay"
               ref={overlay => this.overlay = overlay}
               style={{
                 display: "inline-block",
                 backgroundImage: `url(${src})`,
                 // backgroundPosition: (-left * 3) + "px " + (-top * 3) + "px"
               }}
          >

          </div>
        )

        }


      </div>
    );
  }
}