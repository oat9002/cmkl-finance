import * as React from "react";
import { Modal, Input } from "antd";
import InputWithLabel from "../common/InputWithLabel/InputWithLabel";

export interface AddPurchaseItemProps {
    visible: boolean;
    setVisible: (isVisible: boolean) => void;
}

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = props => {
    const [isConfirmLoading, setIsConfirmLoading] = React.useState(false);

    const onCancel = () => {
        props.setVisible(false);
    };

    const onOk = () => {
        setIsConfirmLoading(true);

        setTimeout(() => {
            props.setVisible(false);
            setIsConfirmLoading(false);
        });
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
            <InputWithLabel label="Short Description" />
            <InputWithLabel label="Missing Receipt" />
            <InputWithLabel label="Payment Due Date" datePicker />
            <InputWithLabel label="USD Invoice Amount" inputNumber />
            <InputWithLabel label="THB Invoice Amount" inputNumber />
            <InputWithLabel label="Payment Amount" inputNumber />
            <InputWithLabel label="Request Justification" />
            <InputWithLabel label="Entered by" />
            <InputWithLabel label="Account Payable" />
            <InputWithLabel label="Supplier" />
        </Modal>
    );
};

export default AddPurchaseItem;
