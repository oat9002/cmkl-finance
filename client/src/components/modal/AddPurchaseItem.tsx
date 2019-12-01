import * as React from "react";
import * as Yup from "yup";
import {
    Modal,
    Alert,
    Form,
    Input,
    Checkbox,
    DatePicker,
    InputNumber
} from "antd";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";
import { insertPurchaseItems } from "../../services/PurchseItemsService";
import { getToday, removeTimeFromDate } from "../../services/Utils";

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

        if (!schema.isValidSync(request)) {
            setIsConfirmLoading(false);
            setIsAlert(true);
            return;
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
        (toUpdate as any)[field] =
            field === "paymentDueDate"
                ? removeTimeFromDate(value.toDate())
                : value;
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
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        };
        const formatNumber = (value: string | number | undefined) =>
            value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
        const checkError = (field: string) =>
            isFieldTouched(field) && getFieldError(field);

        return (
            <Form layout="horizontal">
                <Form.Item
                    label="Short Description"
                    validateStatus={
                        checkError("shortDescription") ? "error" : "success"
                    }
                    hasFeedback={checkError("shortDescription")}
                    required
                    {...formItemLayout}
                >
                    {getFieldDecorator("shortDescription", {
                        rules: [
                            {
                                required: true,
                                message:
                                    "Please fill in your short description!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Missing Receipt" {...formItemLayout}>
                    {getFieldDecorator("missingReceipt")(<Checkbox />)}
                </Form.Item>
                <Form.Item
                    label="Payment Due Date"
                    validateStatus={
                        checkError("paymentDueDate") ? "error" : "success"
                    }
                    hasFeedback={checkError("paymentDueDate")}
                    required
                    {...formItemLayout}
                >
                    {getFieldDecorator("paymentDueDate", {
                        rules: [
                            {
                                required: true,
                                message: "Please fill in your payment due date!"
                            }
                        ]
                    })(<DatePicker />)}
                </Form.Item>
                <Form.Item label="USD Invoice Amount" {...formItemLayout}>
                    {getFieldDecorator("usdInvoiceAmount")(
                        <InputNumber min={0} formatter={formatNumber} />
                    )}
                </Form.Item>
                <Form.Item label="THB Invoice Amount" {...formItemLayout}>
                    {getFieldDecorator("thbInvoiceAmount")(
                        <InputNumber min={0} formatter={formatNumber} />
                    )}
                </Form.Item>
                <Form.Item
                    label="Payment Amount"
                    validateStatus={
                        checkError("paymentAmount") ? "error" : "success"
                    }
                    hasFeedback={checkError("paymentAmount")}
                    required
                    {...formItemLayout}
                >
                    {getFieldDecorator("paymentAmount", {
                        rules: [
                            {
                                required: true,
                                message: "Please fill in your payment amount!"
                            }
                        ]
                    })(<InputNumber min={0} formatter={formatNumber} />)}
                </Form.Item>
                <Form.Item
                    label="Request Justification"
                    validateStatus={
                        checkError("requestJustification") ? "error" : "success"
                    }
                    hasFeedback={checkError("requestJustification")}
                    required
                    {...formItemLayout}
                >
                    {getFieldDecorator("requestJustification", {
                        rules: [
                            {
                                required: true,
                                message:
                                    "Please fill in your requested justification!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                {/* <Form.Item label="Entered by">
                            <InputWithLabel
                                onChangeWithUpdate={onRequestChange("enteredBy")}
                                value={request.enteredBy}
                            />
                        </Form.Item> */}
                <Form.Item
                    label="Account Payable"
                    validateStatus={
                        checkError("accountPayable") ? "error" : "success"
                    }
                    hasFeedback={checkError("accountPayable")}
                    required
                    {...formItemLayout}
                >
                    {getFieldDecorator("accountPayable", {
                        rules: [
                            {
                                required: true,
                                message: "Please fill in your account payable!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Suplier" {...formItemLayout}>
                    {getFieldDecorator("supplier")(<Input />)}
                </Form.Item>
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
            <ExtendedForm wrappedComponentRef />
        </Modal>
    );
};

function createEmptyRequest(): InsertPurchaseItemsRequest {
    return {
        shortDescription: "undefined",
        missingReceipt: undefined,
        paymentDueDate: getToday(),
        usdInvoiceAmount: undefined,
        thbInvoiceAmount: undefined,
        paymentAmount: 0,
        requestJustification: "",
        enteredBy: undefined,
        accountPayable: "",
        supplier: undefined,
        reviewedBy: undefined
    };
}

const schema = Yup.object({
    shortDescription: Yup.string()
        .trim()
        .min(1)
        .required(),
    missingReceipt: Yup.boolean().notRequired(),
    paymentDueDate: Yup.date().required(),
    usdInvoiceAmount: Yup.number().notRequired(),
    thbInvoiceAmount: Yup.number().notRequired(),
    paymentAmount: Yup.number()
        .min(0)
        .required(),
    requestJustification: Yup.string()
        .trim()
        .min(1)
        .required(),
    enteredBy: Yup.object(),
    accountPayable: Yup.string()
        .trim()
        .min(1)
        .required(),
    supplier: Yup.string().notRequired(),
    reviewedBy: Yup.object()
});

export default AddPurchaseItem;
