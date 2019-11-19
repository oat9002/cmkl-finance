import * as React from "react";
import { Input, InputNumber, DatePicker, Checkbox } from "antd";

import style from "./InputWithLabel.module.css";

export interface InputWithLabelProps {
    placeholder?: string;
    label: string;
    inputType?: InputType;
    field: string;
    onChangeWithUpdate: (field: string, value: any) => void;
}

export type InputType = "default" | "datePicker" | "number" | "checkbox";

const InputWithLabel: React.FC<InputWithLabelProps> = props => {
    const renderInput = () => {
        switch (props.inputType) {
            case "number":
                return (
                    <InputNumber
                        id={props.field}
                        placeholder={props.placeholder}
                        onChange={inputOnChange}
                    />
                );
            case "datePicker":
                return <DatePicker id={props.field} onChange={inputOnChange} />;
            case "checkbox":
                return (
                    <Checkbox
                        id={props.field}
                        onChange={e => inputOnChange(e.target.checked)}
                    />
                );
            default:
                return (
                    <Input
                        id={props.field}
                        placeholder={props.placeholder}
                        onChange={e => inputOnChange(e.target.value)}
                    />
                );
        }
    };

    const inputOnChange = (value: any) => {
        props.onChangeWithUpdate(props.field, value);
    };

    return (
        <>
            <span className={style.label}>{props.label}</span>
            {renderInput()}
        </>
    );
};

export default InputWithLabel;
