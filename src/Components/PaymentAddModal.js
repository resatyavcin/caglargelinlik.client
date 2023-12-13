import React, { useEffect } from "react";

import { Modal, Timeline, Typography, Tag, Button } from "antd";
import PaymentAdd from "../forms/PaymentAdd";
import { deletePayment, getAllPayments } from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteTwoTone } from "@ant-design/icons";

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

  const queryClient = new useQueryClient();

  const { mutateAsync } = useMutation(
    "deletePay",
    async (props) => await deletePayment(props),
    {
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error?.response?.data?.message,
        });
      },
      onSuccess: async (data) => {
        await queryClient.refetchQueries({
          queryKey: ["paymentHistory"],
        });

        await queryClient.refetchQueries({
          queryKey: ["customers"],
        });
        messageApi.open({
          type: "success",
          content: data?.message,
        });
      },
    }
  );

  useEffect(() => {
    isExistPayment(data?.data?.[0]?.remainingAmount);
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
          children: (
            <>
              <span>
                {`${item?.paidBy} tarafından ${item?.paidAmount} ödendi.`}
                <Button
                  type="text"
                  icon={<DeleteTwoTone />}
                  size={"middle"}
                  onClick={() => {
                    try {
                      mutateAsync({
                        payId: data?.data?.[0]?._id,
                        payItemId: item?._id,
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              </span>
            </>
          ),
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
