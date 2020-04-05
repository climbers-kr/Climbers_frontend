import React from 'react';
import styled from "styled-components";
import SlideCard from "./SlideCard";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


const SlideViewBox=styled.div`
   // margin-top: 8rem;
    width: 100%;
    //height: 150px;
    display: flex;
   
   background: #FEAC5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    justify-content: center;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 4rem;
    padding-right: 4rem;
`;

const SlideViewBlock=styled.div`
    margin-top: 6rem;
    width: 100%;
    //height: 150px;
    display: flex;
    flex-direction: column;
  
    color: white;
`;
const MarginSome=styled.div`
    
    height: 4rem;
`;
const useStyles = makeStyles((theme) => ({
    text: {
        //maxWidth: 345,

        paddingRight: "10px",
        //minHeight: '700px'
    },

}));

export default function SlideView(){
    const classes = useStyles();
    return (
        <SlideViewBlock>
            <h1 style={{color: 'white', paddingLeft: '2rem'}}>
                가입된 암장 소식
            </h1>
            <SlideViewBox>

                <SlideCard/>
                <SlideCard/>
                <SlideCard/>
                <SlideCard/>
            </SlideViewBox>
            <MarginSome></MarginSome>
        </SlideViewBlock>
    )
}