import React, { useState } from "react";

import { Button, Drawer, Space, Calendar, Table, Flex, message } from "antd";
import {
  deleteProduct,
  getProductOne,
  receivingProduct,
  receivingProductCancel,
} from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { columns } from "../pages/columns/rentHistoryColumn";
import dayjs from "dayjs";
import AreYouSureModal from "./AreYouSureModal";
const ProductAvailableDrawer = ({ isOpen, closeDrawer }) => {
  const [areYouSureDelete, setAreYouSureDelete] = useState(false);
  const [receiveFn, setReceiveFn] = useState();
  const [
    areYouSureReceivingOrReceivingCancel,
    setAreYouSureReceivingOrReceivingCancel,
  ] = useState(false);
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = new useQueryClient();

  const { data, isLoading } = useQuery("productOne", async () => {
    return await getProductOne({ productId: location?.state });
  });

  const { mutateAsync, isLoading: deleteLoading } = useMutation(
    "deleteProduct",
    async (productId) => await deleteProduct({ productId }),
    {
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error?.response?.data?.message,
        });
      },
      onSuccess: async (data) => {
        await queryClient.refetchQueries({
          queryKey: ["products"],
        });
        await queryClient.refetchQueries({
          queryKey: ["productNames"],
        });

        messageApi
          .open({
            type: "success",
            content: data?.message,
          })
          .then(() => {
            closeDrawer();
          });
      },
    }
  );

  const {
    mutateAsync: receivingProductMutation,
    isLoading: receivingProductLoading,
  } = useMutation(
    "receivingProduct",
    async (booking) => await receivingProduct({ booking }),
    {
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error?.response?.data?.message,
        });
      },
      onSuccess: async (data) => {
        await queryClient.refetchQueries({
          queryKey: ["productOne"],
        });
        messageApi.open({
          type: "success",
          content: data?.message,
        });
      },
    }
  );

  const {
    mutateAsync: receivingProductCancelMutation,
    isLoading: receivingProductCancelLoading,
  } = useMutation(
    "receivingProduct",
    async (booking) => await receivingProductCancel({ booking }),
    {
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error?.response?.data?.message,
        });
      },
      onSuccess: async (data) => {
        await queryClient.refetchQueries({
          queryKey: ["productOne"],
        });
        messageApi.open({
          type: "success",
          content: data?.message,
        });
      },
    }
  );

  function calculateDateRange(data) {
    const result = [];

    data?.forEach((item) => {
      if (item?.isPackage && item?.packageDetails) {
        const { departureDate, arrivalDate } = item?.packageDetails;
        result.push(...getDateRange(departureDate, arrivalDate));
      } else if (!item?.isPackage) {
        const { productDeliveryDate, productReturnDate } = item;
        result.push(...getDateRange(productDeliveryDate, productReturnDate));
      }
    });

    return result;
  }

  // Yardımcı fonksiyon
  function getDateRange(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const range = [];

    let currentDate = start;
    while (currentDate?.isBefore(end) || currentDate?.isSame(end)) {
      range.push(currentDate?.format("DD-MM-YYYY"));
      currentDate = currentDate.add(1, "day");
    }

    return range;
  }

  const handleReturnProductOperationAreYouSureOK = async () => {
    try {
      await receiveFn();
      setAreYouSureReceivingOrReceivingCancel(false);
    } catch (error) {
      setAreYouSureReceivingOrReceivingCancel(false);
    }
  };

  const handlerReceiveFn = (fn) => {
    if (!areYouSureReceivingOrReceivingCancel) {
      setAreYouSureReceivingOrReceivingCancel(true);
    }

    setReceiveFn(fn);
  };

  return (
    <Drawer
      title="Ürün Müsaitlik Durumu"
      placement={"right"}
      width={700}
      onClose={() => {
        closeDrawer();
      }}
      open={isOpen}
      extra={
        <Space>
          <Button type="primary" onClick={closeDrawer}>
            Kapat
          </Button>
        </Space>
      }
    >
      {contextHolder}
      <Flex vertical justify={"space-between"} style={{ height: "100%" }}>
        <Calendar
          fullscreen={false}
          disabledDate={(date) => {
            if (calculateDateRange(data?.rentHistory).length > 0) {
              return calculateDateRange(data?.rentHistory).includes(
                date.format("DD-MM-YYYY")
              );
            }
          }}
        />
        <div style={{ flex: 1, marginTop: 20 }}>
          <Table
            rowKey={"_id"}
            loading={isLoading}
            columns={columns({
              mutation: receivingProductMutation,
              cancelMutation: receivingProductCancelMutation,
              handlerReceiveFn,
            })}
            dataSource={data?.rentHistory}
            size="small"
            pagination={false}
          />
        </div>
        <AreYouSureModal
          confirmLoading={deleteLoading}
          isOpen={areYouSureDelete}
          closeModel={() => setAreYouSureDelete(false)}
          handleOk={async () => {
            try {
              await mutateAsync(location?.state);
              setAreYouSureDelete(false);
            } catch (error) {
              setAreYouSureDelete(false);
            }
          }}
        />

        <AreYouSureModal
          confirmLoading={
            receivingProductLoading || receivingProductCancelLoading
          }
          isOpen={areYouSureReceivingOrReceivingCancel}
          closeModel={() => setAreYouSureReceivingOrReceivingCancel(false)}
          handleOk={handleReturnProductOperationAreYouSureOK}
        />
        <Button
          type="text"
          htmlType="submit"
          block
          danger
          onClick={() => {
            setAreYouSureDelete(true);
          }}
        >
          Ürünü Sil
        </Button>
      </Flex>
    </Drawer>
  );
};

export default ProductAvailableDrawer;
