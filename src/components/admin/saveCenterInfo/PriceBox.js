import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import React, {useCallback, useEffect, useState} from "react";
import styled, {css} from "styled-components";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import palette from "../../../lib/styles/palette";
import Select from "@material-ui/core/Select";
const StyledInput=styled(OutlinedInput)`
    height: 40px;
    ${props =>
    props.right &&
    css`
        grid-column: 2 / 3;
        margin-bottom: 4px;
    `}  
`;

const Site = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
`;

const SiteListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    grid-column: 2 / 3;
`;

const SiteForm=styled.form`
    display: flex;
    grid-template-columns: 4fr 1fr;
    align-items: center;
    width: 100%;
  
    .select {
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
const SiteList=React.memo(({tags, onRemove})=>(
    <SiteListBlock>
        {tags.map(tag=>(
            <SiteItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </SiteListBlock>
));


const PriceBox=({ tags, onChangeSites })=>{

    const [input, setInput]=useState('');
    const [localTags, setLocalTags]=useState([]);
    const insertTag=useCallback(
        tag=> {
            if(!tag) return; //공백이라면 추가하지 않음
            if(localTags.includes(tag)) return; //이미 존재한다면 추가하지 않음
            const nextTags=[...localTags, tag];
            setLocalTags(nextTags);
            onChangeSites(nextTags);
        },
        [localTags, onChangeSites],
    );

    const onRemove=useCallback(
        tag=> {
            const nextTags=localTags.filter(t=> t!==tag);
            setLocalTags(nextTags);
            onChangeSites(nextTags);
        },
        [localTags, onChangeSites],
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

    const [state, setState] = React.useState({
        period: '',
        price: 'hai',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        console.dir(name)
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    return (
        <>
            <SiteForm onSubmit={onSubmit}>
                <Select
                    className="select"
                    native
                    value={state.age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'period',
                        id: 'id-period',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                <Select
                    className="select"
                    native
                    value={state.price}
                    onChange={handleChange}
                    inputProps={{
                        name: 'price',
                        id: 'id-price',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                <Fab className="button" size="small" color="primary" aria-label="add" type="submit">
                    <AddIcon />
                </Fab>
            </SiteForm>
            <SiteList tags={localTags} onRemove={onRemove}/>
        </>
    )

};

export default PriceBox;