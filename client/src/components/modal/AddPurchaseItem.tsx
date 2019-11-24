import * as React from "react";
import * as Yup from "yup";
import { Modal, Alert, Form, Input } from "antd";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";
import { insertPurchaseItems } from "../../services/PurchseItemsService";

export interface AddPurchaseItemProps {
    visible: boolean;
    setVisible: (isVisible: boolean) => void;
}

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = props => {
    const [isConfirmLoading, setIsConfirmLoading] = React.useState(false);
    const [isAlert, setIsAlert] = React.useState(false);
    let request = createEmptyRequest();

    const onCancel = () => {
        props.setVisible(false);
    };

    const onOk = async () => {
        setIsConfirmLoading(true);

        if (!schema.isValid(request)) {
            setIsConfirmLoading(false);
            setIsAlert(true);
        }

        const isSuccess = await insertPurchaseItems(
            request as InsertPurchaseItemsRequest
        );

        setIsConfirmLoading(false);

        if (isSuccess) {
            props.setVisible(false);
        } else {
            setIsAlert(true);
        }
    };

    const onRequestChange = (field: string) => (value: any) => {
        const toUpdate = { ...request };
        (toUpdate as any)[field] = value;
        request = toUpdate;
    };

    const ExtendedForm = Form.create({
        name: "insert_pp",
        onFieldsChange(_, changedField) {
            const key = Object.keys(changedField)[0];
            onRequestChange(changedField[key].name)(changedField[key].value);
        }
    })((props: any) => {
        const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
        const shortDescriptionError =
            isFieldTouched("shortDescription") &&
            getFieldError("shortDescription");

        return (
            <Form layout="horizontal">
                <Form.Item
                    label="Short Description"
                    validateStatus={shortDescriptionError ? "error" : "success"}
                    hasFeedback={shortDescriptionError}
                    required
                >
                    {getFieldDecorator("shortDescription", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your shortDescription!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                {/* <Form.Item label="Missing Receipt">
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("missingReceipt")}
                        inputType="checkbox"
                        value={request.missingReceipt}
                    />
                </Form.Item>
                <Form.Item label="Payment Due Date" required>
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("paymentDueDate")}
                        inputType="datePicker"
                        value={request.paymentDueDate}
                    />
                </Form.Item>
                <Form.Item label="USD Invoice Amount">
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("usdInvoiceAmount")}
                        inputType="number"
                        value={request.usdInvoiceAmount}
                    />
                </Form.Item>
                <Form.Item label="THB Invoice Amount">
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("thbInvoiceAmount")}
                        inputType="number"
                        value={request.thbInvoiceAmount}
                    />
                </Form.Item>
                <Form.Item label="Payment Amount" required>
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("paymentAmount")}
                        inputType="number"
                        value={request.paymentAmount}
                    />
                </Form.Item>
                <Form.Item label="Request Justification" required>
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange(
                            "requestJustification"
                        )}
                        value={request.requestJustification}
                    />
                </Form.Item> */}
                {/* <Form.Item label="Entered by">
                            <InputWithLabel
                                onChangeWithUpdate={onRequestChange("enteredBy")}
                                value={request.enteredBy}
                            />
                        </Form.Item> */}
                {/* <Form.Item label="Account Payable" required>
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("accountPayable")}
                        value={request.accountPayable}
                    />
                </Form.Item>
                <Form.Item label="Suplier">
                    <InputWithHandleChange
                        onChangeWithUpdate={onRequestChange("supplier")}
                        value={request.supplier}
                    />
                </Form.Item> */}
            </Form>
        );
    });

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
            <ExtendedForm />
        </Modal>
    );
};

function createEmptyRequest(): InsertPurchaseItemsRequest {
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

const schema = Yup.object().shape({
    shortDescription: Yup.string()
        .trim()
        .required(),
    missingReceipt: Yup.boolean(),
    paymentDueDate: Yup.date().required(),
    usdInvoiceAmount: Yup.number(),
    thbInvoiceAmount: Yup.number(),
    paymentAmount: Yup.number().required(),
    requestJustification: Yup.string()
        .trim()
        .required(),
    enteredBy: Yup.object(),
    accountPayable: Yup.string()
        .trim()
        .required(),
    supplier: Yup.string(),
    reviewedBy: Yup.object()
});

export default AddPurchaseItem;
