import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import React, {useCallback, useEffect, useState} from "react";
import styled, {css} from "styled-components";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import palette from "../../../../lib/styles/palette";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const PriceForm=styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    .button{
      margin-left: 10px;
      
    }
`;
const StyledInput=styled(OutlinedInput)`
    height: 40px;
    ${props =>
    props.right &&
    css`
        grid-column: 2 / 3;
        margin-bottom: 4px;
    `}  
`;

const Price = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
`;

const PriceListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    grid-column: 2 / 3;
`;



//React.memo 를 사용하여 tag값이 바뀔 때만 리렌더링 되도록 처리
const PriceItem=React.memo(({price, onRemove})=>(
    <Price onClick={()=>onRemove(price)}>{price.period}-{price.price}</Price>)
);

//React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const PriceList=React.memo(({prices, onRemove})=>
{
    console.dir(prices);
    console.dir(prices[0])
    return(
    <PriceListBlock>
        {prices.map((price, index)=>{
            console.dir(price);
            return(
            <PriceItem key={index} price={price} onRemove={onRemove}/>
        )})}
    </PriceListBlock>
)});


const PriceBox=({ prices, onChangeArray })=>{
    const classes = useStyles();
    const [localPrices, setLocalPrices]=useState([]);
    const [state, setState] = React.useState({
        period: '',
        price: '',
    });
    useEffect(()=>{
        console.log('prices changed');
    }, [prices]);

    useEffect(()=>{
        console.log('onChangeArray changed');
    }, [onChangeArray]);

    const insertPrice=useCallback(
        price=> {
            if(!price) return; //공백이라면 추가하지 않음
            if(localPrices.includes(price)) return; //이미 존재한다면 추가하지 않음
            const nextPrices=[...localPrices, price];
            setLocalPrices(nextPrices);
            onChangeArray("prices", nextPrices);
        },
        [localPrices, onChangeArray],
    );

    const onRemove=useCallback(
        tag=> {
            const nextTags=localPrices.filter(t=> t!==tag);
            setLocalPrices(nextTags);
            onChangeArray("prices", nextTags);
        },
        [localPrices, onChangeArray],
    );

    const onChange=useCallback(e=>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }, [state]);

    const onSubmit=useCallback(
        e=> {
            e.preventDefault();

            console.dir(state);
            insertPrice(state);
        },
        [state, insertPrice],
    );

    //tags 값이 바뀔 때
    useEffect(()=>{
        setLocalPrices(prices);
    }, [prices])

    useEffect(()=>{
        console.dir(state);
    }, [state]);


    const handleChange = (event) => {
        const name = event.target.name;

        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    return (
        <>
            <PriceForm>
                <FormControl className={classes.formControl} onSubmit={onSubmit}>
                    <InputLabel id="demo-simple-select-helper-label">기간</InputLabel>
                    <Select
                        className="select"
                        value={state.period}
                        onChange={handleChange}
                        inputProps={{
                            name: 'period',
                            id: 'id-period',
                        }}
                    >
                        <MenuItem value="체험강습">체험강습</MenuItem>
                        <MenuItem value="1일 이용권">1일 이용권</MenuItem>
                        <MenuItem value="1개월(성인)">1개월(성인)</MenuItem>
                        <MenuItem value="1개월(대학생)">1개월(대학생)</MenuItem>
                        <MenuItem value="1개월(청소년)">1개월(청소년)</MenuItem>
                        <MenuItem value="3개월(성인)">3개월(성인)</MenuItem>
                    </Select>

                </FormControl>
                <StyledInput
                    className="input"
                    placeholder="가격"
                    name="price"
                    type="number"
                    value={state.price}
                    onChange={onChange}
                />
                <Fab className="button" size="small" color="primary" aria-label="add" type="submit" onClick={onSubmit}>
                    <AddIcon />
                </Fab>
            </PriceForm>

            <PriceList prices={localPrices} onRemove={onRemove}/>
        </>
    )

};

export default PriceBox;
