import React from "react";
import MainCore from "../MainCore";
import { Calendar } from "antd";

const GeneralCalendar = () => {
  return (
    <MainCore>
      <Calendar fullscreen={true} />
    </MainCore>
  );
};

export default GeneralCalendar;
