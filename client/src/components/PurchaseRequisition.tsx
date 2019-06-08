import React from "react";
import Axios from "axios";
import { httpStatus } from "../utils/Utils";
import { Table } from "antd";

interface HomeState {
    data: object[];
}

class PurchaseRequisition extends React.Component<any, HomeState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: []
        };
    }

    public componentDidMount() {
        this.fecthPurchaseRequisition();
    }

    private async fecthPurchaseRequisition() {
        const response = await Axios.post("http://localhost:4000/getPurchaseRequisitions",
            {
                maxRecords: 10
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": "cmklFinance",
                }
            });

        if (response.status !== httpStatus.okay) {
            return;
        }

        this.setState({
            data: this.mapTableData(response.data)
        })
    }

    private getTableHeader() {
        return [
            {
                title: "ID",
                dataIndex: "purchaseRequisitionId",
                key: "purchaseRequisitionId",
            },
            {
                title: "Request",
                dataIndex: "request",
                key: "age",
            },
            {
                title: "Urgency",
                dataIndex: "urgency",
                key: "urgency",
            },
            {
                title: "Due Date",
                dataIndex: "paymentDue",
                key: "paymentDue",
            },
            {
                title: "Created Time",
                dataIndex: "createdTime",
                key: "createdTimem",
            },
            {
                title: "Entered By",
                dataIndex: "enteredBy",
                key: "enteredBy",
            },
            {
                title: "Action",
                key: "action",
                render: () => (
                    <span>
                        <a href="#">Go to Airtable</a>
                    </span>
                ),
            },
        ];
    }

    private mapTableData(prItems: any) {
        const toReturn: any = [];

        if (!prItems || prItems.lenght === 0) {
            return toReturn;
        }

        toReturn.push(...prItems.map((item: any, idx: number) => {
            return {
                ...item,
                enteredBy: item.name,
            }
        }));

        return toReturn;
    }

    public render() {
        return (
            <div>
                <Table columns={this.getTableHeader()} dataSource={this.state.data} />
            </div>
        );
    }
}

export default PurchaseRequisition;