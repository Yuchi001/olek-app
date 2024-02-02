import {CloseOutlined, KeyboardArrowDown} from '@mui/icons-material';
import React, {ReactNode, useEffect} from 'react';
import {NumericOption, Option} from "../formUtils/formUtils";
import {Box, Chip, IconButton, Option as SelectOption, Select, selectClasses, Stack, Typography} from '@mui/joy';
import {isString} from "formik";
import "../styles/hideScroll.css";

type Props = {
    options: Option[] | NumericOption[];
    value: string | number | (string | number)[] | null;
    onChange?: (value: string | number) => void;
    onChangeArr?: (value: (string | number)[]) => void;
    placeHolder?: string | ReactNode;
    defaultValue?: string | number | undefined;
    fullWidth?: boolean;
    style?: React.CSSProperties | undefined;
    disabled?: boolean;
    isMultiple?: boolean;
};
export const BetterSelect = ({
                                 value,
                                 options,
                                 onChange = undefined,
                                 onChangeArr = undefined,
                                 placeHolder,
                                 isMultiple = false,
                                 fullWidth = true,
                                 style = undefined,
                                 disabled=false,
                                 defaultValue = undefined,
                             }: Props) => {
    const multiValueChip = (option: { value: string | number, label: string | ReactNode }) => {
        return <Chip variant="soft" color="primary">
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
            >
                <Typography fontSize="small">
                    {option.label}
                </Typography>
                <IconButton
                    variant="plain"
                    size="sm"
                    style={{
                        marginRight: -5,
                        marginLeft: -2,
                        width: '5px !important',
                        height: '5px !important',
                    }}
                    sx={{
                        '&:selected': {
                            backgroundColor: 'rgba(0,0,0,0)',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0)',
                        },
                    }}
                    onMouseDown={(event) => {
                        event.stopPropagation();
                    }}
                    onClick={() => {
                        if (!Array.isArray(value) || value === null) return;

                        const currOptions: (string | number)[] = value;
                        const foundIndex = currOptions.findIndex(o => o === option.value);
                        if (foundIndex === -1) return;

                        currOptions.splice(foundIndex, 1);
                        if (onChangeArr) onChangeArr(currOptions);
                    }}
                >
                    <CloseOutlined />
                </IconButton>
            </Stack>
        </Chip>
    };

    return (
        <Select
            style={style}
            disabled={disabled}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            indicator={<KeyboardArrowDown />}
            multiple={isMultiple}
            sx={{
                [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                    },
                },
                width: fullWidth ? '100%' : 'min-content',
            }}
            value={value?.toString() || null}
            renderValue={(selected) => !Array.isArray(selected) ?
                (<>{selected?.label}</>) :
                (<Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.25rem',
                    width: '100%',
                }}>
                    {selected?.map((selectedOption, index) =>
                        (<div key={index}>{multiValueChip(selectedOption)}</div>))}
                </Box>)}
            onChange={(event, newVal) => {
                if (newVal === null) return;

                const isArr = Array.isArray(newVal);

                if (!isMultiple && !isArr) {
                    const val = isString(value) ? newVal : +newVal;
                    if (val === null) return;
                    if (onChange) onChange(val);
                    return;
                }

                if (onChangeArr && isArr) onChangeArr(newVal);
            }}
        >
            <div className="hideScroll" style={{ overflowY: 'scroll' }}>
                {options.map((element, index) => (
                    <SelectOption value={element.value.toString()} key={index}>
                        {element.label}
                    </SelectOption>
                ))}
            </div>
        </Select>
    )
}