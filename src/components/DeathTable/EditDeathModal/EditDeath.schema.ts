import {EditDeathProps, EditDeathValues} from "./EditDeath.types";
import * as Yup from 'yup';
import {FormikBag} from "formik";
import {Death} from "../../../api/models/Death";
import {NumericOption} from "../../shared/formUtils/formUtils";

export const mapPropsToValues = (props: EditDeathProps): EditDeathValues => {
    return {
        death_type: props.death_type,
        description: props.death?.description || '',
        factors: props.death?.factors || [],
        genes: props.death?.genes || [],
    }
}

export const validationSchema = () => Yup.object().shape({
    death_type: Yup.number().required('Please select death type'),
    description: Yup.string().required('Please input description'),
    genes: Yup.array().of(Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        activation: Yup.string().required('Gene activation not specified'),
    })),
    factors: Yup.array().of(Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        activation: Yup.string().required('Factor activation not specified'),
    })),
})

export const handleSubmit = (values: EditDeathValues, { props }: FormikBag<EditDeathProps, EditDeathValues>) => {
    const death: Death = {
        death_type: props.death_types[values.death_type || 0],
        description: values.description,
        factors: values.factors,
        genes: values.genes,
        id: props.death?.id || 0
    }
    props.handleSubmit(death);
}

type InputOption = { id: number, name: string };
export const toNumericArr = (values: InputOption[]): NumericOption[] => {
    const options: NumericOption[] = [];
    values.forEach(v => {
        options.push({
            value: v.id,
            label: v.name,
        });
    });
    return options;
}