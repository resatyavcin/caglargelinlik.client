import React from "react";
import { Button, Form, Input, Alert } from "antd";

import { useMutation } from "react-query";
import { verify } from "../api";
import { useNavigate } from "react-router-dom";
import { useVerify } from "../AuthProvider";

const Verify = () => {
  const navigate = useNavigate();
  const { setVerifiedStatus } = useVerify();
  const { isError, isLoading, mutateAsync, error } = useMutation(
    "verify",
    async (credentials) => await verify(credentials)
  );

  const onFinish = async (values) => {
    try {
      const token = await mutateAsync({
        token: values.token,
      });

      setVerifiedStatus(token);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Doğrulama kodu:"
          name="token"
          rules={[
            {
              required: true,
              message: "Doğrulama kodunu giriniz.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ height: 40, marginTop: 10 }}
            loading={isLoading}
          >
            Doğrula
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Verify;
