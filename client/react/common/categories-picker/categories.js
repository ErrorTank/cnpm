import React from "react";
import { customHistory } from "../../routes/routes";

export const categories = [
  {
    icon: <i className="fas fa-mobile-alt"></i>,
    label: "Điện thoại - Máy tính bảng",
    onClick: () => customHistory.push("/products?type=category&category=5cc185031db2bb2860dde2cd"),

    subCategories: [
      {
        label: "Smartphone Chính Hãng",
        onClick: () => customHistory.push("/products?type=category&category=5cc196d3a0826d25a01882cd"),

        subCategories: [
          {
            label: "Smartphone Samsung",
            onClick: () => customHistory.push("/products?type=category&category=5cc185a31d4db822d4b0bdf0"),

          }, {
            label: "Smartphone Apple",
            onClick: () => customHistory.push("/products?type=category&category=5cc185b01d4db822d4b0bdf1"),

          }, {
            label: "Smartphone Oppo",
            onClick: () => {
              console.log("5cd648ae747b60029c4cdc9c")
              customHistory.push("/products?type=category&category=5cd648ae747b60029c4cdc9c")
            },

          }, {
            label: "Smartphone Huawei",
            onClick: () => customHistory.push("/products?type=category&category=5cd648b9747b60029c4cdc9d"),

          }, {
            label: "Smartphone Nokia",
            onClick: () => customHistory.push("/products?type=category&category=5cd648d5747b60029c4cdc9e"),

          }, {
            label: "Smartphone Xiaomi",
            onClick: () => customHistory.push("/products?type=category&category=5cd648de747b60029c4cdc9f"),

          }
        ]
      }, {
        label: "Máy tính bảng",
        onClick: () => customHistory.push("/products?type=category&category=5cd6493e747b60029c4cdca0"),

        subCategories: [
          {
            label: "Máy tính bảng Apple",
            onClick: () => customHistory.push("/products?type=category&category=5cdd2b81b2436a21988d5f15"),

          }, {
            label: "Máy tính bảng Samsung",
            onClick: () => customHistory.push("/products?type=category&category=5cdd2ba308340c2198d5fd14"),

          }
        ]
      },
    ]
  }, {
    icon: <i className="fas fa-tv"></i>,
    label: "Điện tử - Điện lạnh",
    onClick: () => customHistory.push("/products?type=category&category=5cc185cb1d4db822d4b0bdf2"),

    subCategories: [
      {
        label: "Tivi",
        onClick: () => customHistory.push("/products?type=category&category=5cc185f91d4db822d4b0bdf3"),

        subCategories: [
          {
            label: "Smart TV - Android TV",
            onClick: () => customHistory.push("/products?type=category&category=5cd63e45747b60029c4cdc9b"),

          }, {
            label: "Internet TV",
            onClick: () => customHistory.push("/products?type=category&category=5cdd2d3608340c2198d5fd15"),

          }, {
            label: "Tivi 4k",
            onClick: () => customHistory.push("/products?type=category&category=5cdd2d4808340c2198d5fd16"),

          }, {
            label: "Tivi FullHD",
            onClick: () => customHistory.push("/products?type=category&category=5d047a1a83689221a07489b0"),

          }
        ]
      }, {
        label: "Máy điều hòa",
        onClick: () => customHistory.push("/products?type=category&category=5cc1860e1d4db822d4b0bdf4"),

        subCategories: [
          {
            label: "Máy lạnh inventer",
            onClick: () => customHistory.push("/products?type=category&category=5cc186b21d4db822d4b0bdf8"),

          }, {
            label: "Máy lạnh bán chạy",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),   // considering

          }
        ]
      }, {
        label: "Máy giặt",
        onClick: () => customHistory.push("/products?type=category&category=5cc1861d1d4db822d4b0bdf5"),

        subCategories: [
          {
            label: "Máy giặt inventer",
            onClick: () => customHistory.push("/products?type=category&category=5cc186d21d4db822d4b0bdf9"),

          }, {
            label: "Máy giặt bán chạy",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"), // considering

          }
        ]
      }, {
        label: "Chính hãng thương hiệu",
        onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),    //

        subCategories: [
          {
            label: "LG",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),   //

          }, {
            label: "Sony",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),   //

          }, {
            label: "Panasonic",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),   //

          }, {
            label: "Samsung",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),   //

          }, {
            label: "Electrolux",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),   //

          }
        ]
      }
    ]
  }, {
    icon: <i className="fas fa-headphones-alt"></i>,
    label: "Phụ kiện - Thiết bị số",
    onClick: () => customHistory.push("/products?type=category&category=5cc187011d4db822d4b0bdfb"),

    subCategories: [
      {
        label: "Tai nghe",
        onClick: () => customHistory.push("/products?type=category&category=5cc187181d4db822d4b0bdfc"),

        subCategories: [
          {
            label: "Tai nghe nhét tai",
            onClick: () => customHistory.push("/products?type=category&category=5cc1873b1d4db822d4b0bdfd"),

          }, {
            label: "Tai nghe chùm tai",
            onClick: () => customHistory.push("/products?type=category&category=5cdd33ae08340c2198d5fd17"),

          }, {
            label: "Tai nghe Bluetooth",
            onClick: () => customHistory.push("/products?type=category&category=5cdd33c108340c2198d5fd18"),

          }, {
            label: "Tai nghe Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5ce270e69ecbfd1934c11564"), // add in, appear in db

          }
        ]
      }, {
        label: "Thiết bị loa",
        onClick: () => customHistory.push("/products?type=category&category=5cc1874e1d4db822d4b0bdfe"),

        subCategories: [
          {
            label: "Loa vi tính",
            onClick: () => customHistory.push("/products?type=category&category=5cc187611d4db822d4b0bdff"),

          }, {
            label: "Loa Bluetooth",
            onClick: () => customHistory.push("/products?type=category&category=5cdd341308340c2198d5fd19"),

          }
        ]
      }, {
        label: "Thiết bị đeo thông minh",
        onClick: () => customHistory.push("/products?type=category&category=5cc187721d4db822d4b0be00"),

        subCategories: [
          {
            label: "Đồng hồ thông minh",
            onClick: () => customHistory.push("/products?type=category&category=5cc1877c1d4db822d4b0be01"),

          }, {
            label: "Kính thực tế ảo",
            onClick: () => customHistory.push("/products?type=category&category=5cdd342b08340c2198d5fd1a"),

          }
        ]
      }, {
        label: "Phụ kiện điện thoại",
        onClick: () => customHistory.push("/products?type=category&category=5cc187ac1d4db822d4b0be02"),

        subCategories: [
          {
            label: "Pin sạc dự phòng",
            onClick: () => customHistory.push("/products?type=category&category=5cc187e51d4db822d4b0be03"),

          }, {
            label: "Dây cáp sạc",
            onClick: () => customHistory.push("/products?type=category&category=5ce2703c9ecbfd1934c11560"),

          }, {
            label: "Adapter - Củ sạc",
            onClick: () => customHistory.push("/products?type=category&category=5ce270529ecbfd1934c11561"),

          }, {
            label: "Ốp điện thoại",
            onClick: () => customHistory.push("/products?type=category&category=5ce2706b9ecbfd1934c11562"),

          }
        ]
      }, {
        label: "Thiết bị game",
        onClick: () => customHistory.push("/products?type=category&category=5cc188141d4db822d4b0be04"),

        subCategories: [
          {
            label: "Chuột Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5cd64bbc747b60029c4cdca1"),

          }, {
            label: "Bàn phím Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5ce270db9ecbfd1934c11563"),

          }, {
            label: "Tai nghe Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5ce270e69ecbfd1934c11564"),

          }, {
            label: "Lót chuột Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5ce270f69ecbfd1934c11565"),

          }, {
            label: "Màn hình Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5ce271059ecbfd1934c11566"),

          }, {
            label: "Ghế Gaming",
            onClick: () => customHistory.push("/products?type=category&category=5ce2710c9ecbfd1934c11567"),

          }, {
            label: "Tay cầm",
            onClick: () => customHistory.push("/products?type=category&category=5ce271199ecbfd1934c11568"),

          }, {
            label: "Console - Máy chơi game",
            onClick: () => customHistory.push("/products?type=category&category=5ce271289ecbfd1934c11569"),

          }
        ]
      }, {
        label: "Thương hiệu nổi bật",
        onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),        //

        subCategories: [
          {
            label: "Sennheiser",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),        //

          }, {
            label: "Kingston",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),        //

          }, {
            label: "Logitech",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),        //

          }, {
            label: "Corsair",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),        //

          }, {
            label: "BenQ",
            onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),        //

          }
        ]
      }
    ]
  }, {
    icon: <i className="fas fa-laptop"></i>,
    label: "Laptop - Thiết bị IT",
    onClick: () => customHistory.push("/products?type=category&category=5cc188731d4db822d4b0be08"),

    subCategories: [
      {
        label: "Laptop",
        onClick: () => customHistory.push("/products?type=category&category=5cc1888a1d4db822d4b0be09"),

        subCategories: [
          {
            label: "Macbook",
            onClick: () => customHistory.push("/products?type=category&category=5ce2716e9ecbfd1934c1156a"),         //don't have anything yet

          }, {
            label: "Dell",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8439fe9e9b1c58bc7d6b"),         //don't have anything yet

          }, {
            label: "Asus",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8454fe9e9b1c58bc7d6c"),         //don't have anything yet

          }, {
            label: "Acer",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8472fe9e9b1c58bc7d6d"),         //don't have anything yet

          }, {
            label: "HP",
            onClick: () => customHistory.push("/products?type=category&category=5d0f848bfe9e9b1c58bc7d6e"),         //don't have anything yet

          }, {
            label: "Lenovo",
            onClick: () => customHistory.push("/products?type=category&category=5d0f84a6fe9e9b1c58bc7d6f"),         //don't have anything yet

          }, {
            label: "MSI",
            onClick: () => customHistory.push("/products?type=category&category=5cd63d98747b60029c4cdc9a"),

          }
        ]
      }, {
        label: "Linh kiện máy tính",
        onClick: () => customHistory.push("/products?type=category&category=5cc188971d4db822d4b0be0a"),

        subCategories: [
          {
            label: "Bo mạch chủ",
            onClick: () => customHistory.push("/products?type=category&category=5d089f7a01f2d81f505dcaef"),        //

          }, {
            label: "Vi xử lý",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8530fe9e9b1c58bc7d70"),       //

          }, {
            label: "Tản nhiệt",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8543fe9e9b1c58bc7d71"),       //

          }, {
            label: "RAM",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8562fe9e9b1c58bc7d72"),       //

          }, {
            label: "Nguồn máy tính",
            onClick: () => customHistory.push("/products?type=category&category=5d0f857afe9e9b1c58bc7d73"),       //

          }, {
            label: "Ổ cứng",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8593fe9e9b1c58bc7d74"),       //

          }, {
            label: "Card đồ họa",
            onClick: () => customHistory.push("/products?type=category&category=5d08a34d01f2d81f505dcaf1"),       //

          }
        ]
      },
    ]
  }, {
    icon: <i className="fas fa-camera"></i>,
    label: "Máy ảnh - Quay Phim",
    onClick: () => customHistory.push("/products?type=category&category=5cc188c61d4db822d4b0be0b"),
    subCategories: [
      {
        label: "Thương hiệu",
        onClick: () => customHistory.push("/products?type=category&category=5cd6388e747b60029c4cdc96"),

        subCategories: [
          {
            label: "Canon",
            onClick: () => customHistory.push("/products?type=category&category=5cd638b2747b60029c4cdc97"),

          }, {
            label: "Sony",
            onClick: () => customHistory.push("/products?type=category&category=5d0f85fbfe9e9b1c58bc7d75"),  //

          }, {
            label: "Nikon",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8613fe9e9b1c58bc7d76"),  //

          }, {
            label: "GoPro",
            onClick: () => customHistory.push("/products?type=category&category=5ce7a629161eaf09e409fce2"),

          }
        ]
      }, {
        label: "Ống kính - Lens",
        onClick: () => customHistory.push("/products?type=category&category=5cc188e21d4db822d4b0be0d"),

        subCategories: [
          {
            label: "Lens Sony",
            onClick: () => customHistory.push("/products?type=category&category=5d0f864dfe9e9b1c58bc7d77"),   //

          }, {
            label: "Lens Canon",
            onClick: () => customHistory.push("/products?type=category&category=5d0f8677fe9e9b1c58bc7d78"),   //

          }
        ]
      }
    ]
  },
];