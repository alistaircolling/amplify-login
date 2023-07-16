/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AddTodoInputValues = {
    name?: string;
    description?: string;
    completed?: boolean;
};
export declare type AddTodoValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    completed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AddTodoOverridesProps = {
    AddTodoGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    completed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AddTodoProps = React.PropsWithChildren<{
    overrides?: AddTodoOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AddTodoInputValues) => AddTodoInputValues;
    onSuccess?: (fields: AddTodoInputValues) => void;
    onError?: (fields: AddTodoInputValues, errorMessage: string) => void;
    onChange?: (fields: AddTodoInputValues) => AddTodoInputValues;
    onValidate?: AddTodoValidationValues;
} & React.CSSProperties>;
export default function AddTodo(props: AddTodoProps): React.ReactElement;
