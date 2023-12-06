import { Button, Form, Alert, Input } from "antd";

import { useMutation, useQueryClient } from "react-query";
import { createCustomer } from "../api.js";

const CustomerAdd = ({ onCancel }) => {
  const { isError, isLoading, mutateAsync, error } = useMutation(
    "createProduct",
    (props) => createCustomer(props)
  );

  const queryClient = new useQueryClient();

  const onFinish = async (values) => {
    await mutateAsync({ ...values });

    onCancel();

    queryClient.refetchQueries(["customers"]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginTop: 30 }}>
      {isError && (
        <Alert
          style={{ marginBottom: 30 }}
          message="Hata"
          description={error.response.data.message}
          type="error"
          showIcon
        />
      )}
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Adı"
          name="firstName"
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
          label="Soaydı"
          name="lastName"
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
          label="Birincil Telefon No"
          name="primaryPhone"
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
          label="İkincil Telefon No"
          name="secondaryPhone"
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
          label="Adres"
          name="address"
          rules={[
            {
              required: true,
              message: "Zorunlu alan.",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Müşteri Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerAdd;
