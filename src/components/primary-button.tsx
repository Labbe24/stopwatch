import { Button, ButtonProps, styled, SxProps, Typography } from "@mui/material"
import React, { FC } from "react";
import { buttonColor } from "../color-constants";


interface Props extends ButtonProps {
}

export const PrimaryButton: FC<Props> = React.memo(({sx, children, ...props}) => {

    return(
        <Button sx={sx} onClick={props.onClick} {...props}>
            <Typography variant="h5">{children}</Typography>
        </Button>)
});