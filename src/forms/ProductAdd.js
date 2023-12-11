import { Button, Form, AutoComplete, Alert, Checkbox } from "antd";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { createProduct } from "../api.js";

const ProductAdd = ({ productCode, onCancel, messageApi }) => {
  const { data } = useQuery("productNames");

  const {
    isError: isErrorCreateProduct,
    isLoading: isLoadingCreateProduct,
    mutateAsync,
    error: errorCreateProduct,
  } = useMutation("createProduct", (props) => createProduct(props), {
    onError: (err) => {
      console.log(err);
    },
  });

  const queryClient = new useQueryClient();

  const onFinish = async (values) => {
    await mutateAsync({ ...values, code: productCode });
    await queryClient.refetchQueries({
      queryKey: ["products"],
    });
    await queryClient.refetchQueries({
      queryKey: ["productNames"],
    });

    onCancel();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  return (
    <div style={{ marginTop: 30 }}>
      {isErrorCreateProduct && (
        <Alert
          style={{ marginBottom: 30 }}
          message="Hata"
          description={errorCreateProduct.response.data.message}
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
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Zorunlu alan.",
            },
          ]}
        >
          <AutoComplete
            style={{ width: 200 }}
            onSelect={onSelect}
            options={data?.map((value) => ({ value }))}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            placeholder="Ürün ismini giriniz."
          />
        </Form.Item>

        <Form.Item
          label="İkinci El ise işaretleyiniz"
          name="isSecondHand"
          initialValue={true}
          valuePropName="checked"
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
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoadingCreateProduct}
          >
            Ürünü Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
