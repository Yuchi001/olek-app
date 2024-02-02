import {EditDeathProps, EditDeathValues} from "./EditDeath.types";
import * as Yup from 'yup';
import {FormikBag} from "formik";
import {NumericOption} from "../../shared/formUtils/formUtils";

export const mapPropsToValues = (props: EditDeathProps): EditDeathValues => {
    return {
        death_type_id: props.death_type_id,
        description: props.death?.description || '',
        factors: props.death?.factors || [],
        genes: props.death?.genes || [],
    }
}

export const validationSchema = () => Yup.object().shape({
    death_type_id: Yup.number().required('Please select death type'),
    description: Yup.string().required('Please input description'),
    genes: Yup.array().of(Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        activation: Yup.string().required('Gene activation not specified'),
    })).min(0, ''),
    factors: Yup.array().of(Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        activation: Yup.string().required('Factor activation not specified'),
    })).min(0, 'min'),
})

export const handleSubmit = (values: EditDeathValues, { props }: FormikBag<EditDeathProps, EditDeathValues>) => {
    props.handleSubmit(values);
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