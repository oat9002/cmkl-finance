import * as React from "react";
import { Modal, Alert } from "antd";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";
import { insertPurchaseItems } from "../../services/PurchseItemsService";
import { removeTimeFromDate, parseInputNumber } from "../../services/Utils";
import AddPurchaseItemForm from "../form/AddPurchaseItemForm/AddPurchaseItemForm";
import { WrappedFormUtils } from "antd/lib/form/Form";

export interface AddPurchaseItemProps {
    visible: boolean;
    setVisible: (isVisible: boolean) => void;
    fetchDataWhenConfirm: () => void;
}

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = props => {
    const [isConfirmLoading, setIsConfirmLoading] = React.useState(false);
    const [isAlert, setIsAlert] = React.useState(false);
    const [formRef, setFormRef] = React.useState<WrappedFormUtils<any> | null>(
        null
    );

    const saveFormRef = React.useCallback(node => {
        if (node !== null) {
            setFormRef(node);
        }
    }, []);

    const onCancel = () => {
        props.setVisible(false);
    };

    const onOk = async () => {
        if (!!formRef) {
            formRef.validateFields(async (err, values) => {
                if (err) {
                    setIsConfirmLoading(false);
                    return;
                }

                setIsConfirmLoading(true);

                const isSuccess = await insertPurchaseItems(mapRequest(values));

                setIsConfirmLoading(false);

                if (isSuccess) {
                    props.setVisible(false);
                    props.fetchDataWhenConfirm();
                    formRef.resetFields();
                } else {
                    setIsAlert(true);
                }

                console.log("Received values of form: ", values);
            });
        } else {
            setIsAlert(true);
        }
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
                    message="Error, problems have been occured"
                    banner
                    closable
                    onClose={() => setIsAlert(false)}
                />
            ) : null}
            <AddPurchaseItemForm ref={saveFormRef} />
        </Modal>
    );
};

function mapRequest(data: any): InsertPurchaseItemsRequest {
    console.log(data);
    return {
        shortDescription: data.shortDescription,
        missingReceipt: data.missingReceipt,
        paymentDueDate: removeTimeFromDate(data.paymentDueDate.toDate()),
        usdInvoiceAmount: parseInputNumber(data.usdInvoiceAmount),
        thbInvoiceAmount: parseInputNumber(data.thbInvoiceAmount),
        paymentAmount: parseInputNumber(data.paymentAmount),
        requestJustification: data.requestJustification,
        enteredBy: undefined,
        accountPayable: data.accountPayable,
        supplier: data.supplier,
        reviewedBy: undefined
    };
}

export default AddPurchaseItem;
