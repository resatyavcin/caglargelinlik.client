import React from "react";

import { Button, Drawer, Space, Calendar, Table, Flex, message } from "antd";
import { deleteProduct, getProductOne } from "../api.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { columns } from "../pages/columns/rentHisroryColumn.js";
import dayjs from "dayjs";

const ProductAvailableDrawer = ({ isOpen, closeDrawer }) => {
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = new useQueryClient();

  const { data, isLoading } = useQuery("productOne", async () => {
    return await getProductOne({ productId: location?.state });
  });

  const { mutateAsync } = useMutation(
    "deleteProduct",
    async (productId) => await deleteProduct({ productId }),
    {
      onError: (error, variables, context) => {
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

  return (
    <Drawer
      title="Ürün Müsaitlik Durumu"
      placement={"right"}
      width={500}
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
            loading={isLoading}
            columns={columns}
            dataSource={data?.rentHistory}
            size="small"
            pagination={false}
          />
        </div>

        <Button
          type="text"
          htmlType="submit"
          block
          danger
          onClick={async () => {
            try {
              await mutateAsync(location?.state);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Ürünü Sil
        </Button>
      </Flex>
    </Drawer>
  );
};

export default ProductAvailableDrawer;
