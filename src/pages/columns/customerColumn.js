import { Button, Tag } from "antd";
import { ContactsTwoTone, FireTwoTone } from "@ant-design/icons";

export const columns = (
  navigate,
  showCalendarDrawer,
  isExistPaymentCostumer
) => [
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
