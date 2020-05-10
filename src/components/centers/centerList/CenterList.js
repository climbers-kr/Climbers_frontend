import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CenterCard from "../../common/CenterCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
const LoaderBlock=styled.div`
    //background: blue;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    width: 100%;
`;
const CenterListBlock=styled.div`
    display: grid;
    column-gap: 10px;
    row-gap: 10px;
    //background: skyblue;
    width: 100%;
    @media(max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width: 500px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media(min-width: 725px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media(min-width: 900px) {
      row-gap: 30px;
      column-gap: 15px
    }
    @media(min-width: 1200px) {
      row-gap: 40px;
      column-gap: 15px;
     
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

const CenterList=({initialLoading, readMoreLoading, error, centers, loader,containerRef})=>{
    const classes = useStyles();

    return (
        <LoaderBlock>
            <CenterListBlock ref={containerRef}>
                {!initialLoading && centers && (
                    centers.map(center => (
                        <CenterCard
                            center={center}
                            key={center._id}
                            coloredborder
                        />
                    ))
                )}
            </CenterListBlock>
            <div className={classes.loaderBox}
                 ref={loader}
            >
                {initialLoading && (
                    <>
                        <CircularProgress/>
                    </>
                )}

                {readMoreLoading && (
                    <CircularProgress />
                )}

            </div>
        </LoaderBlock>
    )
};

export default CenterList;