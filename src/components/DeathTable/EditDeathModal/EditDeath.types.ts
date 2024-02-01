import {Death} from "../../../api/models/Death";
import {DeathType} from "../../../api/models/DeathType";
import {NumericOption} from "../../shared/formUtils/formUtils";

export interface EditDeathProps {
    handleSubmit: (values: Death) => void;
    death_type: number;
    death_types: DeathType[];
    death_types_options: NumericOption[];
    death: Death | undefined;
}

export interface EditDeathValues extends Omit<Death, 'id' | 'death_type'> {
    death_type: number | undefined;
}