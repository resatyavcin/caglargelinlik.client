import { Button, Tag, Typography } from "antd";
import { CalendarTwoTone } from "@ant-design/icons";

export const columns = (navigate, showCalendarDrawer) => [
  {
    key: 1,
    title: "Ürün Adı",
    dataIndex: "name",
  },
  {
    key: 2,
    title: "Ürün Kullanımı",
    dataIndex: "isSecondHand",
    render: (_, { isSecondHand }) => (
      <>
        <Tag color={isSecondHand ? "orange" : "green"}>
          {isSecondHand ? "İkinci El" : "Sıfır"}
        </Tag>
      </>
    ),
  },
  {
    key: 3,
    title: "Ürün Elverişliliği",
    dataIndex: "isActive",
    render: (_, { isSold }) => {
      return (
        <>
          <Typography.Text type={!isSold ? "success" : "danger"}>
            {!isSold ? "Kiralanabilir" : "Depoda"}
          </Typography.Text>
        </>
      );
    },
  },
  {
    key: 4,
    title: "Detay",
    dataIndex: "calendar",
    render: (_, { isSold, _id }) => (
      <>
        {!isSold && (
          <Button
            type="text"
            icon={<CalendarTwoTone />}
            size={"middle"}
            onClick={() => {
              showCalendarDrawer();
              navigate(_, { state: _id });
            }}
          />
        )}
      </>
    ),
  },
];
