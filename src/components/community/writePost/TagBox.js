import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";

const TagBoxBlock = styled.div`
  width: 50%;
  //background: aquamarine;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid ${palette.gray[2]};
  //padding-top: 2rem;
  h4 {
    color: ${palette.gray[8]}
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
 
`;

const StyledFab=styled(Fab)`
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    //width: 30px;
    //height: 30px;
    text-shadow: 1px 1px 1px #5f687b;
    color: white;
    .icon {
        color: white;
    }
    margin-bottom: 20px;
`;

const TagBox=()=>{

    return(
        <>
            <TagBoxBlock>
                <StyledFab size="medium" aria-label="like" variant="extended">
                    <AddIcon className="icon" />암장 태그하기
                </StyledFab>
            </TagBoxBlock>
        </>
    );
};

export default TagBox;