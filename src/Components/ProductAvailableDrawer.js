import React from "react";

import { Button, Drawer, Space, Calendar } from "antd";

const ProductAvailableDrawer = ({ isOpen, closeDrawer }) => {
  return (
    <Drawer
      title="Ürün Müsaitlik Durumu"
      placement={"right"}
      width={500}
      onClose={closeDrawer}
      open={isOpen}
      extra={
        <Space>
          <Button type="primary" onClick={closeDrawer}>
            Kapat
          </Button>
        </Space>
      }
    >
      <Calendar fullscreen={false} />
    </Drawer>
  );
};

export default ProductAvailableDrawer;
