import {useEffect, useState} from "react";
import {DeathType} from "../api/models/DeathType";
import {add_death_type, get_deaths_types} from "../api/Routes";
import {NumericOption} from "../components/shared/formUtils/formUtils";

export const useDeathTypes = () => {
    const [deathTypes, setDeathTypes] =
        useState<DeathType[]>([]);
    const [deathTypeOptions, setDeathTypeOptions] = useState<NumericOption[]>([]);

    useEffect(() => {
        refreshDeathTypes();
    }, []);

    const refreshDeathTypes = () => {
        fetch(get_deaths_types())
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const newDeathTypes = json as DeathType[];
                setDeathTypes(newDeathTypes);

                const newDeathTypeOptions: NumericOption[] = [];
                newDeathTypes.forEach(d => {
                    const option: NumericOption = {
                        label: d.name,
                        value: d.id,
                    };
                    newDeathTypeOptions.push(option);
                });
                setDeathTypeOptions(newDeathTypeOptions);
            });
    };

    const addDeathType = (deathType: DeathType) => {
        fetch(add_death_type(), {
            method: 'POST',
            headers:{
                accept: 'application/json',
                'User-agent': 'learning app',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deathType),
        })
            .then((response) => { return response.json() })
            .then((json) => {
                refreshDeathTypes();
            });
    }

    const getDeathTypeById = (id: number): DeathType | undefined => {
        return deathTypes.find(d => d.id === id) || undefined;
    }

    return { deathTypes, deathTypeOptions, refreshDeathTypes, addDeathType, getDeathTypeById }
}