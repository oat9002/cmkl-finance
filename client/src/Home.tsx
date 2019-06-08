import React from "react";
import { Layout, Dropdown, Icon, Tabs } from "antd";
import Header from "./components/Header";
import PurchaseRequisition from "./components/PurchaseRequisition";

const { Footer, Content } = Layout;
const { TabPane } = Tabs;
const tabType = {
    purchaseRequisitions: "Purchase Requisitions",
    purchaseItems: "Purchase Items"
}

const Home: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = React.useState(tabType.purchaseRequisitions);

    const renderContentTabs = () => (
        <Tabs defaultActiveKey={tabType.purchaseRequisitions}>
            <TabPane tab={tabType.purchaseRequisitions} key={tabType.purchaseRequisitions}>
                <PurchaseRequisition />
            </TabPane>
            <TabPane tab={tabType.purchaseItems} key={tabType.purchaseItems}>
                {tabType.purchaseItems}
            </TabPane>
        </Tabs>
    );

    return (
        <React.Fragment>
            <Header />
            <Content>
                {renderContentTabs()}
            </Content>
            <Footer>
                Footer
            </Footer>
        </React.Fragment>
    )
}

export default React.memo(Home);