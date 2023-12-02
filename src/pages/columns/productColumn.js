import { Button, Tag, Checkbox, Typography } from "antd";
import { CalendarTwoTone } from "@ant-design/icons";

export const columns = (showCalendarDrawer) => [
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
    title: "Ürün Aktifliği",
    dataIndex: "isActive",
    filters: [
      {
        text: "Aktif",
        value: true,
      },
      {
        text: "Aktif Değil",
        value: false,
      },
    ],

    onFilter: (value, record) => record.isActive === value,
    render: (_, { isActive, isSold }) => (
      <>
        {!isSold ? (
          <Checkbox disabled defaultChecked={isActive}>
            <Typography.Text strong type={!isActive ? "warning" : "secondary"}>
              {!isActive ? "Kiralandı" : "Depoda"}{" "}
            </Typography.Text>
          </Checkbox>
        ) : (
          <Typography.Text strong type="danger">
            Satıldı
          </Typography.Text>
        )}
      </>
    ),
  },
  {
    key: 4,
    title: "Ürün Müsaitliği",
    dataIndex: "calendar",
    render: (_, { isSold }) => (
      <>
        {!isSold && (
          <Button
            type="text"
            icon={<CalendarTwoTone />}
            size={"middle"}
            onClick={showCalendarDrawer}
          />
        )}
      </>
    ),
  },
];
