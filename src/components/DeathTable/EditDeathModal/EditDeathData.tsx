import React from 'react';
import {Form, FormikProps} from "formik";
import {EditDeathProps, EditDeathValues} from "./EditDeath.types";
import {BetterSelect} from "../../shared/BetterSelect/BetterSelect";
import {FormControlStyled} from "../../shared/FormControlStyles/FormControlStyled";
import {ErrorHelperText} from "../../shared/ErrorHelperText/ErrorHelperText";
import {Button, FormLabel, Stack, Textarea} from "@mui/joy";
import {GeneSelector} from "./SubModules/GeneSelector";
import {FactorSelector} from "./SubModules/FactorSelector";
import "../../shared/styles/hideScroll.css";

export const EditDeathData = (baseProps: EditDeathProps & FormikProps<EditDeathValues>) => {
    return <Form onSubmit={(e) => {
        e.preventDefault();
        baseProps.handleSubmit();
    }}>
        <Stack spacing={1} style={{ marginBottom: '35px' }}>
            <FormControlStyled isError={!!(baseProps.errors.death_type && baseProps.touched.death_type)}
                               isTouched={baseProps.touched.death_type}>
                <FormLabel required>Death type</FormLabel>
                <BetterSelect options={baseProps.death_types_options}
                              value={baseProps.values.death_type || null}
                              disabled
                              placeHolder={"Select death type..."}
                              onChange={(value) => {
                                  baseProps.setFieldValue('death_type', +value);
                              }} />
                <ErrorHelperText isError={!!(baseProps.errors.death_type && baseProps.touched.death_type)}
                                 errorText={baseProps.errors.death_type} />
            </FormControlStyled>
            <FormControlStyled isError={!!(baseProps.errors.description && baseProps.touched.description)}
                               isTouched={baseProps.touched.description}>
                <FormLabel required>Description</FormLabel>
                <Textarea minRows={3} value={baseProps.values.description || undefined}
                          placeholder={"Type description..."}
                          onChange={(e) => {
                    if(e.target.value === null) return;
                    baseProps.setFieldValue('description', e.target.value);
                }} />
                <ErrorHelperText isError={!!(baseProps.errors.description && baseProps.touched.description)}
                                 errorText={baseProps.errors.description} />
            </FormControlStyled>
            <GeneSelector baseProps={baseProps} />
            <FactorSelector baseProps={baseProps} />
            <Button style={{ position: 'fixed', width: '95%', bottom: 10, left: '50%', transform: 'translate(-50%, 0)' }}
                    type="submit">Submit</Button>
        </Stack>
    </Form>
}