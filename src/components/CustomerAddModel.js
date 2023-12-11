import React from "react";

import { Modal } from "antd";
import CustomerAdd from "../forms/CustomerAdd";

const CustomerAddModel = ({ isOpen, closeModel }) => {
  return (
    <Modal title="Müşteri Ekleme" open={isOpen} onCancel={closeModel} footer="">
      <CustomerAdd onCancel={closeModel} />
    </Modal>
  );
};

export default CustomerAddModel;
