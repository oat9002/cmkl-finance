import * as React from "react";
import { Input, InputNumber, DatePicker } from "antd";

import style from "./InputWithLabel.module.css";

export interface InputWithLabelProps {
    placeholder?: string;
    label: string;
    inputNumber?: boolean;
    datePicker?: boolean;
    field: string;
    onChangeWithUpdate: (field: string, value: any) => void;
}

const InputWithLabel: React.FC<InputWithLabelProps> = props => {
    const renderInput = () => {
        if (props.inputNumber) {
            return (
                <InputNumber
                    id={props.field}
                    placeholder={props.placeholder}
                    onChange={inputOnChange}
                />
            );
        }

        if (props.datePicker) {
            return <DatePicker id={props.field} onChange={inputOnChange} />;
        }

        return (
            <Input
                id={props.field}
                placeholder={props.placeholder}
                onChange={e => inputOnChange(e.target.value)}
            />
        );
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
