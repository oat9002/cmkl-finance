import React from "react";
import { Menu } from "antd";
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <Header style={{ height: "48px" }}>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '48px', textAlign: "right" }}
            >
                <Menu.Item key="1">Sign out</Menu.Item>
            </Menu>
        </Header>
    );
}

export default HeaderComponent;