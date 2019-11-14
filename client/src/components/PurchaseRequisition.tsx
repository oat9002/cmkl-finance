import React from "react";
import Axios from "axios";
import { Table, Tag } from "antd";
import Moment from "moment";
import { Urgency } from "../models/PurchaseRequisition";
import { httpStatus } from "../commons/Constants";

interface HomeState {
    data: object[];
}

class PurchaseRequisition extends React.Component<any, HomeState> {
    constructor(props: any) {
        super(props);
        Moment.locale("th");

        this.state = {
            data: []
        };
    }

    public componentDidMount() {
        this.fecthPurchaseRequisition();
    }

    private async fecthPurchaseRequisition() {
        const response = await Axios.post(
            "http://localhost:4000/getPurchaseRequisitions",
            {
                maxRecords: 10
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": "cmklFinance"
                }
            }
        );

        if (response.status !== httpStatus.okay) {
            return;
        }

        this.setState({
            data: this.mapTableData(response.data)
        });
    }

    private getTableHeader() {
        return [
            {
                title: "ID",
                dataIndex: "purchaseRequisitionId",
                key: "purchaseRequisitionId"
            },
            {
                title: "Request",
                dataIndex: "request",
                key: "age"
            },
            {
                title: "Urgency",
                dataIndex: "urgency",
                key: "urgency",
                render: (urgency?: Urgency) => {
                    if (!urgency) {
                        return null;
                    }

                    let color = "cyan";
                    switch (urgency) {
                        case "Medium Urgency":
                            color = "yellow";
                            break;
                        case "Mission Critical":
                            color = "orange";
                            break;
                        case "Top Urgency":
                            color = "red";
                    }

                    return (
                        <span>
                            <Tag color={color}>{urgency}</Tag>
                        </span>
                    );
                }
            },
            {
                title: "Due Date",
                dataIndex: "paymentDue",
                key: "paymentDue"
            },
            {
                title: "Created Time",
                dataIndex: "createdTime",
                key: "createdTimem"
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
                title: "Action",
                key: "action",
                render: () => (
                    <span>
                        <a href="#">Go to Airtable</a>
                    </span>
                )
            }
        ];
    }

    private mapTableData(prItems: any) {
        const toReturn: any = [];

        if (!prItems || prItems.lenght === 0) {
            return toReturn;
        }

        toReturn.push(
            ...prItems.map((item: any, idx: number) => {
                console.log(item);
                return {
                    ...item,
                    createdTime:
                        item.createdTime &&
                        Moment(item.createdTime).format("DD/MM/YYYY hh:mm"),
                    paymentDue:
                        item.paymentDue &&
                        Moment(item.paymentDue).format("DD/MM/YYYY"),
                    enteredBy: item.enteredBy && item.enteredBy.name
                };
            })
        );

        return toReturn;
    }

    public render() {
        return (
            <div>
                <Table
                    columns={this.getTableHeader()}
                    dataSource={this.state.data}
                    scroll={{ x: 240 }}
                />
            </div>
        );
    }
}

export default PurchaseRequisition;
