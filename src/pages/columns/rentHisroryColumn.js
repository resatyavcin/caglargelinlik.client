import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY");
}

export const columns = [
  {
    key: 1,
    title: "Paket",
    dataIndex: "isPackage",
    render: (_, { isPackage }) => {
      return isPackage ? "Paket" : "Değil";
    },
  },
  {
    key: 1,
    title: "Dönüş",
    dataIndex: "isReturn",
    render: (_, { isReturn }) => {
      return isReturn ? "Döndü" : "Müşteride";
    },
  },
  {
    key: 2,
    title: "Ürünü Gönderme",
    dataIndex: "arrivalDate",
    render: (_, { productDeliveryDate, packageDetails }) => {
      if (packageDetails) {
        return formatDate(packageDetails?.departureDate);
      }

      return formatDate(productDeliveryDate);
    },
  },
  {
    key: 3,
    title: "Geri Teslim Alma",
    dataIndex: "departureDate",
    render: (_, { packageDetails, productReturnDate }) => {
      if (packageDetails) {
        return formatDate(packageDetails?.arrivalDate);
      }

      return formatDate(productReturnDate);
    },
  },
];
