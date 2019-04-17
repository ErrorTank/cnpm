import * as yup from "yup";

export const userRegisterSchema = {
  "regular": {
    schema: yup.object().shape({
      fullname: yup.string().min(6, "Họ và tên phải lớn hơn 6 kí tự").max(50, "Họ và tên phải nhỏ hơn 50 kí tự").onlyWord("Họ và tên không được có kí tự đặc biệt").notHaveNumber("Họ và tên không được có chữ số").required("Họ tên không được để trống"),
      phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
      password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").noSpecialChar("Mật khẩu không được có kí tự đặc biệt").required("Mật khẩu không được để trống"),
      email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
      gender: yup.boolean().required(),
      dob: yup.object().shape({
        day: yup.number().moreThan(0,"Ngày không được để trống"),
        month: yup.number().moreThan(0,"Tháng không được để trống"),
        year: yup.number().moreThan(0, "Năm không được để trống")
      }),
      subscribe: yup.boolean().required(),
      role: yup.number().required(),
    }),
    defaultData: () => ({
      fullname: "",
      role: 0,
      password: "",
      phone: "",
      email: "",
      gender: false,
      dob: {
        day: 0,
        month: 0,
        year: 0
      },
      subscribe: true,
    })
  },
  "social": {
    schema: yup.object().shape({
      fullname: yup.string().min(6, "Họ và tên phải lớn hơn 6 kí tự").max(50, "Họ và tên phải nhỏ hơn 50 kí tự").onlyWord("Họ và tên không được có kí tự đặc biệt").notHaveNumber("Họ và tên không được có chữ số").required("Họ tên không được để trống"),
      phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
      email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
      gender: yup.boolean().required(),
      dob: yup.object().shape({
        day: yup.number().moreThan(0,"Ngày không được để trống"),
        month: yup.number().moreThan(0,"Tháng không được để trống"),
        year: yup.number().moreThan(0, "Năm không được để trống")
      }),
      subscribe: yup.boolean().required(),
      role: yup.number().required(),
      picture: yup.string(),
      social: yup.object()
    }),
    defaultData: (data) => ({
      fullname: "",
      role: 0,
      phone: "",
      email: "",
      gender: false,
      dob: {
        day: 0,
        month: 0,
        year: 0
      },
      subscribe: true,
      ...data
    })
  }
};