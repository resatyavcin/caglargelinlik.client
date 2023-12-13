import React, { useState } from "react";
import MainCore from "../MainCore";
import { Card, Flex, Statistic, Result, Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { getStatistic } from "../api";
import { DatePicker } from "antd";
import { Form } from "antd";

const { RangePicker } = DatePicker;
const formatter = (value) => <CountUp end={value} separator="," />;

const Admin = () => {
  const [totalCash, setTotalCash] = useState(0);
  const location = useLocation();

  const { mutateAsync } = useMutation(
    "getStatistic",
    (props) => getStatistic(props),
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onFinish = async ({ datePicker }) => {
    try {
      const data = await mutateAsync({
        startDate: datePicker[0],
        endDate: datePicker[1],
      });

      let totalSum = 0;

      data?.result?.forEach((item) => {
        const sum = item.paymentHistory.reduce(
          (acc, currentValue) => acc + currentValue,
          0
        );
        totalSum += sum;
      });

      setTotalCash(totalSum);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (location?.state?.isAdmin !== "Admin") {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" href="/">
            Müşteri Sayfasına Dön
          </Button>
        }
      />
    );
  }
  return (
    <MainCore>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Flex gap={10}>
          <Form.Item name="datePicker">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Ara</Button>
          </Form.Item>
        </Flex>
      </Form>

      <Flex justify="space-between" gap={30}>
        <Card size="small" title="Gelirlerim" style={{ width: "100%" }}>
          <Statistic
            title="Toplam Para"
            value={totalCash}
            formatter={formatter}
          />
        </Card>
      </Flex>
    </MainCore>
  );
};

export default Admin;
