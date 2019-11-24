import * as React from "react";
import { Modal, Alert } from "antd";
import InputWithLabel from "../common/InputWithLabel/InputWithLabel";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";
import { insertPurchaseItems } from "../../services/PurchseItemsService";

export interface AddPurchaseItemProps {
    visible: boolean;
    setVisible: (isVisible: boolean) => void;
}

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = props => {
    const [isConfirmLoading, setIsConfirmLoading] = React.useState(false);
    const [isAlert, setIsAlert] = React.useState(false);
    const [request, setRequest] = React.useState(
        createEmptyInsertPurchaseItemsRequest()
    );

    const onCancel = () => {
        props.setVisible(false);
        setRequest(createEmptyInsertPurchaseItemsRequest());
    };

    const onOk = async () => {
        setIsConfirmLoading(true);

        const isSuccess = await insertPurchaseItems(
            request as InsertPurchaseItemsRequest
        );

        setIsConfirmLoading(false);

        if (isSuccess) {
            setRequest(createEmptyInsertPurchaseItemsRequest());
            props.setVisible(false);
        } else {
            setIsAlert(true);
        }
    };

    const onRequestChange = (field: string) => (value: any) => {
        console.log(request);
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
            {isAlert ? (
                <Alert
                    type="error"
                    message="Insert failed"
                    banner
                    closable
                    onClose={() => setIsAlert(false)}
                />
            ) : null}
            <InputWithLabel
                label="Short Description"
                onChangeWithUpdate={onRequestChange("shortDescription")}
                value={request.shortDescription}
            />
            <InputWithLabel
                label="Missing Receipt"
                onChangeWithUpdate={onRequestChange("missingReceipt")}
                inputType="checkbox"
                value={request.missingReceipt}
            />
            <InputWithLabel
                label="Payment Due Date"
                onChangeWithUpdate={onRequestChange("paymentDueDate")}
                inputType="datePicker"
                value={request.paymentDueDate}
            />
            <InputWithLabel
                label="USD Invoice Amount"
                onChangeWithUpdate={onRequestChange("usdInvoiceAmount")}
                inputType="number"
                value={request.usdInvoiceAmount}
            />
            <InputWithLabel
                label="THB Invoice Amount"
                onChangeWithUpdate={onRequestChange("thbInvoiceAmount")}
                inputType="number"
                value={request.thbInvoiceAmount}
            />
            <InputWithLabel
                label="Payment Amount"
                onChangeWithUpdate={onRequestChange("paymentAmount")}
                inputType="number"
                value={request.paymentAmount}
            />
            <InputWithLabel
                label="Request Justification"
                onChangeWithUpdate={onRequestChange("requestJustification")}
                value={request.requestJustification}
            />
            {/* <InputWithLabel
                label="Entered by"
                onChangeWithUpdate={onRequestChange("enteredBy")}
                value={request.enteredBy}
            /> */}
            <InputWithLabel
                label="Account Payable"
                onChangeWithUpdate={onRequestChange("accountPayable")}
                value={request.accountPayable}
            />
            <InputWithLabel
                label="Suplier"
                onChangeWithUpdate={onRequestChange("supplier")}
                value={request.supplier}
            />
        </Modal>
    );
};

function createEmptyInsertPurchaseItemsRequest(): InsertPurchaseItemsRequest {
    return {
        shortDescription: "",
        missingReceipt: false,
        paymentDueDate: new Date(),
        usdInvoiceAmount: undefined,
        thbInvoiceAmount: undefined,
        paymentAmount: 0,
        requestJustification: "",
        enteredBy: undefined,
        accountPayable: "",
        supplier: "",
        reviewedBy: undefined
    };
}

export default AddPurchaseItem;
