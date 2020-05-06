import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import styled from 'styled-components';

const LabelTypographyBlock=styled.div`
    display: flex;
    margin-right: 2rem;
    align-items: center;
    @media(max-width: 500px){
        flex-direction: column;
    }
`;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginRight: '2rem',
        alignItems: 'center',
    },
    labelText: {
        marginRight: '2px',
        fontSize: 'inherit'
    },
    stateText: {

    },
}));
export default function LabelTypography({label, value}){
    const classes = useStyles();
    return(
        <LabelTypographyBlock>
            <Typography className={classes.labelText}>
                {label}
            </Typography>
            <Typography className={classes.stateText}>
                {value}
            </Typography>
        </LabelTypographyBlock>
    )
};