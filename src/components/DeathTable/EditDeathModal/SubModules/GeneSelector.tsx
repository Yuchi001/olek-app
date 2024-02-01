import React, {useEffect, useState} from 'react';
import {FormControlStyled} from "../../../shared/FormControlStyles/FormControlStyled";
import {FormLabel, Input, Stack, Typography} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {DeleteOutlined} from "@mui/icons-material";
import {ErrorHelperText} from "../../../shared/ErrorHelperText/ErrorHelperText";
import {EditDeathProps, EditDeathValues} from "../EditDeath.types";
import {FormikProps, isString} from "formik";
import {BetterSelect} from "../../../shared/BetterSelect/BetterSelect";
import {NumericOption} from "../../../shared/formUtils/formUtils";
import {useGenes} from "../../../../hooks/useGenes";
import {toNumericArr} from "../EditDeath.schema";

type Props = {
    baseProps: EditDeathProps & FormikProps<EditDeathValues>,
}
export const GeneSelector = ({ baseProps }: Props) => {
    const [currentGenes, setCurrentGenes] = useState<NumericOption[]>([]);
    const { genes } = useGenes();

    useEffect(() => {
        const allGenes = genes;
        baseProps.values.genes.forEach(gene => {
            const foundIndex = allGenes.findIndex(g => g.id === gene.id);
            if(foundIndex !== -1) allGenes.splice(foundIndex, 1);
        });
        setCurrentGenes(toNumericArr(allGenes));
    }, [genes]);

    const geneTouched = (id: number): boolean => {
        if (!Array.isArray(baseProps.touched.genes)) return false;
        return baseProps.touched.genes[id]?.activation || false;
    };

    const geneErrorMessage = (id: number): string => {
        if (!Array.isArray(baseProps.errors.genes)) return '';
        const e = baseProps.errors.genes[id];
        if (isString(e)) return e;
        return e?.activation || '';
    }

    return <>
        <FormControlStyled isError={false} isTouched={false}>
            <FormLabel><Typography level="h3">Genes selection</Typography></FormLabel>
            <BetterSelect options={currentGenes}
                          placeHolder={"Select more genes..."}
                          value={null}
                          onChange={(val) => {
                              const foundIndex = currentGenes.findIndex(g => g.value === val);
                              const currGenes = currentGenes;

                              const activeGenes = baseProps.values.genes;
                              activeGenes.push({
                                  id: currGenes[foundIndex].value,
                                  name: currGenes[foundIndex].label,
                                  activation: '',
                              });
                              baseProps.setFieldValue('genes', activeGenes);

                              currGenes.splice(foundIndex, 1);
                              setCurrentGenes(currGenes);
                          }}
            />
        </FormControlStyled>
        {baseProps.values.genes.map((gene, keyIndex) =>
            (
                <FormControlStyled key={keyIndex}
                                   isError={geneTouched(keyIndex) && geneErrorMessage(keyIndex) !== ''}
                                   isTouched={geneTouched(keyIndex)}>
                    <FormLabel required>{gene.name}</FormLabel>
                    <Stack spacing={1} direction="row" justifyContent="space-between">
                        <Input placeholder={"Activation..."}
                               onChange={(val) => {
                                   if(val.target.value === null)return;
                                   const activeGenes = baseProps.values.genes;
                                   const foundIndex= activeGenes.findIndex(g => g.id === gene.id);
                                   activeGenes[foundIndex].activation = val.target.value;
                                   baseProps.setFieldValue('genes', activeGenes);
                               }}
                               value={gene.activation}
                               style={{ width: '100%' }}/>
                        <IconButton variant="soft" color="danger" onClick={() => {
                            const activeGenes = baseProps.values.genes;

                            const optionGenes = currentGenes;
                            optionGenes.push({
                                value: gene.id,
                                label: gene.name,
                            });
                            setCurrentGenes(optionGenes);

                            const foundIndex = activeGenes.findIndex(g => g.id === gene.id);
                            activeGenes.splice(foundIndex, 1);
                            baseProps.setFieldValue('genes', activeGenes);
                        }}>
                            <DeleteOutlined />
                        </IconButton>
                    </Stack>
                    <ErrorHelperText isError={geneTouched(keyIndex) && geneErrorMessage(keyIndex) !== ''}
                                     errorText={geneErrorMessage(keyIndex)} />
                </FormControlStyled>
            ))}
    </>
}