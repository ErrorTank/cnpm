import React, {Fragment} from "react";
import {StarRating} from "../../../../../../common/star-rating/star-rating";
import {KComponent} from "../../../../../../common/k-component";
import {createSimpleForm} from "../../../../../../common/form-validator/form-validator";
import {InputBase} from "../../../../../../common/base-input/base-input";
import * as yup from "yup";
import {UploadBtn} from "../../../../../../common/upload-btn/upload-btn";
import {UploadImagesDisplay} from "../../../../../../common/upload-btn/upload-images-display/upload-images-display";
import {LoadingInline} from "../../../../../../common/loading-inline/loading-inline";
import {productApi} from "../../../../../../../api/common/product-api";
import {userInfo} from "../../../../../../../common/states/common";

export class RatingPanel extends KComponent {
  constructor(props) {
    super(props);
    const schema = yup.object().shape({
      rating: yup.number().min(1, "Vui lòng chọn đánh giá của bạn về sản phẩm này."),
      title: yup.string().max(100, "Tiêu đề không được quá 100 kí tự."),
      content: yup.string().min(20, "Nội dung chứa ít nhất 20 ký tự").max(100, "Nội dung không được quá 500 kí tự."),
      picture: yup.array()
    });
    this.state = {
      uploadErr: null,
      commenting: false
    };
    this.initData = {
      rating: 0,
      title: "",
      content: "",
      picture: []
    };
    this.form = createSimpleForm(schema, {
      initData: {
       ...this.initData
      }
    });
    this.onUnmount(this.form.on("change", () => {
      this.forceUpdate()
    }));
    this.form.validateData();
  };

  handleComment = () => {
    this.setState({commenting: true});
    let data = this.form.getData();
    let files = data.picture.map(each => each.file);
    console.log(files);
    productApi.createComment(this.props.productID, {...data, picture: files, author: userInfo.getState()._id}).then(({comment}) => {
      this.setState({commenting: false});
      this.form.resetData();
      this.props.onCreate(comment);
    });
  };

  render() {
    let canPost = this.form.getInvalidPaths().length === 0;

    return (
      <div className="rating-panel">
        <div className="cmt-form m-form m-form--state">
          <p className="rp-title">GỬI NHẬN XÉT CỦA BẠN</p>
          <div className=" rp-form-gr">
            <span className="label">1. Đánh giá của bạn về sản phẩm này:</span>
            {this.form.enhanceComponent("rating", ({onChange, value, error}) => (
              <Fragment>
                <StarRating
                  className={"star-rating"}
                  editable
                  rating={value}
                  onChange={onChange}
                />
                <p className="suggest">*Đánh giá là bắt buộc.</p>

              </Fragment>


            ), true)}

          </div>
          <div className="add-title rp-form-gr">
            <span className="label">2. Tiêu đề của nhận xét:</span>
            {this.form.enhanceComponent("title", ({error, onChange, onEnter, ...others}) => (
              <InputBase
                className="rp-input pt-0"
                error={error}
                id={"title"}
                type={"text"}
                placeholder={"Nhập tiêu đề nhận xét (không bắt buộc)"}
                onChange={e => {
                  onChange(e);
                }}
                {...others}
              />
            ), true)}
          </div>
          <div className="add-content rp-form-gr">
            <span className="label">3. Viết nhận xét của bạn vào bên dưới:</span>
            {this.form.enhanceComponent("content", ({error, onChange, onEnter, ...others}) => (
              <InputBase
                className="rp-input pt-0"
                error={error}
                id={"content"}
                type={"text"}
                inputType={"textarea"}
                placeholder={"Nhận xét của bạn về sản phẩm này"}
                onChange={e => {
                  onChange(e);
                }}
                {...others}
              />
            ), true)}
          </div>
          <div className="add-picture">
            <span>Thêm hình sản phẩm nếu có (tối đa 5 hình):</span>
            {this.form.enhanceComponent("picture", ({error, onChange, value, ...others}) => (
              <Fragment>
                <UploadBtn
                  onError={(err) => this.setState({uploadErr: err})}
                  limit={5}
                  onChange={files => {
                    onChange(files);
                  }}
                  value={value}
                  renderBtn={({onClick}) => (
                    <button className="btn upload-img-cmt" onClick={onClick}>Chọn hình</button>
                  )}
                />
                {this.state.uploadErr && (
                  <p className="err-text">{this.state.uploadErr}</p>
                )}
                <UploadImagesDisplay
                  images={value}
                  onRemove={data => {
                    this.setState({uploadErr: null});
                    onChange(data);
                  }}

                />
              </Fragment>

            ), true)}


          </div>
          <div className="mt-5 text-right">
            <button className="btn yellow-btn create-cmt" disabled={!canPost} onClick={this.handleComment}>
              Gửi nhận xét
              {this.state.commenting && (
                <LoadingInline/>
              )}
            </button>
          </div>
        </div>

      </div>
    );
  }
}