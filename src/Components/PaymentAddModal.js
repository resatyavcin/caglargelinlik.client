import React, { useEffect } from "react";

import { Modal, Timeline, Typography, Tag } from "antd";
import PaymentAdd from "../forms/PaymentAdd";
import { getAllPayments } from "../api.js";
import { useQuery } from "react-query";
const PaymentAddModal = ({
  isOpen,
  closeModel,
  booking,
  messageApi,
  isExistPayment,
}) => {
  const { data } = useQuery("paymentHistory", async () => {
    return await getAllPayments({ booking });
  });

  useEffect(() => {
    isExistPayment(data?.data?.[0].remainingAmount);
  }, [data, isExistPayment]);

  return (
    <Modal title="Ödeme Ekleme" open={isOpen} onCancel={closeModel} footer="">
      {data?.data?.[0].remainingAmount !== 0 ? (
        <Typography.Text strong mark>
          Kalan Tutar: {data?.data?.[0].remainingAmount}
        </Typography.Text>
      ) : (
        <Tag color={"green"}>Ödeme Tamamlandı</Tag>
      )}
      <Timeline
        style={{ marginTop: 20 }}
        items={data?.data?.[0]?.paymentHistory?.map((item, i) => ({
          children: `${item?.paidBy} tarafından ${item?.paidAmount} ödendi.`,
        }))}
      />
      {data?.data?.[0].remainingAmount !== 0 && (
        <PaymentAdd
          booking={booking}
          onCancel={closeModel}
          messageApi={messageApi}
        />
      )}
    </Modal>
  );
};

export default PaymentAddModal;
