import React from "react";
import { Button, Card, Typography, Flex } from "antd";

import { useMutation } from "react-query";
import { logout } from "./api.js/index.js";
import { Link } from "react-router-dom";

const MainCore = ({ children }) => {
  const { mutateAsync } = useMutation("auth", logout, {
    withCreadential: true,
  });

  const logoutHandle = async () => {
    mutateAsync();
  };

  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Flex align="center" justify="space-between" style={{ height: 15 }}>
          <Typography.Text strong>E-DEFTER</Typography.Text>

          <Flex gap={10}>
            <Link to={"/"}>Müşteri Sayfası</Link>
            <Link to={"/product-list/WD"}> Ürün Listesi</Link>
          </Flex>

          {
            <Button size="small" onClick={logoutHandle}>
              Çıkış Yap
            </Button>
          }
        </Flex>
      </Card>
      <div style={{ margin: 30 }}>{children}</div>
    </div>
  );
};

export default MainCore;
