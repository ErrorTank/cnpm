import React from "react";
import process from "process"
import {MoreInfoList} from "../../../../../common/more-info-list/more-info-list";
import {calcSalePrice, formatMoney} from "../../../../../../common/products-utils";

export class ProviderSection extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let {providerInfo, providers, onChange, discount} = this.props;

    let {name} = providerInfo.owner.provider;
    return (
      <div className="provider-section">
        <div className="provider-container">

          <div className="current-info">
            <div className="shop-name">
              <i className="fas fa-store-alt"></i>
              <span className="name">{name}</span>
              <p className="shop-sub">Cam kết chính hiệu 100%</p>
            </div>
            <a href={`/shop/${providerInfo.owner._id}`}  target="_blank" ><button className="btn btn-block to-shop" >Xem shop</button></a>
          </div>
          <div className="provider-list">
            <p className="pl-title">NHÀ CUNG CẤP KHÁC</p>
            <MoreInfoList
              className="pl-list"
              threshold={2}
              list={providers}
              renderToggle={show => (
                <p className="pl-list-toggle">{show ? `Thu gọn` : `Xem thêm ${providers.length - 2} lựa chọn`}</p>
              )}
              renderItem={(prov) => (
                <div className="pl-list-item">
                  <p className="provider-name">{prov.owner.provider.name}</p>
                  <p className="p-price">{formatMoney(calcSalePrice(Number(prov.options[0].price), Number(discount)))}</p>
                  <button className="btn swap-provider" onClick={() => onChange(prov)}>Xem</button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}