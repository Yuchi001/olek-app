import {Death} from "../api/models/Death";
import {useEffect, useState} from "react";
import {add_death, get_deaths, update_death} from "../api/Routes";

export const useDeaths = (death_type_id: number | undefined) => {
    const [deaths, setDeaths] =
        useState<Death[]>([]);

    useEffect(() => {
        refreshDeaths();
    }, [death_type_id]);

    const refreshDeaths = () => {
        if(death_type_id === undefined) return;

        fetch(get_deaths(death_type_id))
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setDeaths(json as Death[]);
            });
    };

    const addDeath = (death: Death) => {
        fetch(add_death(), {
            method: 'POST',
            headers:{
                accept: 'application/json',
                'User-agent': 'learning app',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(death),
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                refreshDeaths();
            });
    }

    const updateDeath = (death: Death) => {
        fetch(update_death(), {
            method: 'POST',
            headers:{
                accept: 'application/json',
                'User-agent': 'learning app',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(death),
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                refreshDeaths();
            });
    }

    return { deaths, refreshDeaths, addDeath, updateDeath };
}