import React from "react";
import { Layout, Dropdown, Menu, Icon } from "antd";
import Header from "./components/Header";
import PurchaseRequisition from "./components/PurchaseRequisition";

const { Footer, Content } = Layout;
const MenuType = {
    purchaseRequisitions: "Purchase Requisitions",
    purchaseItems: "Purchase Items"
}

const Home: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = React.useState(MenuType.purchaseRequisitions);

    const renderContentDropdownMenu = (
        <Menu>
            <Menu.Item>
                Purchase Requisitions
            </Menu.Item>
            <Menu.Item>
                Purchase Items
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <Header />
            <Content>
                <Dropdown overlay={renderContentDropdownMenu}>
                    <span>{selectedMenu} <Icon type="down" /></span>
                </Dropdown>
                <PurchaseRequisition />
            </Content>
            <Footer>
                Footer
            </Footer>
        </React.Fragment>
    )
}

export default React.memo(Home);