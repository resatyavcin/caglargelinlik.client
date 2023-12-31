import React, { useState } from "react";

import { Button, Drawer, Space, Table, Typography, message } from "antd";
import { useLocation } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "react-query";
import {
  deleteBooking,
  findBookings,
  getCustomers,
  isExistPayFromCus,
} from "../api";
import { columns } from "../pages/columns/bookingColumn";
import PaymentAddModal from "./PaymentAddModal";
const CustomerDetailDrawer = ({ isOpen, closeDrawer }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [isExistPaymentState, setIsExistPaymentState] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = new QueryClient();
  const { data } = useQuery("customerOne", async () => {
    return await getCustomers({ customerId: location?.state });
  });

  const { data: allBookingsData } = useQuery("allBookings", async () => {
    return await findBookings({ customerId: location?.state });
  });

  const { data: isExistPay } = useQuery("isExistPay", async () => {
    return await isExistPayFromCus({ customerId: location?.state });
  });

  const { mutateAsync: deleteBookingMutateAsync } = useMutation(
    "deleteBooking",
    async (props) => await deleteBooking({ booking: props }),
    {
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error?.response?.data?.message,
        });
      },
      onSuccess: async (data) => {
        await queryClient.refetchQueries({
          queryKey: ["allBookings"],
        });
        messageApi.open({
          type: "success",
          content: data,
        });
      },
    }
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSetBooking = (id) => {
    setBooking(id);
  };

  const isExistPayment = (remaining) => {
    setIsExistPaymentState(remaining === 0);
  };

  return (
    <Drawer
      title="Müşteri Detayı"
      placement={"right"}
      width={700}
      onClose={closeDrawer}
      open={isOpen}
      extra={
        <Space>
          <Button type="primary" onClick={closeDrawer}>
            Kapat
          </Button>
        </Space>
      }
    >
      <Typography.Text strong>Adı: </Typography.Text>
      <Typography.Text>{data?.[0]?.firstName}</Typography.Text> <br />
      <Typography.Text strong>Soyadı: </Typography.Text>
      <Typography.Text>{data?.[0]?.lastName}</Typography.Text> <br />
      <Typography.Text strong>Birincil Telefon Numarası: </Typography.Text>
      <Typography.Text>{data?.[0]?.primaryPhone}</Typography.Text> <br />
      <Typography.Text strong>İkincil Telefon Numarası: </Typography.Text>
      <Typography.Text>{data?.[0]?.secondaryPhone}</Typography.Text> <br />
      <Typography.Text strong>Adres: </Typography.Text>
      <Typography.Text>{data?.[0]?.address}</Typography.Text>
      {isModalOpen && (
        <PaymentAddModal
          isOpen={isModalOpen}
          closeModel={() => setIsModalOpen(false)}
          messageApi={messageApi}
          booking={booking}
          isExistPayment={isExistPayment}
        />
      )}
      {contextHolder}
      <Table
        style={{ flex: 1, marginTop: 20 }}
        columns={columns({
          openModal,
          handleSetBooking,
          isExistPay,
          deleteBookingMutateAsync,
        })}
        dataSource={allBookingsData}
        rowKey={"_id"}
        size="small"
        pagination={false}
      />
    </Drawer>
  );
};

export default CustomerDetailDrawer;
