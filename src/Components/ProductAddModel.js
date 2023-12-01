import React from "react";
import ProductAdd from "../forms/ProductAdd";

import { Modal } from "antd";

const ProductAddModel = ({ isOpen }) => {
  return (
    <Modal title="Ürün Ekleme" open={isOpen} footer="">
      <ProductAdd />
    </Modal>
  );
};

export default ProductAddModel;
