import React from "react";
import { Button, Form, Input, Alert } from "antd";

import { useMutation } from "react-query";
import { login } from "../api.js";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const { isError, isLoading, mutateAsync, error } = useMutation(
    "auth",
    (credentials) => login(credentials)
  );

  const onFinish = async (values) => {
    await mutateAsync({
      username: values.username,
      password: values.password,
    });

    navigate("/");
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
          label="Kullanıcı"
          name="username"
          rules={[
            {
              required: true,
              message: "Kullanıcı adını giriniz.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[
            {
              required: true,
              message: "Şifreyi giriniz.",
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
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
