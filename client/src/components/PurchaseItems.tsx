import * as React from "react";
import PurchaseItem from "../models/PurchanseItem";
import { Tag, Table } from "antd";
import { getPurchaseItems } from "../services/PurchseItemsService";
import { mapPurchaseItemsToDataTable } from "../commons/helpers/PurchaseItemsHelper";

const PurchaseItems: React.FC<any> = () => {
    const [data, setData] = React.useState([] as PurchaseItem[]);

    React.useEffect(() => {
        getPurchaseItems(10).then(res => {
            setData(res);
        });
    }, []);

    return (
        <>
            <Table
                columns={tableHeader}
                dataSource={mapPurchaseItemsToDataTable(data)}
                scroll={{ x: 240 }}
            />
        </>
    );
};

const tableHeader = [
    {
        title: "Purchase Id",
        dataIndex: "purchaseItemsId",
        key: "purchaseItemsId"
    },
    {
        title: "Description",
        dataIndex: "shortDescription",
        key: "age"
    },
    {
        title: "Payment Due Date",
        dataIndex: "paymentDueDate",
        key: "paymentDueDate"
    },
    {
        title: "USD Invoice Amount",
        dataIndex: "usdInvoiceAmount",
        key: "usdInvoiceAmount"
    },
    {
        title: "THB Invoice Amount",
        dataIndex: "thbInvoiceAmount",
        key: "thbInvoiceAmount"
    },
    {
        title: "Payment Amount",
        dataIndex: "paymentAmount",
        key: "paymentAmount"
    },
    {
        title: "Request Justification",
        dataIndex: "requestJustification",
        key: "requestJustification"
    },
    {
        title: "Request Justification",
        dataIndex: "requestJustification",
        key: "requestJustification"
    },
    {
        title: "Entered By",
        dataIndex: "enteredBy",
        key: "enteredBy",
        render: (name?: string) => {
            if (!name) {
                return null;
            }

            return (
                <span>
                    <Tag color="blue">{name}</Tag>
                </span>
            );
        }
    },
    {
        title: "Account Payable",
        dataIndex: "accountPayble",
        key: "accountPayble"
    },
    {
        title: "Supplier",
        dataIndex: "supplier",
        key: "supplier"
    },
    {
        title: "Action",
        key: "action",
        render: () => (
            <span>
                <a href="#">Go to Airtable</a>
            </span>
        )
    }
];

export default PurchaseItems;
