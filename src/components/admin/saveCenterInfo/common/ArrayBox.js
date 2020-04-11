import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import { StyledInput, InputLabelBox } from "./commonComponents";
import palette from "../../../../lib/styles/palette";

const Site = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
`;

const ItemListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    grid-column: 2 / 3;
`;

const ArrayForm=styled.form`
    display: flex;
    align-items: center;
    width: 100%;
  
    .input {
      flex: 1;
    }
    .button{
      margin: 0 10px 0 10px;
    }
`;

//React.memo 를 사용하여 tag값이 바뀔 때만 리렌더링 되도록 처리
const SiteItem=React.memo(({tag, onRemove})=>(
    <Site onClick={()=>onRemove(tag)}>#{tag}</Site>)
);

//React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const ItemList=React.memo(({tags, onRemove})=>{
    return(
    <ItemListBlock>
        {tags.map(tag=>(
            <SiteItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </ItemListBlock>
)});


const ArrayBox=({ tags, onChangeArray, name, label })=>{

    const [input, setInput]=useState('');
    const [localTags, setLocalTags]=useState([]);
    const insertTag=useCallback(
        tag=> {
            if(!tag) return; //공백이라면 추가하지 않음
            if(localTags.includes(tag)) return; //이미 존재한다면 추가하지 않음
            const nextTags=[...localTags, tag];
            setLocalTags(nextTags);
            onChangeArray(name, nextTags);
        },
        [localTags, onChangeArray],
    );

    const onRemove=useCallback(
        tag=> {
            const nextTags=localTags.filter(t=> t!==tag);
            setLocalTags(nextTags);
            onChangeArray(name , nextTags);
        },
        [localTags, onChangeArray],
    );

    const onChange=useCallback(e=>{
        setInput(e.target.value);
    }, []);

    const onSubmit=useCallback(
        e=> {
            e.preventDefault();
            insertTag(input.trim());
            setInput('');
        },
        [input, insertTag],
    );

    //tags 값이 바뀔 때
    useEffect(()=>{
        setLocalTags(tags);
    }, [tags]);

    return (
        <InputLabelBox>
            <h3>{label}</h3>
            <ArrayForm onSubmit={onSubmit}>
                <StyledInput
                    className="input"
                    placeholder="태그를 입력하세요"
                    name={name}
                    value={input}
                    onChange={onChange}
                />
                <Fab className="button" size="small" color="primary" aria-label="add" type="submit">
                    <AddIcon />
                </Fab>
            </ArrayForm>
            <ItemList tags={localTags} onRemove={onRemove}/>
        </InputLabelBox>
    )
};

export default ArrayBox;