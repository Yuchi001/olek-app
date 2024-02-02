import React from 'react';
import {Form, FormikProps} from "formik";
import {DeathTypeProps, DeathTypeValues} from "./AddDeathType.types";
import {Button, FormLabel, Input, Stack} from "@mui/joy";
import {FormControlStyled} from "../../shared/FormControlStyles/FormControlStyled";
import {ErrorHelperText} from "../../shared/ErrorHelperText/ErrorHelperText";

export const AddDeathTypeData = (baseProps: DeathTypeProps & FormikProps<DeathTypeValues>) => {
    return <Form onSubmit={(e) => {
        e.preventDefault();
        baseProps.handleSubmit(baseProps.values);
    }}>
        <Stack spacing={1}>
            <FormControlStyled isError={!!(baseProps.errors.name && baseProps.touched.name)}
                               isTouched={baseProps.touched.name}>
                <FormLabel required>Name</FormLabel>
                <Input autoFocus onChange={(val) => {
                    if(val.target.value === null) return;
                    baseProps.setFieldValue('name', val.target.value);
                }}
                       onBlur={baseProps.handleBlur}
                       value={baseProps.values.name} />
                <ErrorHelperText isError={!!(baseProps.errors.name && baseProps.touched.name)}
                                 errorText={baseProps.errors.name} />
            </FormControlStyled>
            <Button type="submit">Submit</Button>
        </Stack>
    </Form>
}