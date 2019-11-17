import * as React from "react";
import { Input, InputNumber, DatePicker } from "antd";

import style from "./InputWithLabel.module.css";

export interface InputWithLabelProps {
    placeholder?: string;
    label: string;
    inputNumber?: boolean;
    datePicker?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = props => {
    const renderInput = () => {
        if (props.inputNumber) {
            return <InputNumber placeholder={props.placeholder} />;
        }

        if (props.datePicker) {
            return <DatePicker />;
        }

        return <Input placeholder={props.placeholder} />;
    };

    return (
        <>
            <span className={style.label}>{props.label}</span>
            {renderInput()}
        </>
    );
};

export default InputWithLabel;
