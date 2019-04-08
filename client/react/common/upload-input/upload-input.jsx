import React, {Fragment} from "react";
import classnames from "classnames"
import {getBase64} from "../../../common/common-utils";

export class UploadInput extends React.Component {
  constructor(props) {
    super(props);

  };

  handleRemove = key => {
    const {value: imagesPreview, onChange} = this.props;
    onChange(imagesPreview.filter(each => each.fileID !== key));
  };

  handleUpload = e => {
    e.preventDefault();
    let {value: imagesPreview, onChange, onError, limit = 2} = this.props;
    const files = e.target.files;

    if(files.length + imagesPreview.length > limit){
      onError("Số lượng file không được vượt quá " + limit);
      return ;
    }
    let promise=[];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log(file)
      if (file && file.type.indexOf("image") > -1) {
        promise.push(getBase64(files[i]));
      }

    }
    Promise.all(promise).then((data)=>{
      onChange(imagesPreview.concat(data));
    });

  };

  componentDidUpdate({value: imagePreview}) {
    if (!imagePreview.length && this.inputElem) {
      this.inputElem.value = "";
    }
  }

  render() {
    let {className, label, content, limit = 2, value: imagesPreview, error} = this.props;
    console.log(imagesPreview)
    return (
      <div className={classnames("upload-input form-group m-form__group", className)}>
        <label className="col-form-label">
          {label}
        </label>
        <div className="file-upload-wrap">
          <div className="m-dropzone dropzone m-dropzone--primary dz-clickable"  onClick={() => this.inputElem.click()}>
            <input
              className="upload-input-tag"
              type="file"
              onChange={this.handleUpload}
              accept="image/*"
              style={{display: "none"}}
              ref={elem => this.inputElem = elem}
              multiple={true}
              name="uploadImg"
            />
            <div className="m-dropzone__msg dz-message needsclick">
              {(!imagesPreview || !imagesPreview.length) && (
                <Fragment>
                  <h3 className="m-dropzone__msg-title">{content}</h3>
                  <span className="m-dropzone__msg-desc">Files tối đa {limit}</span>
                </Fragment>
              )

              }

            </div>
            {imagesPreview.map((each) => {
              return (
                <div className="dz-preview  dz-image-preview" key={each.fileID}>
                  <div className="dz-image">
                    <img src={each.src}/>
                  </div>
                  <a className="dz-remove" onClick={(e) => {
                    e.stopPropagation();
                    this.handleRemove(each.fileID)
                  }}>Loại bỏ</a>

                </div>
              )
            })}

          </div>
          {(error) && (
            <div className="form-control-feedback">{error.message}</div>
          )}
        </div>
      </div>

    );
  }
}
