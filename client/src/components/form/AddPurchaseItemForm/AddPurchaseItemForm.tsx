import * as React from "react";
import Form, { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Input, DatePicker, Checkbox, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormContext = React.createContext<WrappedFormUtils<any> | null>(null);
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
const checkError = (form: WrappedFormUtils) => (field: string) =>
    !!form.getFieldError(field);

type AddPurchaseItemFormProps = {
    children?: React.ReactNode;
} & FormComponentProps;
type FormConsumerProps = {
    children: (value: WrappedFormUtils) => React.ReactNode;
};

const AddPurchaseItemForm: React.FC<AddPurchaseItemFormProps> = (
    props: AddPurchaseItemFormProps
) => {
    return (
        <FormContext.Provider value={props.form}>
            <Form layout="horizontal">
                <ShortDescriptionInput />
                <MissingReceiptInput />
                <PaymentDueDateInput />
                <UsdInvoiceAmountInput />
                <ThbInvoiceAmountInput />
                <PaymentAmountInput />
                <RequestJustificationInput />
                <EnteredByInput />
                <AccountPayableInput />
                <SupplierInput />
            </Form>
        </FormContext.Provider>
    );
};

const FormConsumer: React.FC<FormConsumerProps> = (
    props: FormConsumerProps
) => {
    return (
        <FormContext.Consumer>
            {form => {
                if (!form) {
                    throw new Error(
                        "Missing FormContextProvider in its parent."
                    );
                }
                return props.children(form);
            }}
        </FormContext.Consumer>
    );
};

const ShortDescriptionInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item
                    label="Short Description"
                    validateStatus={
                        checkError(form)("shortDescription")
                            ? "error"
                            : "success"
                    }
                    hasFeedback={checkError(form)("shortDescription")}
                    required
                    {...formItemLayout}
                >
                    {form.getFieldDecorator("shortDescription", {
                        validateTrigger: "onBlur",
                        rules: [
                            {
                                required: true,
                                message:
                                    "Please fill in your short description!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const MissingReceiptInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item label="Missing Receipt" {...formItemLayout}>
                    {form.getFieldDecorator("missingReceipt", {
                        valuePropName: "checked"
                    })(<Checkbox />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const PaymentDueDateInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item
                    label="Payment Due Date"
                    validateStatus={
                        checkError(form)("paymentDueDate") ? "error" : "success"
                    }
                    hasFeedback={checkError(form)("paymentDueDate")}
                    required
                    {...formItemLayout}
                >
                    {form.getFieldDecorator("paymentDueDate", {
                        rules: [
                            {
                                required: true,
                                message: "Please fill in your payment due date!"
                            }
                        ]
                    })(<DatePicker />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const UsdInvoiceAmountInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item label="USD Invoice Amount" {...formItemLayout}>
                    {form.getFieldDecorator("usdInvoiceAmount")(
                        <InputNumber min={0} />
                    )}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const ThbInvoiceAmountInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item label="THB Invoice Amount" {...formItemLayout}>
                    {form.getFieldDecorator("thbInvoiceAmount")(
                        <InputNumber min={0} />
                    )}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const PaymentAmountInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item
                    label="Payment Amount"
                    validateStatus={
                        checkError(form)("paymentAmount") ? "error" : "success"
                    }
                    hasFeedback={checkError(form)("paymentAmount")}
                    required
                    {...formItemLayout}
                >
                    {form.getFieldDecorator("paymentAmount", {
                        validateTrigger: "onBlur",
                        rules: [
                            {
                                required: true,
                                message: "Please fill in your payment amount!"
                            }
                        ]
                    })(<InputNumber min={0} />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const RequestJustificationInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item
                    label="Request Justification"
                    validateStatus={
                        checkError(form)("requestJustification")
                            ? "error"
                            : "success"
                    }
                    hasFeedback={checkError(form)("requestJustification")}
                    required
                    {...formItemLayout}
                >
                    {form.getFieldDecorator("requestJustification", {
                        validateTrigger: "onBlur",
                        rules: [
                            {
                                required: true,
                                message:
                                    "Please fill in your requested justification!"
                            }
                        ]
                    })(<TextArea rows={5} />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const EnteredByInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item label="Entered by" {...formItemLayout}>
                    {form.getFieldDecorator("enteredBy")(<Input />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const AccountPayableInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item
                    label="Account Payable"
                    validateStatus={
                        checkError(form)("accountPayable") ? "error" : "success"
                    }
                    hasFeedback={checkError(form)("accountPayable")}
                    required
                    {...formItemLayout}
                >
                    {form.getFieldDecorator("accountPayable", {
                        validateTrigger: "onBlur",
                        rules: [
                            {
                                required: true,
                                message: "Please fill in your account payable!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

const SupplierInput: React.FC = () => {
    return (
        <FormConsumer>
            {form => (
                <Form.Item label="Suplier" {...formItemLayout}>
                    {form.getFieldDecorator("supplier")(<Input />)}
                </Form.Item>
            )}
        </FormConsumer>
    );
};

export default Form.create({
    name: "insert_pp"
})(AddPurchaseItemForm);
