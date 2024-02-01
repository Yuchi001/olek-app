import {withFormik} from "formik";
import {handleSubmit, mapPropsToValues, validationSchema} from "./EditDeath.schema";
import {EditDeathProps, EditDeathValues} from "./EditDeath.types";
import {EditDeathData} from "./EditDeathData";

const EditDeathForm = withFormik<EditDeathProps, EditDeathValues>({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
})(EditDeathData);
export default (EditDeathForm);