import React from "react";
import { Layout, Tabs } from "antd";
import Header from "./components/Header";
import PurchaseItems from "./components/PurchaseItems";

const { Footer, Content } = Layout;
const { TabPane } = Tabs;
const tabType = {
    purchaseRequisitions: "Purchase Requisitions",
    purchaseItems: "Purchase Items"
};

const Home: React.FC = () => {
    const renderContentTabs = () => (
        <Tabs defaultActiveKey={tabType.purchaseRequisitions}>
            <TabPane tab={tabType.purchaseItems} key={tabType.purchaseItems}>
                {<PurchaseItems />}
            </TabPane>
        </Tabs>
    );

    return (
        <React.Fragment>
            <Header />
            <Content>{renderContentTabs()}</Content>
            <Footer>Footer</Footer>
        </React.Fragment>
    );
};

export default React.memo(Home);
