export const idNameToOption = ({ id, name }: { id: number | string; name: string }): Option => {
    return {
        value: id.toString(),
        label: name,
    };
};

export const numericOptionsToOptions = (numericOptions: NumericOption[]): Option[] => {
    const options: Option[] = [];
    numericOptions.forEach((o) => {
        options.push({
            label: o.label,
            value: o.value.toString(),
        });
    });
    return options;
};

export interface Option<V extends string = string> {
    label: string;
    value: V;
}

export type NumericOption = {
    label: string;
    value: number;
};
