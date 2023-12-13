import { Tag, Button } from "antd";
import { DollarTwoTone, DeleteTwoTone } from "@ant-design/icons";
import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY");
}

const EVENT_CODE = Object.freeze({
  WD: "Düğün",
  HN: "Kına",
  EG: "Nişan",
});

export const columns = ({
  openModal,
  handleSetBooking,
  isExistPay,
  deleteBookingMutateAsync,
}) => [
  {
    key: 1,
    title: "Tür",
    dataIndex: "rentOrSell",
    render: (_, { isSell, eventType }) => {
      return (
        <Tag color={isSell ? "orange" : "green"}>
          {isSell ? "Satılık" : "Kiralık"} / {EVENT_CODE[eventType]}
        </Tag>
      );
    },
  },
  {
    key: 2,
    title: "1. Prova",
    dataIndex: "primaryTrialDate",
    render: (_, { primaryTrialDate }) => {
      return formatDate(primaryTrialDate);
    },
  },
  {
    key: 3,
    title: "2. Prova",
    dataIndex: "secondaryTrialDate",
    render: (_, { secondaryTrialDate }) => {
      return formatDate(secondaryTrialDate);
    },
  },
  {
    key: 4,
    title: "Olay Günü",
    dataIndex: "eventDate",
    render: (_, { secondaryTrialDate }) => {
      return formatDate(secondaryTrialDate);
    },
  },
  {
    key: 10,
    title: "Ödeme",
    dataIndex: "payment",
    render: (_, { extrauuid }) => (
      <>
        {isExistPay?.data.find((item) => item?.booking === extrauuid) ? (
          <Button
            type="text"
            icon={<DollarTwoTone />}
            size={"middle"}
            onClick={() => {
              openModal();
              handleSetBooking(extrauuid);
            }}
          />
        ) : (
          <Button
            type="primary"
            size={"small"}
            onClick={() => {
              openModal();
              handleSetBooking(extrauuid);
            }}
          >
            Tamamlandı
          </Button>
        )}
      </>
    ),
  },
  {
    key: 499,
    title: "Randevuyu Sil",
    dataIndex: "delete",
    render: (_, { extrauuid }) => {
      return (
        <Button
          type="text"
          icon={<DeleteTwoTone />}
          size={"middle"}
          onClick={async () => {
            await deleteBookingMutateAsync(extrauuid);
          }}
        />
      );
    },
  },
];
