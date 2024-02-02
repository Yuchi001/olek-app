import {Death} from "../../../api/models/Death";
import {DeathType} from "../../../api/models/DeathType";
import {NumericOption} from "../../shared/formUtils/formUtils";

export interface EditDeathProps {
    handleSubmit: (values: EditDeathValues) => void;
    death_type_id: number;
    death_types: DeathType[];
    death_types_options: NumericOption[];
    death: Death | undefined;
}

export interface EditDeathValues extends Omit<Death, 'id'> {

}