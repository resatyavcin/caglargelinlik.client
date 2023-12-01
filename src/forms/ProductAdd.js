import { Button, Form, AutoComplete, Alert, Checkbox } from "antd";

import { useQuery } from "react-query";

const ProductAdd = () => {
  const { isError, isLoading, data } = useQuery("productNames");

  console.log(data);

  const onFinish = async (values) => {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  return (
    <div style={{ marginTop: 30 }}>
      {isError && (
        <Alert
          style={{ marginBottom: 30 }}
          message="Hata"
          //   description={error.response.data.message}
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
          label="Kullanıcı"
          name="username"
          rules={[
            {
              required: true,
              message: "Kullanıcı adını giriniz.",
            },
          ]}
        >
          <AutoComplete
            style={{ width: 200 }}
            onSelect={onSelect}
            options={data}
            // onSearch={(text) => data.forEach((item) => item?.startsWith(text))}
            placeholder="input here"
          />
        </Form.Item>

        <Form.Item
          label="İkinci El ise işaretleyiniz"
          name="isSecondHand"
          rules={[
            {
              required: true,
              message: "Zorunlu alan.",
            },
          ]}
        >
          <Checkbox />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Ürünü Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
