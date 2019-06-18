const cartErrors = {
  "voucherError": {
    render: ({code}) =>  `Mã giảm giá "${code}" không hợp lệ (chương trình khuyến mãi không tồn tại)`
  },
  "outStock": {
    render: ({name, option}) => `Sản phẩm ${name} - ${option} đã hết hàng`
  },
  "qtyExceed": {
    render: ({name, option, stock, current}) => `Sản phẩm ${name} - ${option} chỉ còn ${stock} sản phẩm. Số lượng đang chọn: ${current} sản phẩm`
  }
};

export {cartErrors}