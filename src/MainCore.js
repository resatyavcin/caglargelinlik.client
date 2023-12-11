import React from "react";
import { Button, Card, Typography, Flex } from "antd";

import { Link } from "react-router-dom";
import { logout } from "./api.js";
import useAuth from "./useAuth.js";

const MainCore = ({ children }) => {
  const isAuth = useAuth();
  return (
    <div>
      {isAuth && (
        <div>
          <Card style={{ width: "100%" }}>
            <Flex align="center" justify="space-between" style={{ height: 15 }}>
              <Typography.Text strong>E-DEFTER</Typography.Text>

              <Flex gap={10}>
                <Link to={"/"}>Müşteri Listesi</Link>
                <Link to={"/product-list"}> Ürün Listesi</Link>
                <Link to={"/calendar"}> Genel Takvim</Link>
              </Flex>

              {
                <Button
                  size="small"
                  onClick={async () => {
                    await logout();
                    window.location.reload();
                  }}
                >
                  Çıkış Yap
                </Button>
              }
            </Flex>
          </Card>
          <div style={{ margin: 30 }}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default MainCore;
