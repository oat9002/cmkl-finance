import * as React from "react";
import { Tag, Table, Button } from "antd";
import { getPurchaseItems } from "../services/PurchseItemsService";
import { mapPurchaseItemsToDataTable } from "../commons/helpers/PurchaseItemsHelper";

import style from "./PurchaseItems.module.css";
import AddPurchaseItemModal from "./modal/AddPurchaseItem";

function PurchaseItems() {
    const [data, setData] = React.useState<any>([]);
    const [isLoading, setLoading] = React.useState(true);
    const [
        isShowAddPurchaseItemModal,
        setIsShowAddPurchaseItemModal
    ] = React.useState(false);

    React.useEffect(() => {
        getPurchaseItems({
            option: {
                maxRecords: 100,
                sort: [{ field: "Purchase ID", direction: "asc" }]
            }
        })
            .then(res => {
                const mappedData = mapPurchaseItemsToDataTable(res);
                setData(mappedData);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    const onAddPurchaseItemClick = () => {
        setIsShowAddPurchaseItemModal(true);
    };

    const addPurchaseItemModalVisileHandler = (isVisible: boolean) => {
        setIsShowAddPurchaseItemModal(isVisible);
    };

    return (
        <>
            <div className={style.AddPurchaseItem}>
                <Button type="primary" onClick={onAddPurchaseItemClick}>
                    Add PurchaseItem
                </Button>
            </div>
            <AddPurchaseItemModal
                visible={isShowAddPurchaseItemModal}
                setVisible={addPurchaseItemModalVisileHandler}
            />
            <Table
                columns={tableHeader}
                dataSource={data}
                scroll={{ x: true }}
                size="middle"
                bordered={true}
                loading={isLoading}
            />
        </>
    );
}

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
