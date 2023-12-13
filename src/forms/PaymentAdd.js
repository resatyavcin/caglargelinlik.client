import { Button, Form, Alert, Input, InputNumber } from "antd";

import { useMutation, useQueryClient } from "react-query";
import { createPayment } from "../api";

const PaymentAdd = ({ booking, onCancel, messageApi, editableData }) => {
  const queryClient = new useQueryClient();
  const [form] = Form.useForm();

  const {
    isError: isErrorCreatePayment,
    isLoading: isLoadingCreatePayment,
    mutateAsync,
    error: errorCreatePayment,
  } = useMutation(
    "createPayment",
    (props) => createPayment({ ...props, booking }),
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: async (data) => {
        messageApi.success(data?.message);

        await queryClient.refetchQueries({
          queryKey: ["customers"],
        });
        await queryClient.refetchQueries({
          queryKey: ["allBookings"],
        });
      },
    }
  );

  const onFinish = async (values) => {
    try {
      await mutateAsync({ ...values });
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {isErrorCreatePayment && (
        <Alert
          style={{ marginBottom: 30 }}
          message="Hata"
          description={errorCreatePayment.response.data.message}
          type="error"
          showIcon
        />
      )}
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Ödeyen Kişi"
          name="paidBy"
          rules={[
            {
              required: true,
              message: "Zorunlu alan.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ödeme Tutarı"
          name="paidAmount"
          rules={[
            {
              required: true,
              message: "Zorunlu alan.",
            },
            {
              type: "number",
              min: "0",
              message: "Sayı girin.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoadingCreatePayment}
          >
            Ödeme Al
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentAdd;
