import React, { useState } from "react";
import MainCore from "../MainCore";
import { Calendar, Badge, Modal } from "antd";
import { useQuery } from "react-query";
import { getCalendar } from "../api";
import dayjs from "dayjs";

const namesAndColors = {
  eventDate: { name: "Etkinlik", color: "red" },
  primaryTrialDate: { name: "1.Prova", color: "blue" },
  secondaryTrialDate: { name: "2.Prova", color: "green" },
  departureDate: { name: "Paket G.", color: "orange" },
  arrivalDate: { name: "Paket A.", color: "purple" },
};

const GeneralCalendar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState();

  const onDateSelect = (value, info) => {
    if (info === "date") {
      setSelectedDate(value);
      const dateObjectArray = data?.[dayjs(value).format("YYYY-MM-DD")];
      setBookings(dateObjectArray);
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { data, isLoading, error, isError } = useQuery(
    ["calendar"],
    async () => {
      return await getCalendar();
    }
  );

  function countDates(data = []) {
    const nameCounts = {};

    for (const item of data) {
      const name = item.name;
      if (nameCounts[name]) {
        nameCounts[name]++;
      } else {
        nameCounts[name] = 1;
      }
    }

    return nameCounts;
  }

  const dateCellRender = (value) => {
    const dateObjectArray = data?.[dayjs(value).format("YYYY-MM-DD")];

    const objectEntries = Object.entries(
      Object.keys(countDates(dateObjectArray)).length > 0 &&
        countDates(dateObjectArray)
    );

    return (
      <>
        {objectEntries &&
          objectEntries?.map(([key, value]) => (
            <Badge
              count={namesAndColors[key].name + ":" + value}
              style={{
                backgroundColor: namesAndColors[key].color,
              }}
            />
          ))}
      </>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);

    console.log(info);
    return info.originNode;
  };

  return (
    <MainCore>
      <Calendar
        fullscreen={true}
        cellRender={cellRender}
        onSelect={onDateSelect}
      />
      <Modal
        title="Gün İçi Özet"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {bookings?.map((item) => (
          <>
            <span>
              {item?.customer?.firstName} {item?.customer?.lastName} -{" "}
              {namesAndColors[item?.name].name} <br />
            </span>
          </>
        ))}
      </Modal>
    </MainCore>
  );
};

export default GeneralCalendar;
