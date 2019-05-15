import React, {Fragment} from "react";
import {StaticProductList} from "../../index-route/static-product-list/static-product-list";
import {customHistory} from "../../../routes";
import toPairs from "lodash/toPairs"

export class ProductDetailFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {describeFields} = this.props;
    return (
      <div className="product-detail-fields">
        <p className="section-header">THÔNG TIN CHI TIẾT</p>
        <div className="section-body">
          <table>
            <tbody>
            {toPairs(describeFields).map((each, i) => {
              return (
                <tr
                  key={i}

                >
                  <td className="describe-key">{each[0]}</td>
                  <td className="describe-val">{each[1]}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}