import React from "react";
import { Modal } from "antd";

const AreYouSureModal = ({ isOpen, closeModel, confirmLoading, handleOk }) => {
  return (
    <Modal
      title="Emin Misin?"
      open={isOpen}
      onOk={handleOk}
      okText="Evet"
      cancelText="Değilim"
      confirmLoading={confirmLoading}
      onCancel={closeModel}
    >
      <p>Yapılan işlemden emin misiniz?</p>
    </Modal>
  );
};

export default AreYouSureModal;
