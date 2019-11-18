import * as React from "react";
import { Modal, Input } from "antd";
import InputWithLabel from "../common/InputWithLabel/InputWithLabel";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";
import { insertPurchaseItems } from "../../services/PurchseItemsService";

export interface AddPurchaseItemProps {
    visible: boolean;
    setVisible: (isVisible: boolean) => void;
}

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = props => {
    const [isConfirmLoading, setIsConfirmLoading] = React.useState(false);
    const [request, setRequest] = React.useState({});

    const onCancel = () => {
        props.setVisible(false);
        setRequest({});
    };

    const onOk = async () => {
        setIsConfirmLoading(true);

        const isSuccess = await insertPurchaseItems(
            request as InsertPurchaseItemsRequest
        );

        setIsConfirmLoading(false);

        if (isSuccess) {
            props.setVisible(false);
        } else {
            alert("insert failed");
        }
    };

    const onRequestChange = (field: string, value: any) => {
        const toUpdate = { ...request };
        (toUpdate as any)[field] = value;
        setRequest(toUpdate);
    };

    return (
        <Modal
            title="Add purchase item"
            visible={props.visible}
            onCancel={onCancel}
            onOk={onOk}
            confirmLoading={isConfirmLoading}
            style={{ top: "5px" }}
            okText="Confirm"
        >
            <InputWithLabel
                field="shortDescription"
                label="Short Description"
                onChangeWithUpdate={onRequestChange}
            />
            <InputWithLabel
                field="missingReceipt"
                label="Missing Receipt"
                onChangeWithUpdate={onRequestChange}
            />
            <InputWithLabel
                field="paymentDueDate"
                label="Payment Due Date"
                onChangeWithUpdate={onRequestChange}
                datePicker
            />
            <InputWithLabel
                field="usdInvoiceAmount"
                label="USD Invoice Amount"
                onChangeWithUpdate={onRequestChange}
                inputNumber
            />
            <InputWithLabel
                field="thbInvoiceAmount"
                label="THB Invoice Amount"
                onChangeWithUpdate={onRequestChange}
                inputNumber
            />
            <InputWithLabel
                field="paymentAmount"
                label="Payment Amount"
                onChangeWithUpdate={onRequestChange}
                inputNumber
            />
            <InputWithLabel
                field="requestJustification"
                label="Request Justification"
                onChangeWithUpdate={onRequestChange}
            />
            <InputWithLabel
                field="enteredBy"
                label="Entered by"
                onChangeWithUpdate={onRequestChange}
            />
            <InputWithLabel
                field="accountPayable"
                label="Account Payable"
                onChangeWithUpdate={onRequestChange}
            />
            <InputWithLabel
                field="Suuplier"
                label="Supplier"
                onChangeWithUpdate={onRequestChange}
            />
        </Modal>
    );
};

export default AddPurchaseItem;
