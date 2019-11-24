import * as React from "react";
import { Input, InputNumber, DatePicker, Checkbox } from "antd";

import style from "./InputWithLabel.module.css";
import moment from "moment";

export interface InputWithLabelProps {
    placeholder?: string;
    label: string;
    inputType?: InputType;
    value: any;
    onChangeWithUpdate: (value: any) => void;
}

export type InputType = "default" | "datePicker" | "number" | "checkbox";

const InputWithLabel: React.FC<InputWithLabelProps> = props => {
    const renderInput = () => {
        switch (props.inputType) {
            case "number":
                return (
                    <InputNumber
                        placeholder={props.placeholder}
                        onChange={props.onChangeWithUpdate}
                        value={props.value}
                    />
                );
            case "datePicker":
                return (
                    <DatePicker
                        onChange={m =>
                            m
                                ? props.onChangeWithUpdate(m.toDate())
                                : props.onChangeWithUpdate(new Date())
                        }
                        value={moment(props.value)}
                    />
                );
            case "checkbox":
                return (
                    <Checkbox
                        onChange={e =>
                            props.onChangeWithUpdate(e.target.checked)
                        }
                        checked={props.value}
                    />
                );
            default:
                return (
                    <Input
                        placeholder={props.placeholder}
                        onChange={e => props.onChangeWithUpdate(e.target.value)}
                        value={props.value}
                    />
                );
        }
    };

    return (
        <>
            <span className={style.label}>{props.label}</span>
            {renderInput()}
        </>
    );
};

export default InputWithLabel;
