import * as yup from "yup";

export const userUpdateSchema = {
  schema: yup.object().shape({
    fullname: yup
      .string()
      .min(6, "Họ và tên phải lớn hơn 6 kí tự")
      .max(50, "Họ và tên phải nhỏ hơn 50 kí tự")
      .onlyWord("Họ và tên không được có kí tự đặc biệt")
      .notHaveNumber("Họ và tên không được có chữ số")
      .required("Họ tên không được để trống"),
    phone: yup
      .string()
      .required("SĐT không được để trống")
      .min(9, "SĐT phải lớn hơn 9 kí tự")
      .max(11, "SĐT phải nhỏ hơn 12 kí tự")
      .isPhone("SĐT không hợp lệ"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    gender: yup.boolean().required(),
    dob: yup.object().shape({
      day: yup.number().moreThan(0, "Ngày không được để trống"),
      month: yup.number().moreThan(0, "Tháng không được để trống"),
      year: yup.number().moreThan(0, "Năm không được để trống")
    }),
    picture: yup.string()
  })
};
