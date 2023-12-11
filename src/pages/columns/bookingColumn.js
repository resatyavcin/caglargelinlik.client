import { Tag, Button } from "antd";
import { DollarTwoTone } from "@ant-design/icons";
import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY");
}

const EVENT_CODE = Object.freeze({
  WD: "Düğün",
  HN: "Kına",
  EG: "Nişan",
});

export const columns = ({ openModal, handleSetBooking }) => [
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
        <Button
          type="text"
          icon={<DollarTwoTone />}
          size={"middle"}
          onClick={() => {
            openModal();
            handleSetBooking(extrauuid);
          }}
        />
      </>
    ),
  },
];
