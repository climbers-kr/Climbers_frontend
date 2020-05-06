import React from 'react';
import styled from "styled-components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StyledTab=styled(Tab)`
    color: rgb(82,82,82);
`;
const StyledTabs=styled(Tabs)`
  
    margin-bottom: 10px;
    border-bottom: 1px solid #8c8c8c;
    @media(max-width: 600px){
        width: 100%;
    }
`;
export default function HorizontalTab({center, loading, error, children, post}){
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    return (
        <>
            <StyledTabs
                value={value}
                onChange={handleChange}
                indicatorColor='secondary'
                textColor='secondary'
                centered
            >
                <StyledTab label="게시물" />
                <StyledTab label="푼 문제" />
                <StyledTab label="방문한 암장" />
            </StyledTabs>
        </>
    )
}