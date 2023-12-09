import moment from "moment";
import { Button } from "antd";
import { ContainerTwoTone, CloseSquareTwoTone } from "@ant-design/icons";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY");
}

export const columns = ({ mutation, cancelMutation, handlerReceiveFn }) => [
  {
    key: 1,
    title: "Paket mi?",
    dataIndex: "isPackage",
    render: (_, { isPackage }) => {
      return isPackage ? "Paket" : "Değil";
    },
  },
  {
    key: 2,
    title: "Ürün depoya döndü mi?",
    dataIndex: "isReturn",
    render: (_, { isReturn }) => {
      return isReturn ? "Döndü" : "Müşteride";
    },
  },
  {
    key: 3,
    title: "Ürünü Gönderme Tarihi",
    dataIndex: "arrivalDate",
    render: (_, { productDeliveryDate, packageDetails }) => {
      if (packageDetails) {
        return formatDate(packageDetails?.departureDate);
      }

      return formatDate(productDeliveryDate);
    },
  },
  {
    key: 4,
    title: "Geri Teslim Alma Tarihi",
    dataIndex: "departureDate",
    render: (_, { packageDetails, productReturnDate }) => {
      if (packageDetails) {
        return formatDate(packageDetails?.arrivalDate);
      }

      return formatDate(productReturnDate);
    },
  },
  {
    key: 5,
    title: "Ürünü Teslim Al",
    dataIndex: "departureDate",
    render: (_, { booking, isReturn }) => {
      return (
        <Button
          type="text"
          icon={isReturn ? <CloseSquareTwoTone /> : <ContainerTwoTone />}
          size={"middle"}
          onClick={async () => {
            const cancelMutationFn = () => cancelMutation(booking);
            const mutationFn = () => mutation(booking);

            await handlerReceiveFn(
              isReturn ? () => cancelMutationFn : () => mutationFn
            );
          }}
        />
      );
    },
  },
];
