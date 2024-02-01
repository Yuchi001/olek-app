import {withFormik} from "formik";
import {DeathTypeProps, DeathTypeValues} from "./AddDeathType.types";
import {handleSubmit, mapPropsToValues, validationSchema} from "./AddDeathType.schema";
import {AddDeathTypeData} from "./AddDeathTypeData";

const AddDeathTypeForm = withFormik<DeathTypeProps, DeathTypeValues>({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
})(AddDeathTypeData);
export default (AddDeathTypeForm);