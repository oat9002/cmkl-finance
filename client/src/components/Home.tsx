import React from "react";
import { Layout, Tabs } from "antd";
import Header from "./Header";
import PurchaseItems from "./PurchaseItems";

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
        <>
            <Header />
            <Content>{renderContentTabs()}</Content>
            <Footer>Footer</Footer>
        </>
    );
};

export default React.memo(Home);
