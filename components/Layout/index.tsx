import { ReactNode } from "react";

import "antd/dist/antd.css";
import { Breadcrumb, Layout, Menu, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Link } = Typography;

const items = [
  { label: <Link href="/">Álbum</Link>, key: "album" },
  { label: <Link href="/sticker/new">Adicionar figurinha</Link>, key: "add" },
];

interface ApplicationLayoutProps {
  children: ReactNode;
}

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
        />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
