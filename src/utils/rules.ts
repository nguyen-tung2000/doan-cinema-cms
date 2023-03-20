export const rules = {
  name: {
    required: {
      value: true,
      message: "Tên Film là bắt buộc nhập",
    },
    maxLength: {
      value: 160,
      message: "Tên Film có độ dài tối đa là 160 ký tự",
    },
  },
  time: {
    required: {
      value: true,
      message: "Thời lượng là bắt buộc nhập",
    },
    validate: {
      number: (value: any) => /^[0-9]*$/.test(value) || "Vui lòng nhập đúng định dạng là số",
    },
  },
  age: {
    required: {
      value: true,
      message: "Tuổi là bắt buộc nhập",
    },
    validate: {
      number: (value: any) => /^[0-9]*$/.test(value) || "Vui lòng nhập đúng định dạng là số",
    },
  },
  daodien: {
    required: {
      value: true,
      message: "Đạo diễn là bắt buộc nhập",
    },
    maxLength: {
      value: 160,
      message: "Đạo diễn có độ dài tối đa là 160 ký tự",
    },
  },
  theloai: {
    required: {
      value: true,
      message: "Thể loại là bắt buộc check",
    },
  },
  loaiman: {
    required: {
      value: true,
      message: "Loại màn là bắt buộc check",
    },
  },
  dienvien: {
    required: {
      value: true,
      message: "Diễn viên là bắt buộc nhập",
    },
    maxLength: {
      value: 160,
      message: "Diễn viên có độ dài tối đa là 160 ký tự",
    },
  },
  content: {
    required: {
      value: true,
      message: "Nội dung là bắt buộc nhập",
    },
  },
  image: {
    required: {
      value: true,
      message: "Image là bắt buộc nhập",
    },
  },
  trailer: {
    required: {
      value: true,
      message: "Trailer là bắt buộc nhập",
    },
  },
};
