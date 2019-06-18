import React from "react";

export class VoucherInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  };

  render() {
    let {onChange, } = this.props;
    return (
      <div className="input-contain">
        <input type="text"
               placeholder="Nhập voucher..."
               value={this.state.value}
               onKeyDown={e => {
                 if(e.keyCode === 13){
                   this.setState({value: ""})
                   this.state.value.trim() && onChange(this.state.value.trim())
                 }
               }}
               onChange={e => this.setState({value: e.target.value})}
        />
        <button className="submit-btn"
                onClick={() => {
                  this.setState({value: ""})
                  this.state.value.trim() && onChange(this.state.value.trim())
                }}

        >
          Đồng ý
        </button>
      </div>
    );
  }
}