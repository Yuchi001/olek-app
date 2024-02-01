import {FormHelperText} from '@mui/joy';
import React from 'react';
import {InfoOutlined} from "@mui/icons-material";

type Props = {
    isError: boolean;
    errorText: string | undefined;
};
export const ErrorHelperText = ({ isError, errorText }: Props) => {
    return isError ? (
        <FormHelperText>
            <InfoOutlined />
            {errorText}
        </FormHelperText>
    ) : null;
};