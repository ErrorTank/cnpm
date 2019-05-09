import React from "react";
import {ZoomImage} from "../../zoom-image/zoom-image";

export class ImageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {current} = this.props;
    return (
      <div className="image-display">
        <ZoomImage
          className={"product-route-zoom"}
          src={current}
        />
        <p className="id-suggest"><i className="fas fa-search-plus"></i> Rê chuột lên hình để phóng to</p>
      </div>
    );
  }
}