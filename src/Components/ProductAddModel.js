import React from "react";
import ProductAdd from "../forms/ProductAdd";

import { Modal } from "antd";

const ProductAddModel = ({ isOpen, closeModel, productCode, messageApi }) => {
  return (
    <Modal title="Ürün Ekleme" open={isOpen} onCancel={closeModel} footer="">
      <ProductAdd
        productCode={productCode}
        onCancel={closeModel}
        messageApi={messageApi}
      />
    </Modal>
  );
};

export default ProductAddModel;
