import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CenterCard from "./CenterCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
const LoaderBlock=styled.div`
    //background: blue;
    display: flex;
    flex-direction: column;
    width: 90%;
    @media(min-width: 960px) {
      width: 80%;
    }
    @media(min-width: 1280px) {
      width: 70%;
    }
`;
const CenterListBlock=styled.div`
    display: grid;
    column-gap: 5px;
    row-gap: 10px;
    //background: skyblue;
    @media(max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width: 500px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media(min-width: 725px) {
      grid-template-columns: repeat(4, 1fr);
    }
`;

const useStyles = makeStyles(theme => ({
    loaderBox: {
        //background: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80px'
    },
}));

const CenterList=({loading, loading2, error, centers, loader,containerRef})=>{
    const classes = useStyles();

    return (
        <LoaderBlock>
            <CenterListBlock ref={containerRef}>
                {!loading && centers && (
                    centers.map(center => (
                        <CenterCard center={center} key={center._id}/>
                    ))
                )}

            </CenterListBlock>
            <div className={classes.loaderBox}
                 ref={loader}
            >
                {loading && (
                    <CircularProgress />
                )}

                {loading2 && (
                    <CircularProgress />
                )}

            </div>
        </LoaderBlock>
    )
};

export default CenterList;