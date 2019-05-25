import React from "react";

export class UploadImagesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {images, onRemove} = this.props;
    return (
      <div className="upload-img-display">
        {images.map(each => (
          <div className="upload-img-block" key={each.file.name}>
            <img src={each.src}/>
            <i className="fas fa-times-circle rm-img"
               onClick={() => onRemove(images.filter(img => img.file.name !== each.file.name))}
            />
          </div>
        ))}
      </div>
    );
  }
}