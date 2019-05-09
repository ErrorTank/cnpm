import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames"

export class ZoomImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      left: 0,
      top: 0
    };
  };

  zoomIn = (e) => {
    if(this.state.show === false)
      this.setState({show: true});
    let imgElem = ReactDOM.findDOMNode(this.zoomingImg);

    let posX = e.offsetX ? (e.offsetX) : e.pageX - (imgElem.getBoundingClientRect().top + document.documentElement.scrollTop);
    let posY = e.offsetY ? (e.offsetY) : e.pageY - imgElem.getBoundingClientRect().left;
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
    this.setState({...result});
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
               style={{
                 display: "inline-block",
                 backgroundImage: `url(${src})`,
                 backgroundPosition: (-left * 3) + "px " + (-top * 3) + "px"
               }}
          >

          </div>
        )

        }


      </div>
    );
  }
}