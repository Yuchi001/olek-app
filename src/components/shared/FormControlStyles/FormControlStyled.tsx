import { FormControl } from '@mui/joy';
import React from 'react';

type Props = {
    children: React.ReactNode;
    isError: boolean;
    isTouched: boolean | undefined;
    readOnly?: boolean;
    className?: string;
    style?: React.CSSProperties | undefined;
};
export const FormControlStyled = ({
                                      isError,
                                      isTouched,
                                      children,
                                      style = undefined,
                                      readOnly = false,
                                      className = '',
                                  }: Props) => {
    return (
        <FormControl
            error={isError}
            className={className}
            style={style}
        >
            {children}
        </FormControl>
    );
};