/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Todo } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodoUpdateInputValues = {
    name?: string;
    description?: string;
};
export declare type TodoUpdateValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodoUpdateOverridesProps = {
    TodoUpdateGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoUpdateProps = React.PropsWithChildren<{
    overrides?: TodoUpdateOverridesProps | undefined | null;
} & {
    id?: string;
    todo?: Todo;
    onSubmit?: (fields: TodoUpdateInputValues) => TodoUpdateInputValues;
    onSuccess?: (fields: TodoUpdateInputValues) => void;
    onError?: (fields: TodoUpdateInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoUpdateInputValues) => TodoUpdateInputValues;
    onValidate?: TodoUpdateValidationValues;
} & React.CSSProperties>;
export default function TodoUpdate(props: TodoUpdateProps): React.ReactElement;
