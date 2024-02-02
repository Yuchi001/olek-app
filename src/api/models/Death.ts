import {DeathType} from "./DeathType";
import {Gene} from "./Gene";
import {Factor} from "./Factor";

export interface Death {
    description: string;
    id: number;
    death_type_id: number;
    genes: Gene[];
    factors: Factor[];
}