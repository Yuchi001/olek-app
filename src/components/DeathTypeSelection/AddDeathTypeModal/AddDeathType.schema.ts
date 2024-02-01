import {DeathTypeProps, DeathTypeValues} from "./AddDeathType.types";
import * as Yup from 'yup';
import {FormikBag} from "formik";

export const mapPropsToValues = (props: DeathTypeProps): DeathTypeValues => {
    return {
        name: '',
    }
}

export const validationSchema = () =>
    Yup.object().shape({
        name: Yup.string().required('Please input valid death name'),
    });

export const handleSubmit = (values: DeathTypeValues, { props }: FormikBag<DeathTypeProps, DeathTypeValues>) => {
    props.handleSubmit(values);
}