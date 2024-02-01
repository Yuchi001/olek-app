import {useEffect, useState} from "react";
import {Gene} from "../api/models/Gene";
import {get_genes} from "../api/Routes";

export const useGenes = () => {
    const [genes, setGenes] = useState<Gene[]>([]);

    useEffect(() => {
        refreshGenes();
    }, []);

    const refreshGenes = () => {
        fetch(get_genes())
            .then(response => { return response.json() })
            .then(json => setGenes(json as Gene[]));
    }

    const createGenesRow = (givenGenes: Gene[]): string[] => {
        const activationList: string[] = [];
        genes.forEach((gene) => {
            const foundElement = givenGenes.find(g => g.id === gene.id);
            activationList.push(foundElement ? foundElement.activation : '-');
        });
        return activationList;
    }

    return { genes, createGenesRow, refreshGenes }
}