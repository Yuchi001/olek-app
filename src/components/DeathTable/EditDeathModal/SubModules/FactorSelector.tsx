import React, {useEffect, useState} from 'react';
import {NumericOption} from "../../../shared/formUtils/formUtils";
import {toNumericArr} from "../EditDeath.schema";
import {useFactors} from "../../../../hooks/useFactors";
import {EditDeathProps, EditDeathValues} from "../EditDeath.types";
import {FormikProps, isString} from "formik";
import {FormControlStyled} from "../../../shared/FormControlStyles/FormControlStyled";
import {FormLabel, Input, Stack, Typography} from "@mui/joy";
import {BetterSelect} from "../../../shared/BetterSelect/BetterSelect";
import IconButton from "@mui/joy/IconButton";
import {DeleteOutlined} from "@mui/icons-material";
import {ErrorHelperText} from "../../../shared/ErrorHelperText/ErrorHelperText";

type Props = {
    baseProps: EditDeathProps & FormikProps<EditDeathValues>,
}
export const FactorSelector = ({ baseProps }: Props) => {
    const [currentFactors, setCurrentFactors] = useState<NumericOption[]>([]);
    const { factors } = useFactors();

    useEffect(() => {
        const allFactors = factors;
        baseProps.values.factors.forEach(gene => {
            const foundIndex = allFactors.findIndex(g => g.id === gene.id);
            if(foundIndex !== -1) allFactors.splice(foundIndex, 1);
        });
        setCurrentFactors(toNumericArr(factors));
    }, [factors]);

    const factorTouched = (id: number): boolean => {
        if (!Array.isArray(baseProps.touched.factors)) return false;
        return baseProps.touched.factors[id]?.activation || false;
    };

    const factorErrorMessage = (id: number): string => {
        if (!Array.isArray(baseProps.errors.factors)) return '';
        const e = baseProps.errors.factors[id];
        if (isString(e)) return e;
        return e?.activation || '';
    }

    return <>
        <FormControlStyled isError={false} isTouched={false}>
            <FormLabel><Typography level="h3">Factor selector</Typography></FormLabel>
            <BetterSelect options={currentFactors}
                          value={null}
                          placeHolder={"Select more factors..."}
                          onChange={(val) => {
                              const foundIndex = currentFactors.findIndex(g => g.value === val);
                              const currFactors = currentFactors;

                              const activeFactors = baseProps.values.factors;
                              activeFactors.push({
                                  id: currFactors[foundIndex].value,
                                  name: currFactors[foundIndex].label,
                                  activation: '',
                              });
                              baseProps.setFieldValue('factors', activeFactors);

                              currFactors.splice(foundIndex, 1);
                              setCurrentFactors(currFactors);
                          }}/>
        </FormControlStyled>
        {baseProps.values.factors.map((factor, keyIndex) =>
            (
                <FormControlStyled key={keyIndex}
                                   isError={factorTouched(keyIndex) && factorErrorMessage(keyIndex) !== ''}
                                   isTouched={factorTouched(keyIndex)}>
                    <FormLabel required>{factor.name}</FormLabel>
                    <Stack spacing={1} direction="row" justifyContent="space-between">
                        <Input placeholder={"Activation..."}
                               onChange={(val) => {
                                   if (val.target.value === null) return;
                                   const activeFactors = baseProps.values.factors;
                                   const foundIndex= activeFactors.findIndex(g => g.id === factor.id);
                                   activeFactors[foundIndex].activation = val.target.value;
                                   baseProps.setFieldValue('factors', activeFactors);
                               }}
                               value={factor.activation}
                               style={{ width: '100%' }}/>
                        <IconButton variant="soft" color="danger" onClick={() => {
                            const activeFactors = baseProps.values.factors;

                            const optionFactors = currentFactors;
                            optionFactors.push({
                                value: factor.id,
                                label: factor.name,
                            });
                            setCurrentFactors(optionFactors);

                            const foundIndex = activeFactors.findIndex(g => g.id === factor.id);
                            activeFactors.splice(foundIndex, 1);
                            baseProps.setFieldValue('factors', activeFactors);
                        }}>
                            <DeleteOutlined />
                        </IconButton>
                    </Stack>
                    <ErrorHelperText isError={factorTouched(keyIndex) && factorErrorMessage(keyIndex) !== ''}
                                     errorText={factorErrorMessage(keyIndex)} />
                </FormControlStyled>
            ))}
    </>
}