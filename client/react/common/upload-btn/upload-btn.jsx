import React, { Fragment } from "react";
import { getBase64 } from "../../../common/common-utils";

export class UploadBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpload = e => {
    e.preventDefault();
    let { value: imagesPreview, onChange, onError, limit = 2 } = this.props;
    const files = [...e.target.files];
    e.target.value = "";

    if (files.length + imagesPreview.length > limit) {
      onError("Số lượng file không được vượt quá " + limit);
      return;
    }
    let promise = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (file && file.type.indexOf("image") > -1) {
        promise.push(
          getBase64(file).then(base64File => {
            if (
              !imagesPreview.find(
                each => each.file.name === base64File.file.name
              )
            )
              return base64File;
            else {
              onError(
                <span>
                  Bỏ qua file{" "}
                  <span style={{ color: "#189eff" }}>
                    {base64File.file.name}
                  </span>{" "}
                  do đã tồn tại.
                </span>
              );
              return null;
            }
          })
        );
      }
    }
    Promise.all(promise).then(data => {
      onChange(imagesPreview.concat(data.filter(each => each !== null)));
    });
  };

  render() {
    let { renderBtn, onError } = this.props;

    return (
      <Fragment>
        {renderBtn({
          onClick: () => {
            this.inputElem.click();
            onError(null);
          }
        })}
        <input
          className="upload-input"
          type="file"
          onChange={this.handleUpload}
          accept="image/*"
          style={{ width: 0, height: 0 }}
          ref={elem => (this.inputElem = elem)}
          multiple={true}
          name="uploadImg"
        />
      </Fragment>
    );
  }
}
