import { Button, Tag } from "antd";
import { ContactsTwoTone, FireTwoTone } from "@ant-design/icons";

export const columns = (navigate, showCalendarDrawer) => [
  {
    key: 1,
    title: "Adı",
    dataIndex: "fullName",
    render: (_, { firstName, lastName }) => {
      return firstName + " " + lastName;
    },
  },
  {
    key: 2,
    title: "Birincil Telefonu",
    dataIndex: "primaryPhone",
  },
  {
    key: 3,
    title: "İkincil Telefonu",
    dataIndex: "secondaryPhone",
  },
  {
    key: 4,
    title: "Adresi",
    dataIndex: "address",
  },
  {
    key: 4,
    title: "Ödeme Durumu",
    dataIndex: "paymentStatus",
    filters: [
      {
        text: "Ödeme Yapmayanlar",
        value: true,
      },
      {
        text: "Ödeme Tamamlayanlar",
        value: false,
      },
    ],
    onFilter: (value, record) =>
      (record?.paymentId?.filter((item) => item.remainingAmount !== 0)).length >
        0 ===
      value,
    render: (_, { paymentId }) => (
      <>
        {paymentId?.filter((item) => item.remainingAmount !== 0).length > 0 ? (
          <Tag color="red">Tamamlanmadı</Tag>
        ) : (
          <Tag color="green">Tamamlandı</Tag>
        )}
      </>
    ),
  },
  {
    key: 5,
    title: "Detay",
    dataIndex: "details",

    render: (_, { _id }) => (
      <>
        <Button
          type="text"
          icon={<ContactsTwoTone />}
          size={"middle"}
          onClick={() => {
            showCalendarDrawer();
            navigate(_, { state: _id });
          }}
        />

        <Button
          type="text"
          icon={<FireTwoTone />}
          size={"middle"}
          onClick={() => {
            navigate("/booking", { state: _id });
          }}
        />
      </>
    ),
  },
];
