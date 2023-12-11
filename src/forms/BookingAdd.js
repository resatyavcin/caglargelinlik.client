import {
  Button,
  Form,
  Alert,
  DatePicker,
  Checkbox,
  Select,
  Segmented,
  Input,
  InputNumber,
} from "antd";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { createBooking, getProductNames } from "../api.js";
import { useEffect, useState } from "react";

const BookingAdd = () => {
  const [productCode, setProductCode] = useState("WD");
  const [productNameSelectDataState, setProductNameSelectDataState] = useState(
    []
  );

  const location = useLocation();

  const { isError, isLoading, mutateAsync, error } = useMutation(
    "createBooking",
    async (props) => await createBooking(props)
  );

  const { data: productNameSelectData, refetch: productNameSelectRefetch } =
    useQuery(
      ["productNames"],
      () => {
        return getProductNames({ type: productCode });
      },
      {
        onSuccess: (data) => {
          setProductNameSelectDataState(data);
        },
      }
    );

  useEffect(() => {
    productNameSelectRefetch();
  }, [productCode, productNameSelectRefetch]);

  const onFinish = async (values) => {
    console.log(values);
    try {
      await mutateAsync({
        ...values,
        customer: location?.state,
        eventType: productCode,
        productTakeType: "rent",
        isPackage: false,
        isSell: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const PRODUCT_CODE = Object.freeze({
    WD: "Gelinlik",
    HN: "Kınalık",
    EG: "Nişanlık",
  });

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
      <Segmented
        style={{ marginBottom: 20 }}
        size="large"
        onChange={async (value) => {
          setProductCode(
            Object.keys(PRODUCT_CODE).find(
              (item) => PRODUCT_CODE[item] === value
            )
          );
        }}
        options={[PRODUCT_CODE.WD, PRODUCT_CODE.EG, PRODUCT_CODE.HN]}
        block
      />

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 4 }}
      >
        <Form.Item label="Paket Mi?" valuePropName="isPackage">
          <Checkbox />
        </Form.Item>

        <Form.Item label="Satılık Mı?" valuePropName="isSell">
          <Checkbox />
        </Form.Item>

        <Form.Item
          label="Ürün İsmi"
          name="productName"
          rules={[
            {
              required: true,
              message: "Ürün İsmini giriniz.",
            },
          ]}
        >
          <Select
            onChange={onSelect}
            options={productNameSelectData?.map((value) => ({ value }))}
          />
        </Form.Item>

        <Form.Item
          label="Özel Ürün Kodu"
          name="productSpecialCode"
          rules={[
            {
              required: true,
              message: "Özel Ürün Kodunu giriniz.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Birinci Prova"
          name="primaryTrialDate"
          rules={[
            {
              required: true,
              message: "Birinci prova gününü giriniz.",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="İkinci Prova"
          name="secondaryTrialDate"
          rules={[
            {
              required: true,
              message: "İkinci Prova gününü giriniz.",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Asıl Gün"
          name="eventDate"
          rules={[
            {
              required: true,
              message: "Düğün/Kına/Nişan gününü giriniz.",
            },
          ]}
        >
          <DatePicker
            placeholder="Düğün/Kına/Nişan"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Gidişi"
          name="productDeliveryDate"
          rules={[
            {
              required: true,
              message: "Ürünü müşteriye veriş tarihini giriniz.",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ürün Gelişi"
          name="productReturnDate"
          rules={[
            {
              required: true,
              message: "Dönüş tarihini giriniz.",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Notlarım" name="note">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tutar"
          name="totalAmount"
          rules={[
            {
              required: true,
              message: "Tutar giriniz.",
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Randevu Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingAdd;
