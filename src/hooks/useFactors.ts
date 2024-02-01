import {useEffect, useState} from "react";
import {Factor} from "../api/models/Factor";
import {get_factors} from "../api/Routes";

export const useFactors = () => {
    const [factors, setFactors] = useState<Factor[]>([]);

    useEffect(() => {
        refreshFactors();
    }, []);

    const refreshFactors = () => {
        fetch(get_factors())
            .then(response => { return response.json() })
            .then(json => setFactors(json as Factor[]));
    }

    const createFactorsRow = (givenFactors: Factor[]): string[] => {
        const activationList: string[] = [];
        factors.forEach(factor => {
            const foundElement = givenFactors.find(f => f.id === factor.id);
            activationList.push(foundElement ? foundElement.activation : '-');
        });
        return activationList;
    }

    return { factors, createFactorsRow, refreshFactors }
}